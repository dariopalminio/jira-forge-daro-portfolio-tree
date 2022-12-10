import { useContext, useState } from 'react';
import JiraApiImpl from '../../infrastructure/api/jira-api.impl';
import { IJiraApi } from '../outgoing/jira-api.interface';
import { IHookState, InitialState } from './hook.type';
import * as GlobalConfig from '../../infrastructure/global.config';
import { togglesTreeExample } from '../../infrastructure/api/api-fake/example-data';
import { IssueItemType, TreeToggleType } from '../model/tree-types';

/**
 * Custom hook
 * 
 * @returns 
 */
export default function useJiraHook() {

    const [state, setState] = useState<IHookState>(InitialState);
    const jiraApi: IJiraApi = GlobalConfig.Factory.get('jiraApi');

    const getCurrentUser = async (): Promise<any> => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const currentUserData: any = await jiraApi.getCurrentUser();
            //const name: string = currentUserData?.displayName;
            return currentUserData;
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Searcj JQL in Jira to retrieve issues from portfolio.
     * Return first level of a tree structure.
     */
    const searchJql = async (jql: string): Promise<any> => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        try {
            const data: any = await jiraApi.searchJql(jql);
            const issues: IssueItemType[] = data.issues;
            let tree: IssueItemType[] = [];
            tree = issues?.map((item, index) => {
                let issue: IssueItemType = convertToIssueItemType(item);
                return issue;
            })

            const dataResult: any = { ...data, issues: tree };
            return dataResult;
        } catch (error) {
            console.error(error);
        }
    };

    const convertToIssueItemType = (item: any): IssueItemType => {
        const issue: IssueItemType = {
            key: item.key,
            summary: item.fields.summary,
            iconUrl: item.fields.issuetype.iconUrl,
            fields: item.fields,
            hasChildren: false,
            childrens: []
        }
        return issue;
    };

    /**
     * Get Tree Toggle
     * Each issue has a boolean value to indicate if it is open 
     * (showing its children) or not.
     */
    const getTreeTogglesFrom = (issuesTree: IssueItemType[]): TreeToggleType => {
        let toggles: TreeToggleType = {}; //dictionary = { [key: string]: boolean };

        for (var i = 0; i < issuesTree.length; i++) {
            //togglesTreeExample['k-1'] = false;
            toggles[`${issuesTree[i].key}`] = false;
            if (issuesTree[i].hasChildren){
                for (var j = 0; j < issuesTree[i].childrens.length; j++) {
                    toggles[`${issuesTree[i].childrens[j].key}`] = false;
                }
            }
        }

        return toggles;
    };

    /**
     * Get initiative's children 
     * fields.issuelinks[i].type.outward=includes
     * fields.issuelinks[i].outwardIssue=issue
     * fields.issuelinks[i].outwardIssue.self=url issue
     */
    const getChildren = async (issuesTree: IssueItemType[], linksOutwards: string[]): Promise<IssueItemType[]> => {
        let tree: IssueItemType[] = [...issuesTree];
        for (var i = 0; i < tree.length; i++) {
            const links: any[] = tree[i].fields?.issuelinks;
            for (var j = 0; j < links.length; j++) {
                const outwardTag = links[j].type?.outward;
                if ( outwardTag 
                        && (typeof outwardTag === 'string') 
                        && linksOutwards.includes(outwardTag) ) {
                    const issueUrl:string = links[j].outwardIssue?.self;
                    const issueChild: any = await jiraApi.getIssueBySelf(issueUrl);
                    const issue: IssueItemType = convertToIssueItemType(issueChild);
                    tree[i].childrens.push(issue);
                    tree[i].hasChildren=true;
                }
            }
        }
        return [...tree];
    };



    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getCurrentUser,
        searchJql,
        getTreeTogglesFrom,
        getChildren
    };
};
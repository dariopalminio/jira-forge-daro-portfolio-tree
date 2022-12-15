import { useContext, useState } from 'react';
import JiraApiImpl from '../../infrastructure/api/jira-api.impl';
import { IJiraApi } from '../outgoing/jira-api.interface';
import { IHookState, InitialState } from './hook.type';
import * as GlobalConfig from '../../infrastructure/global.config';
import { togglesTreeExample } from '../../infrastructure/api/api-fake/example-data';
import { IssueTreeNodeType, TreeToggleType } from '../model/tree-types';

/**
 * Custom hook
 * 
 * @returns 
 */
export default function useJiraHook() {

    const [state, setState] = useState<IHookState>(InitialState);
    const jiraApi: IJiraApi = GlobalConfig.Factory.get('jiraApi');

    /**
     * Get current user logged in Jira
     * @returns Jira User Object
     */
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
    const searchJql = async (jql: string): Promise<IssueTreeNodeType | undefined> => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        try {
            const data: any = await jiraApi.searchJql(jql);
            console.log('searchJql.data:', data);
            let treeArray: IssueTreeNodeType[] = [];
            const issues: IssueTreeNodeType[] = data?.issues;
            treeArray = issues?.map((item, index) => {
                let issue: IssueTreeNodeType = convertToIssueTreeNodeType(item);
                return issue;
            })

            const tree: IssueTreeNodeType = {
                key: 'root',
                summary: 'root node',
                iconUrl: '',
                fields: { ...data, issues: [] },
                hasChildren: (treeArray.length > 0),
                childrens: treeArray
            }
            return tree;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    };

    /**
     * Convert Jira issue to IssueTreeNodeType node for tree
     * @param issueItem jira issue 
     * @returns IssueTreeNodeType
     */
    const convertToIssueTreeNodeType = (issueItem: any): IssueTreeNodeType => {
        const issueTreeNode: IssueTreeNodeType = {
            key: issueItem.key,
            summary: issueItem?.fields?.summary ? issueItem.fields.summary : '',
            iconUrl: issueItem?.fields?.issuetype?.iconUrl ? issueItem.fields.issuetype.iconUrl : '',
            fields: issueItem?.fields ? issueItem.fields : {},
            hasChildren: false,
            childrens: []
        }
        return issueTreeNode;
    };

    /**
     * Get Tree Toggle
     * Each issue has a boolean value associated with your key to indicate if it is open
     * (showing its children) or not.
     */
    const getTreeTogglesFrom = (issuesTree: IssueTreeNodeType[]): TreeToggleType => {
        let toggles: TreeToggleType = {}; //dictionary = { [key: string]: boolean };

        for (var i = 0; i < issuesTree.length; i++) {
            //togglesTreeExample['k-1'] = false;
            toggles[`${issuesTree[i].key}`] = false;
            if (issuesTree[i].hasChildren) {
                for (var j = 0; j < issuesTree[i].childrens.length; j++) {
                    toggles[`${issuesTree[i].childrens[j].key}`] = false;
                }
            }
        }

        return toggles;
    };

    /**
     * Get Children of each issue in tree by Links Hierarchy.
     */
    const getChildren = async (issuesTree: IssueTreeNodeType, linksOutwards: string[]): Promise<IssueTreeNodeType> => {
        let outwards: string[] = [];
        if (linksOutwards && Array.isArray(linksOutwards) && linksOutwards.length > 0) {
            outwards = linksOutwards;
        }
        return getChildTree(issuesTree, outwards, 0);
    };

    /**
     * Get recursively Children of each issue in tree by Links Hierarchy.
     * Complete all children based on Outwards type links by bringing the issues from Jira and completing the data tree.
     * The iteration of the tree is using Order Traversal Sequence by Level.
     * Each level iterates through the entire level looking for the children of each node.
     * To get outward name: fields.issuelinks[i].type.outward
     * To get outward children issue: fields.issuelinks[i].outwardIssue
     * To get url of outward children issue: fields.issuelinks[i].outwardIssue.self
     * @param issuesTree Tree node
     * @param outwards array of parent-child link type names of outward, eg ['includes', 'featutes by', 'related to']
     * @param level tree iteration level
     * @returns IssueTreeNodeType tree
     */
    const getChildTree = async (issuesTree: IssueTreeNodeType, outwards: string[], level: number): Promise<IssueTreeNodeType> => {
        console.log('* getChildTree:', level);
        const MAX_ALLOWED_LEVEL = 10;
        if (issuesTree.hasChildren && level < MAX_ALLOWED_LEVEL){
            let childsArray: IssueTreeNodeType[] = [...issuesTree.childrens];
            for (var i = 0; i < childsArray.length; i++) {
                const links: any[] = childsArray[i].fields?.issuelinks;
                for (var j = 0; j < links.length; j++) {
                    const outwardTag = links[j].type?.outward;
                    if (outwardTag
                        && (typeof outwardTag === 'string')
                        && outwards.includes(outwardTag)
                        && links[j].outwardIssue) {
                        const issueUrl: string = links[j].outwardIssue?.self;
                        const issueChild: any = await jiraApi.getIssueBySelf(issueUrl);
                        const issue: IssueTreeNodeType = convertToIssueTreeNodeType(issueChild);
                        childsArray[i].childrens.push(issue);
                        childsArray[i].hasChildren = true;
                    }
                }
            }
            const newArray: IssueTreeNodeType[] = [...childsArray];
            const finalArray: IssueTreeNodeType[] = []; 
            for (var i = 0; i < newArray.length; i++) {
                finalArray.push(await getChildTree(newArray[i], outwards, level + 1));
            }
            return { ...issuesTree, childrens: finalArray };
        } else {
            return issuesTree;
        }
    };

    /**
     * Get array of outward names from Jira
     * @returns array of parent-child link type names of outward, eg ['includes', 'featutes by', 'related to']
     */
    const getOutwardsFromJira = async (): Promise<string[]> => {
        const excludedOutwards = ['blocks', 'causes', 'clones', 'duplicates'];
        try {
            let outward: string[] = [];
            const data: any = await jiraApi.getIssueLinkTypes();
            const issueLinkTypes: any = data.issueLinkTypes;
            for (var i = 0; i < issueLinkTypes.length; i++) {
                if (issueLinkTypes[i].outward
                    && (typeof issueLinkTypes[i].outward === 'string')
                    && issueLinkTypes[i].outward !== '') {
                    if (!excludedOutwards.includes(issueLinkTypes[i].outward)) {
                        outward.push(issueLinkTypes[i].outward);
                    }
                }
            }
            return outward;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getCurrentUser,
        searchJql,
        getTreeTogglesFrom,
        getChildren,
        getOutwardsFromJira
    };
};
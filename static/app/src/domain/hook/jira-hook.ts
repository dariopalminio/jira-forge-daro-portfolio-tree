import { useContext, useState } from 'react';
import JiraApiImpl from '../../infrastructure/api/jira-api.impl';
import { IJiraApi } from '../outgoing/jira-api.interface';
import { IHookState, InitialState } from './hook.type';
import * as GlobalConfig from '../../infrastructure/global.config';
import { IssueItemType, TreeToggleType } from '../../application/component/tree';
import { togglesTreeExample } from '../../infrastructure/api/api-fake/example-data';

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

    const searchJql = async (jql: string) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        //const jql: string = "project=TKP and issuetype = Epic order by created DESC";
        try {
            const data: any = await jiraApi.searchJql(jql);
            const issues: any[] = data.issues;
            let tree: IssueItemType[] = [];
            tree = issues?.map((item, index) => {
                let issue: IssueItemType = {
                    key: item.key,
                    summary: item.fields.summary,
                    iconUrl: item.fields.issuetype.iconUrl,
                    fields: item.fields,
                    hasChildren: false,
                    childrens: []
                }
                return issue;
            })

            const dataResult: any = { ...data, issues: tree };
            return dataResult;
        } catch (error) {
            console.error(error);
        }
    };

    const getTreeToggles = (issuesTree: IssueItemType[]): TreeToggleType => {
        let toggles: TreeToggleType = {}; //export type TreeToggleType = { [key: string]: boolean };

        for (var i = 0; i < issuesTree.length; i++) {
            //togglesTreeExample['k-1'] = false;
            toggles[`${issuesTree[i].key}`] = false;
        }

        console.log('************toggles calculated:', toggles);

        //return togglesTreeExample;
        return toggles;
    };


    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getCurrentUser,
        searchJql,
        getTreeToggles
    };
};
import { useContext, useState } from 'react';
import JiraApiImpl from '../../infrastructure/api/jira-api.impl';
import { IJiraApi } from '../outgoing/jira-api.interface';
import { IHookState, InitialState } from './hook.type';
import * as GlobalConfig from '../../infrastructure/global.config';
import { togglesTreeExample } from '../../infrastructure/api/api-fake/example-data';
import { issueItemDefault, IssueTreeNodeType, TreeToggleType } from '../model/tree-types';
import { IJiraHost } from '../outgoing/jira-host.interface';

/**
 * Custom hook
 * 
 * @returns 
 */
export default function useJiraHostHook() {

    const jiraApi: IJiraHost = GlobalConfig.Factory.get('jiraHost');

    async function navigateToNewWindows(relativeUrl: string): Promise<void> {
        jiraApi.navigateToNewWindows(relativeUrl);
    };

    return {
        navigateToNewWindows
    };
};
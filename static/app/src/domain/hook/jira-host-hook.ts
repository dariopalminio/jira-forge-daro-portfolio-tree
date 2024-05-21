
import * as GlobalConfig from '../../infrastructure/global.config';
import { IJiraHost } from '../outgoing/jira-host.interface';
import { ServiceKeys } from '../outgoing/service-key';

/**
 * Custom hook
 * 
 * @returns 
 */
export default function useJiraHostHook() {

    const jiraApi: IJiraHost = GlobalConfig.Factory.get(ServiceKeys.JiraHost);

    async function navigateToNewWindows(relativeUrl: string): Promise<void> {
        jiraApi.navigateToNewWindows(relativeUrl);
    };

    return {
        navigateToNewWindows
    };
};
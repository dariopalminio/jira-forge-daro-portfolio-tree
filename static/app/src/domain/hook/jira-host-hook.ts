
import { IJiraHost } from '../outgoing/jira-host.interface';
import { useCallback } from 'react';

/**
 * Custom hook to interact with JiraHost services.
 * 
 * @returns {object} An object containing the navigateToNewWindows method.
 */
export default function useJiraHostHook(jiraHostApi: IJiraHost) {
    //const jiraApi: IJiraHost = GlobalConfig.Factory.get(ServiceKeys.JiraHost);

    const navigateToNewWindows = useCallback(async (relativeUrl: string): Promise<void> => {
        try {
            await jiraHostApi.navigateToNewWindows(relativeUrl); //redirect
        } catch (error) {
            console.error("Failed to navigate to new windows:", error);
            // TODO: Handle errors appropriately, e.g., showing user feedback
        }
    }, [jiraHostApi]);

    return {
        navigateToNewWindows
    };
}
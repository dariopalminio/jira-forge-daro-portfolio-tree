import { router } from '@forge/bridge';
import { IJiraHost } from '../../domain/outgoing/jira-host.interface';
/**
 * Jira API
 * 
 * The Jira API uses REST API and enables you to interact with Jira programmatically.  
 * This Calls to back-end resolver using invoke and the back-end call to Jira REST API with asUser or asApp.
 * Other strategy is to use requestJira, it communicates directly with jira without going through the Back-end.
 */
export default function JiraHostImpl(): IJiraHost {

    async function navigateToNewWindows(relativeUrl: string): Promise<void> {
        router.open(relativeUrl);
    };

    return {
        navigateToNewWindows
    };
};
import { IJiraHost } from "../../domain/outgoing/jira-host.interface";

/**
 * Jira Host Api FAKE (mocked)
 * 
 * In this mode, API client responses are simulated with FAKE responses.
 */
export default function JiraHostApiFake(): IJiraHost {



    async function navigateToNewWindows(relativeUrl: string): Promise<void> {
        //DO Nothing...
        return;
    };

    return {
        navigateToNewWindows
    };
};
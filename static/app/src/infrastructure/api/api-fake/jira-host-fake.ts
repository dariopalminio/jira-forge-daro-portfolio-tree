import { IJiraHost } from "../../../domain/outgoing/jira-host.interface";

export default function JiraHostFake(): IJiraHost {



    async function navigateToNewWindows(relativeUrl: string): Promise<void> {
        //DO Nothing...
        return;
    };

    return {
        navigateToNewWindows
    };
};

import JiraApiImpl from "./api/jira-api.impl";
import StorageApiImpl from "./api/storage-api.impl";
import JiraHostImpl from "./api/jira-host.impl";
import { ServiceKeys } from '../domain/outgoing/service-key';

/**
 * Global Factory for dependency injection
 * @returns initialize, get
 */
export default function GlobalFactory() {
    const container: Map<string, any> = new Map();

    const initialize = () => { //IN PROD
            container.set(ServiceKeys.JiraApi, StorageApiImpl());
            container.set(ServiceKeys.StorageApi, JiraApiImpl());
            container.set(ServiceKeys.JiraHost, JiraHostImpl());

    }

    //Get instance for key name
    const get = (key: string) => {
        return container.get(key);
    };

    return {
        initialize,
        get
    };
};


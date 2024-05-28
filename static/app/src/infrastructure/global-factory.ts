
import JiraApiImpl from "./api/jira-api.impl";
import StorageApiImpl from "./api/storage-api.impl";
import JiraHostImpl from "./api/jira-host.impl";
import JiraUserApiImpl from "./api/jira-user-api";
import { ServiceKeys } from '../domain/outgoing/service-key';

/**
 * Global Factory for dependency injection
 * @returns initialize, get
 */
export default function GlobalFactory() {
    const container: Map<string, any> = new Map();

    const initialize = () => { //IN PROD
            container.set(ServiceKeys.JiraApi, JiraApiImpl());
            container.set(ServiceKeys.StorageApi, StorageApiImpl());
            container.set(ServiceKeys.JiraHost, JiraHostImpl());
            container.set(ServiceKeys.JiraUserApi, JiraUserApiImpl());
            console.log("*** GlobalFactory-->initialize");
    }

    //Get instance for key name
    const get = (key: string) => {
        console.log("*** GlobalFactory-->get(key):", key);
        console.log("*** GlobalFactory-->get, container.get(key):", container.get(key));
        return container.get(key);
    };

    return {
        initialize,
        get
    };
};


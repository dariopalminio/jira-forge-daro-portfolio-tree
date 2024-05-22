import JiraHostFake from "./api/api-fake/jira-host-fake";
import StorageApiFake from "./api/api-fake/storage-api-fake";
import JiraApiFakeImpl from "./api/api-fake/jira-api-fake";
import { ServiceKeys } from '../domain/outgoing/service-key';

/**
 * Global Factory for dependency injection
 * This is used to inversion of control (IoC). 
 * A IoC container is used to identify and inject its dependencies using functional programming.
 * @returns 
 */
export default function GlobalFactory() {
    const container: Map<string, any> = new Map();

    const initialize = () => {
        console.log("****************************fakeMode:");
        console.log("IS FAKE: running on DEV environment...");
        container.set(ServiceKeys.JiraApi, JiraApiFakeImpl());
        container.set(ServiceKeys.StorageApi, StorageApiFake());
        container.set(ServiceKeys.JiraHost, JiraHostFake());
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

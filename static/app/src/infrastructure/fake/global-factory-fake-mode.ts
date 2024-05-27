import JiraHostApiFake from "./jira-host-api-fake";
import StorageApiFake from "./storage-api-fake";
import JiraApiFake from "./jira-api-fake";
import { ServiceKeys } from '../../domain/outgoing/service-key';
import JiraUserApiFake from "./jira-user-api-fake";

/**
 * Global Factory for dependency injection and return mocked objects.
 * In this mode, API client responses are simulated with FAKE responses.
 * This is used to inversion of control (IoC). 
 * A IoC container is used to identify and inject its dependencies using functional programming.
 * @returns 
 */
export default function GlobalFactory() {
    const container: Map<string, any> = new Map();

    const initialize = () => {
        console.log("*** Fake Mode:");
        console.log("*** Running in fake mode for basic simulation...");
        container.set(ServiceKeys.JiraApi, JiraApiFake());
        container.set(ServiceKeys.StorageApi, StorageApiFake());
        container.set(ServiceKeys.JiraHost, JiraHostApiFake());
        container.set(ServiceKeys.JiraUserApi, JiraUserApiFake());
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

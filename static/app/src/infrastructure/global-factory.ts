import { IJiraApi } from "../domain/outgoing/jira-api.interface";
import JiraApiImpl from "./api/jira-api.impl";
import StorageApiImpl from "./api/storage-api.impl";
import JiraHostImpl from "./api/jira-host.impl";


import JiraHostFake from "./api/api-fake/jira-host-fake";
import StorageApiFake from "./api/api-fake/storage-api-fake";
import JiraApiFakeImpl from "./api/api-fake/jira-api-fake";


/**
 * Global Factory for dependency injection
 * This is used to inversion of control (IoC). 
 * A IoC container is used to identify and inject its dependencies using functional programming.
 * @returns 
 */
export default function GlobalFactory() {
    const container: Map<string, any> = new Map();

//IS FAKE
  /*
        container.set('jiraApi', JiraApiFakeImpl());
        container.set('storageApi', StorageApiFake());
         container.set('jiraHost', JiraHostFake());
*/
         /*
*/
         //IN PROD

        container.set('storageApi', StorageApiImpl());
        container.set('jiraApi', JiraApiImpl());
        container.set('jiraHost', JiraHostImpl());


    //Get instance for key name
    const get = (key: string) => {
        return container.get(key);
    };

    return {
        get
    };
};


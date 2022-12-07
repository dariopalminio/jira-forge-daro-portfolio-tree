import { IJiraApi } from "../domain/outgoing/jira-api.interface";
import JiraApiFakeImpl from "./api/api-fake/jira-api-fake";
import JiraApiImpl from "./api/jira-api.impl";


/**
 * Global Factory for dependency injection
 * This is used to inversion of control (IoC). 
 * A IoC container is used to identify and inject its dependencies using functional programming.
 * @returns 
 */
export default function GlobalFactory() {

    const container: Map<string, any> = new Map();

  
    //container.set('jiraApi', JiraApiImpl());
    container.set('jiraApi', JiraApiFakeImpl());
 

    //Get instance for key name
    const get = (key: string) => {
        return container.get(key);
    };

    return {
        get
    };
};


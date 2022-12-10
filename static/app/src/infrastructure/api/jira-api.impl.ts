import { requestJira } from '@forge/bridge';
import { invoke } from '@forge/bridge';
import { IJiraApi } from '../../domain/outgoing/jira-api.interface';

/**
 * Jira API
 * 
 * The Jira API uses REST API and enables you to interact with Jira programmatically.  
 * This Calls to back-end resolver using invoke and the back-end call to Jira REST API with asUser or asApp.
 * Other strategy is to use requestJira, it communicates directly with jira without going through the Back-end.
 */
export default function JiraApiImpl(): IJiraApi {



    async function getCurrentUser(): Promise<any> {
        try {
            const data: any = await invoke('getCurrentUser',);
            return data;
        } catch (error) {
            throw error;
        }
    };

    async function searchJql(jql: string): Promise<any> {
        try {
            const body = {
                "expand": [
                    "names",
                    "schema",
                    "children",
                    "descendants"
                ],
                "jql": jql,
                "maxResults": 15,
                "fieldsByKeys": false,
                "fields": [
                    "summary",
                    "status",
                    "assignee",
                    "issuelinks",
                    "duedate",
                    "created",
                    "customfield_10015",
                    "issuetype"
                ],
                "startAt": 0
            };
            const response = await requestJira(`/rest/api/3/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Get Issue using Self url
     * @param issueUrl url string such as "https://daropalmi.atlassian.net/rest/api/3/issue/10053"
     * @returns 
     */
    async function getIssueBySelf(issueUrl: string): Promise<any> {
        try {
            const searchTerm = '/rest/';
            const indexOfFirst = issueUrl.indexOf(searchTerm);
            const path = issueUrl.substring(indexOfFirst, issueUrl.length);
            const response = await requestJira(path);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return {
        searchJql,
        getCurrentUser,
        getIssueBySelf
    };
};
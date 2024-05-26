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

    /**
     * Search JQL
     * 
     * @param jql - String for search with Jira Query Language (JQL)
     * @param maxResults The "maxResults" parameter indicates how many results to return per page. 
     * Each API may have a different limit for number of items returned.
     * @param startAt  - The "startAt" parameter indicates which item should be used as the first item in the page of results.
     * The index of the first item to return (0-based) must be 0 or a multiple of maxResults
     * @returns response.json()
     */
    async function searchJql(jql: string, maxResults: number, startAt: number): Promise<any> {
        try {
            const body = {
                "expand": [
                    "names",
                    "children",
                    "descendants"
                ],
                "jql": jql,
                "maxResults": maxResults,
                "fieldsByKeys": false,
                "fields": [
                    "summary",
                    "status",
                    "assignee",
                    "issuelinks",
                    "duedate",
                    "created",
                    "customfield_10015",
                    "issuetype",
                    "project",
                    "subtasks"
                ],
                "startAt": startAt
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

            if (response.status !== 200) {
                const errorMessages = data?.errorMessages ? data.errorMessages : 'Internal error in searchJql function!'
                throw new Error(errorMessages);
            }
            return data;
        } catch (error) {
            console.error('***searchJql.catch error***');
            console.error('***searchJql.catch error:', error);
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

    /**
     * Get issue link types
     * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-link-types/
     */
    async function getIssueLinkTypes(): Promise<any> {
        try {
            const response = await requestJira(`/rest/api/3/issueLinkType`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Get project versions paginated
     * GET /rest/api/2/project/{projectIdOrKey}/version
     * Returns a paginated list of all versions in a project. See the Get project versions resource if you want to get a full list of versions without pagination.
     * This operation can be accessed anonymously.
     * Permissions required: Browse Projects 
     * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:
     * - issuesstatus Returns the number of issues in each status category for each version.
     * - operations Returns actions that can be performed on the specified version.
     */
    async function getProjectVersions(projectKey: string): Promise<any> {
        try {
            const response = await requestJira(`/rest/api/2/project/${projectKey}/version`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            if (response.status !== 200) {
                const errorMessages = data?.errorMessages ? data.errorMessages : 'Internal error in getVersionForProject function!'
                throw new Error(errorMessages);
            }
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Get children issues
     * 
     * Query JQL examples: 
     * - example 1: parent=${epicKey} OR 'Epic Link'=${epicKey} OR 'Parent Link'=${epicKey} ORDER BY rank
     * - example 2: 'Epic Link' =${epicKey} order by created DESC
     * 
     * Clients can use the "startAt" and "maxResults" parameters to retrieve the desired numbers of results.
     * The "maxResults" parameter indicates how many results to return per page. Each API may have a different limit for number of items returned.
     * @param parentKey - identifier of the parent for whom we want to search for the children.
     * @param maxResults - The "maxResults" parameter is the maximum number of items that a page can return. Each operation can have a different 
     * limit for the number of items returned, and these limits may change without notice. To find the maximum number of items 
     * that an operation could return, set maxResults to a large number—for example, over 1000—and if the returned value of 
     * maxResults is less than the requested value, the returned value is the maximum.
     * Note that the JIRA server reserves the right to impose a maxResults limit that is lower than the value that a client provides, 
     * dues to lack or resources or any other condition. When this happens, your results will be truncated. 
     * Callers should always check the returned maxResults to determine the value that is effectively being used.
     * @param startAt - The "startAt" parameter indicates which item should be used as the first item in the page of results.
     * The index of the first item to return (0-based) must be 0 or a multiple of maxResults
     * @returns response.json()
     */
    async function getChildrens(parentKey: string, maxResults: number, startAt: number): Promise<any> {
        try {
            const jql = `parent=${parentKey} OR 'Epic Link'=${parentKey} OR 'Parent Link'=${parentKey} order by created DESC`;
            //console.log(`parent=${epicKey} OR 'Epic Link'=${epicKey} OR 'Parent Link'=${epicKey} order by created DESC`);

            const body = {
                "expand": [
                    "names",
                    "children",
                    "descendants"
                ],
                "jql": jql,
                "maxResults": maxResults,
                "fieldsByKeys": false,
                "fields": [
                    "summary",
                    "status",
                    "assignee",
                    "issuelinks",
                    "duedate",
                    "created",
                    "customfield_10015",
                    "issuetype",
                    "project",
                    "subtasks"
                ],
                "startAt": startAt
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
            //console.log(`data=${data}`);
            if (response.status !== 200) {
                const errorMessages = data?.errorMessages ? data.errorMessages : 'Internal error in getIssuesByEpikLink function!'
                throw new Error(errorMessages);
            }
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return {
        searchJql,
        getCurrentUser,
        getIssueBySelf,
        getIssueLinkTypes,
        getChildrens,
        getProjectVersions
    };
};
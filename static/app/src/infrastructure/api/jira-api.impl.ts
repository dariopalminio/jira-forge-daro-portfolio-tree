import { requestJira } from '@forge/bridge';
import { IJiraApi } from '../../domain/outgoing/jira-api.interface';

//The "maxResults" parameter indicates how many results to return per page. 
//Each API may have a different limit for number of items returned.
const MAX_RESULT = 100;

/**
 * Jira API
 * 
 * The Jira API uses REST API and enables you to interact with Jira programmatically.  
 * This Calls to back-end resolver using invoke and the back-end call to Jira REST API with asUser or asApp.
 * Other strategy is to use requestJira, it communicates directly with jira without going through the Back-end.
 */
export default function JiraApiImpl(): IJiraApi {


    /**
     * Search JQL
     * 
     * @param jql - String for search with Jira Query Language (JQL)
     * @returns Promise<any[]> - array of issues
     */
    async function searchJql(jql: string): Promise<any[]> {
        let allIssues: any[] = [];
        let startAt = 0; //The "startAt" indicates which item should be used as the first item in the page of results.
        let isFetching = true;
        while (isFetching) {
            try {
                const body = {
                    "expand": ["names", "children", "descendants"],
                    "jql": jql,
                    "maxResults": MAX_RESULT,
                    "fieldsByKeys": false,
                    "fields": ["summary", "status", "assignee", "issuelinks", "duedate", "created", "customfield_10015", "issuetype", "project", "subtasks"
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

                allIssues = allIssues.concat(data.issues);
                startAt += data.issues.length;

                // Check if we have fetched all available issues
                if (startAt >= data.total) {
                    isFetching = false;
                }
            } catch (error) {
                console.error('***searchJql.catch error***');
                console.error('***searchJql.catch error:', error);
                throw error;
            }
        }
        return allIssues;
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
     * @returns response.json()
     */
    async function getChildrens(parentKey: string): Promise<any[]> {
        let allIssues: any[] = [];
        let startAt = 0;
        let isFetching = true;
        while (isFetching) {
            try {
                const jql = `parent=${parentKey} OR 'Epic Link'=${parentKey} OR 'Parent Link'=${parentKey} order by created DESC`;

                const body = {
                    "expand": ["names","children","descendants"],
                    "jql": jql,
                    "maxResults": MAX_RESULT,
                    "fieldsByKeys": false,
                    "fields": ["summary","status","assignee","issuelinks","duedate","created","customfield_10015","issuetype","project","subtasks"
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
                    const errorMessages = data?.errorMessages ? data.errorMessages : 'Internal error in getIssuesByEpikLink function!'
                    throw new Error(errorMessages);
                }
                allIssues = allIssues.concat(data.issues);
                startAt += data.issues.length;

                // Check if we have fetched all available issues
                if (startAt >= data.total) {
                    isFetching = false;
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        return allIssues;
    }

    return {
        searchJql,
        getIssueBySelf,
        getIssueLinkTypes,
        getChildrens,
        getProjectVersions
    };
};
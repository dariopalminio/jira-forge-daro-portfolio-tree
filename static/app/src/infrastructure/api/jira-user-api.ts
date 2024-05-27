import { invoke } from '@forge/bridge';
import { IJiraUserApi } from '../../domain/outgoing/jira-user-api.interface';


/**
 * Jira User API
 * 
 * The Jira API uses REST API and enables you to interact with Jira programmatically.  
 * This Calls to back-end resolver using invoke and the back-end call to Jira REST API with asUser or asApp.
 * Other strategy is to use requestJira, it communicates directly with jira without going through the Back-end.
 */
export default function JiraUserApiImpl(): IJiraUserApi {



    async function getCurrentUser(): Promise<any> {
        console.log("CALL!!! JiraUserApiImpl.getCurrentUser");
        try {
            const data: any = await invoke('getCurrentUser',);
            console.log("CALLED!!! JiraUserApiImpl.getCurrentUser invoke");
            return data;
        } catch (error) {
            throw error;
        }
    };



    return {
        getCurrentUser
    };
};
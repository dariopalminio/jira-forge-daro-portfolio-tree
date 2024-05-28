import { IJiraUserApi } from '../../domain/outgoing/jira-user-api.interface';

/**
 * Jira API FAKE (mocked)
 * 
 * In this mode, API client responses are simulated with FAKE responses.
 * 
 * The Jira API uses REST API and enables you to interact with Jira programmatically.  
 * This Calls to back-end resolver using invoke and the back-end call to Jira REST API with asUser or asApp.
 * Other strategy is to use requestJira, it communicates directly with jira without going through the Back-end.
 */
export default function JiraUserApiFake(): IJiraUserApi {


    async function getCurrentUser(): Promise<any> {
        const data: any = {
            "self": "https://daropalmi.atlassian.net/rest/api/3/user?accountId=636915272f8b3c8f116ac78d",
            "accountId": "636915272f8b3c8f116ac78d",
            "emailAddress": "dario.palminio@agilistik.cl",
            "avatarUrls": {
                "48x48": "https://secure.gravatar.com/avatar/4c36a83de2784e01d99138459099e319?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FDP-1.png",
                "24x24": "https://secure.gravatar.com/avatar/4c36a83de2784e01d99138459099e319?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FDP-1.png",
                "16x16": "https://secure.gravatar.com/avatar/4c36a83de2784e01d99138459099e319?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FDP-1.png",
                "32x32": "https://secure.gravatar.com/avatar/4c36a83de2784e01d99138459099e319?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FDP-1.png"
            },
            "displayName": "Daro Palmi",
            "active": true,
            "timeZone": "America/Santiago",
            "locale": "es_ES",
            "groups": {
                "size": 4,
                "items": [
                    {
                        "name": "Managers",
                        "groupId": "c0249fc5-3323-4023-98da-179d17b911b4",
                        "self": "https://daropalmi.atlassian.net/rest/api/3/group?groupId=c0249fc5-3323-4023-98da-179d17b911b4"
                    },
                    {
                        "name": "MyTeamA",
                        "groupId": "f9c706f6-e7aa-478a-a77b-ff7d313261f2",
                        "self": "https://daropalmi.atlassian.net/rest/api/3/group?groupId=f9c706f6-e7aa-478a-a77b-ff7d313261f2"
                    },
                    {
                        "name": "site-admins",
                        "groupId": "a0053b33-6d1b-4996-8e65-25543ef55e15",
                        "self": "https://daropalmi.atlassian.net/rest/api/3/group?groupId=a0053b33-6d1b-4996-8e65-25543ef55e15"
                    },
                    {
                        "name": "Team Group",
                        "groupId": "4def5ed6-f96d-4f42-8aaf-0994a716df1a",
                        "self": "https://daropalmi.atlassian.net/rest/api/3/group?groupId=4def5ed6-f96d-4f42-8aaf-0994a716df1a"
                    }
                ]
            },
            "applicationRoles": {
                "size": 1,
                "items": [
                    {
                        "key": "jira-software",
                        "name": "Jira Software"
                    }
                ]
            },
            "expand": "groups,applicationRoles"
        };
        return data;
    };


    return {
        getCurrentUser
    };
};
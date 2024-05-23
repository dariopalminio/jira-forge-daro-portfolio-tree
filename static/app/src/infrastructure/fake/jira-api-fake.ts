import { IJiraApi } from '../../domain/outgoing/jira-api.interface';

/**
 * Jira API FAKE (mocked)
 * 
 * In this mode, API client responses are simulated with FAKE responses.
 * 
 * The Jira API uses REST API and enables you to interact with Jira programmatically.  
 * This Calls to back-end resolver using invoke and the back-end call to Jira REST API with asUser or asApp.
 * Other strategy is to use requestJira, it communicates directly with jira without going through the Back-end.
 */
export default function JiraApiFake(): IJiraApi {


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

    async function searchJql(jql: string): Promise<any> {
        console.log("Fake fetch for searchJql( jql ):", jql);
        return {
            "expand": "schema,names",
            "startAt": 0,
            "maxResults": 15,
            "total": 4,
            "issues": [
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "10086",
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10086",
                    "key": "POR-4",
                    "fields": {
                        "summary": "Agile Dev Prod",
                        "issuetype": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                            "id": "10005",
                            "description": "Initiative",
                            "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                            "name": "Initiative",
                            "subtask": false,
                            "avatarId": 10551,
                            "hierarchyLevel": 0
                        },
                        "subtasks": [
                            {
                                "id": "144281",
                                "key": "OKR-2",
                                "self": "https://cencosud.atlassian.net/rest/api/3/issue/144281",
                                "fields": {
                                    "summary": "100 % implementación Jira para Q1",
                                    "status": {
                                        "self": "https://cencosud.atlassian.net/rest/api/3/status/10286",
                                        "description": "",
                                        "iconUrl": "https://cencosud.atlassian.net/images/icons/statuses/generic.png",
                                        "name": "New",
                                        "id": "10286",
                                        "statusCategory": {
                                            "self": "https://cencosud.atlassian.net/rest/api/3/statuscategory/2",
                                            "id": 2,
                                            "key": "new",
                                            "colorName": "blue-gray",
                                            "name": "To Do"
                                        }
                                    },
                                    "priority": {
                                        "self": "https://cencosud.atlassian.net/rest/api/3/priority/3",
                                        "iconUrl": "https://cencosud.atlassian.net/images/icons/priorities/minor.svg",
                                        "name": "Medium",
                                        "id": "3"
                                    },
                                    "issuetype": {
                                        "self": "https://cencosud.atlassian.net/rest/api/3/issuetype/10180",
                                        "id": "10180",
                                        "description": "Resultado Clave",
                                        "iconUrl": "https://cencosud.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10321?size=medium",
                                        "name": "Key Result",
                                        "subtask": true,
                                        "avatarId": 10321,
                                        "hierarchyLevel": -1
                                    }
                                }
                            },
                            {
                                "id": "144282",
                                "key": "OKR-3",
                                "self": "https://cencosud.atlassian.net/rest/api/3/issue/144282",
                                "fields": {
                                    "summary": "Example Key Result para Q1",
                                    "status": {
                                        "self": "https://cencosud.atlassian.net/rest/api/3/status/10286",
                                        "description": "",
                                        "iconUrl": "https://cencosud.atlassian.net/images/icons/statuses/generic.png",
                                        "name": "New",
                                        "id": "10286",
                                        "statusCategory": {
                                            "self": "https://cencosud.atlassian.net/rest/api/3/statuscategory/2",
                                            "id": 2,
                                            "key": "new",
                                            "colorName": "blue-gray",
                                            "name": "To Do"
                                        }
                                    },
                                    "priority": {
                                        "self": "https://cencosud.atlassian.net/rest/api/3/priority/3",
                                        "iconUrl": "https://cencosud.atlassian.net/images/icons/priorities/minor.svg",
                                        "name": "Medium",
                                        "id": "3"
                                    },
                                    "issuetype": {
                                        "self": "https://cencosud.atlassian.net/rest/api/3/issuetype/10180",
                                        "id": "10180",
                                        "description": "Resultado Clave",
                                        "iconUrl": "https://cencosud.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10321?size=medium",
                                        "name": "Key Result",
                                        "subtask": true,
                                        "avatarId": 10321,
                                        "hierarchyLevel": -1
                                    }
                                }
                            }
                        ],
                        "duedate": null,
                        "created": "2022-11-28T17:39:22.333-0300",
                        "project": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/project/10001",
                            "id": "10001",
                            "key": "PORF",
                            "name": "Portfolio",
                            "projectTypeKey": "software",
                            "simplified": false,
                            "avatarUrls": {
                                "48x48": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416",
                                "24x24": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=small",
                                "16x16": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=xsmall",
                                "32x32": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=medium"
                            }
                        },
                        "issuelinks": [
                            {
                                "id": "10107",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10107",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10001",
                                    "key": "AP-1",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10001",
                                    "fields": {
                                        "summary": "Epica entregable",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/3",
                                            "description": "This issue is being actively worked on at the moment by the assignee.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/inprogress.png",
                                            "name": "In Progress",
                                            "id": "3",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/4",
                                                "id": 4,
                                                "key": "indeterminate",
                                                "colorName": "yellow",
                                                "name": "In Progress"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            }
                        ],
                        "assignee": null,
                        "status": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10020",
                            "description": "",
                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/generic.png",
                            "name": "FUNNEL",
                            "id": "10020",
                            "statusCategory": {
                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                "id": 2,
                                "key": "new",
                                "colorName": "blue-gray",
                                "name": "To Do"
                            }
                        },
                        "customfield_10015": "2022-11-29"
                    }
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "10051",
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10051",
                    "key": "POR-3",
                    "fields": {
                        "summary": "Shop Project",
                        "issuetype": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                            "id": "10005",
                            "description": "Initiative",
                            "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                            "name": "Initiative",
                            "subtask": false,
                            "avatarId": 10551,
                            "hierarchyLevel": 0
                        },
                        "duedate": "2023-02-28",
                        "created": "2022-11-18T11:59:32.924-0300",
                        "project": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/project/10001",
                            "id": "10001",
                            "key": "PORF",
                            "name": "Portfolio",
                            "projectTypeKey": "software",
                            "simplified": false,
                            "avatarUrls": {
                                "48x48": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416",
                                "24x24": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=small",
                                "16x16": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=xsmall",
                                "32x32": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=medium"
                            }
                        },
                        "issuelinks": [
                            {
                                "id": "10076",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10076",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10052",
                                    "key": "SHOP-1",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10052",
                                    "fields": {
                                        "summary": "Login basic",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/1",
                                            "description": "The issue is open and ready for the assignee to start work on it.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/open.png",
                                            "name": "Open",
                                            "id": "1",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                                "id": 2,
                                                "key": "new",
                                                "colorName": "blue-gray",
                                                "name": "To Do"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            },
                            {
                                "id": "10077",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10077",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10053",
                                    "key": "SHOP-2",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10053",
                                    "fields": {
                                        "summary": "Catalog",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/1",
                                            "description": "The issue is open and ready for the assignee to start work on it.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/open.png",
                                            "name": "Open",
                                            "id": "1",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                                "id": 2,
                                                "key": "new",
                                                "colorName": "blue-gray",
                                                "name": "To Do"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            },
                            {
                                "id": "10078",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10078",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10054",
                                    "key": "SHOP-3",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10054",
                                    "fields": {
                                        "summary": "System design core",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/1",
                                            "description": "The issue is open and ready for the assignee to start work on it.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/open.png",
                                            "name": "Open",
                                            "id": "1",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                                "id": 2,
                                                "key": "new",
                                                "colorName": "blue-gray",
                                                "name": "To Do"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            },
                            {
                                "id": "10079",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10079",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10055",
                                    "key": "SHOP-4",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10055",
                                    "fields": {
                                        "summary": "Home",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/1",
                                            "description": "The issue is open and ready for the assignee to start work on it.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/open.png",
                                            "name": "Open",
                                            "id": "1",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                                "id": 2,
                                                "key": "new",
                                                "colorName": "blue-gray",
                                                "name": "To Do"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            }
                        ],
                        "assignee": null,
                        "customfield_10015": "2022-11-18",
                        "status": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10021",
                            "description": "",
                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/generic.png",
                            "name": "SELECTED",
                            "id": "10021",
                            "statusCategory": {
                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/4",
                                "id": 4,
                                "key": "indeterminate",
                                "colorName": "yellow",
                                "name": "In Progress"
                            }
                        }
                    }
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "10050",
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10050",
                    "key": "POR-2",
                    "fields": {
                        "summary": "Jira Consulting",
                        "issuetype": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                            "id": "10005",
                            "description": "Initiative",
                            "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                            "name": "Initiative",
                            "subtask": false,
                            "avatarId": 10551,
                            "hierarchyLevel": 0
                        },
                        "duedate": "2022-12-28",
                        "created": "2022-11-15T19:40:15.333-0300",
                        "project": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/project/10001",
                            "id": "10001",
                            "key": "PORF",
                            "name": "Portfolio",
                            "projectTypeKey": "software",
                            "simplified": false,
                            "avatarUrls": {
                                "48x48": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416",
                                "24x24": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=small",
                                "16x16": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=xsmall",
                                "32x32": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=medium"
                            }
                        },
                        "issuelinks": [
                            {
                                "id": "10102",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10102",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10021",
                                    "key": "JC-15",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10021",
                                    "fields": {
                                        "summary": "Diagnóstico inicial",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10001",
                                            "description": "",
                                            "iconUrl": "https://daropalmi.atlassian.net/",
                                            "name": "Done",
                                            "id": "10001",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/3",
                                                "id": 3,
                                                "key": "done",
                                                "colorName": "green",
                                                "name": "Done"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            },
                            {
                                "id": "10106",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10106",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10007",
                                    "key": "JC-1",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10007",
                                    "fields": {
                                        "summary": "Gestión vertical de Portafolio MVP unidad de negocio",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10002",
                                            "description": "",
                                            "iconUrl": "https://daropalmi.atlassian.net/",
                                            "name": "Backlog",
                                            "id": "10002",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                                "id": 2,
                                                "key": "new",
                                                "colorName": "blue-gray",
                                                "name": "To Do"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            },
                            {
                                "id": "10105",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10105",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10008",
                                    "key": "JC-2",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10008",
                                    "fields": {
                                        "summary": "Gestión basada en objetivos OKR",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10002",
                                            "description": "",
                                            "iconUrl": "https://daropalmi.atlassian.net/",
                                            "name": "Backlog",
                                            "id": "10002",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                                "id": 2,
                                                "key": "new",
                                                "colorName": "blue-gray",
                                                "name": "To Do"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            },
                            {
                                "id": "10103",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10103",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10010",
                                    "key": "JC-4",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10010",
                                    "fields": {
                                        "summary": "QA en Jira MVP",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10002",
                                            "description": "",
                                            "iconUrl": "https://daropalmi.atlassian.net/",
                                            "name": "Backlog",
                                            "id": "10002",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                                "id": 2,
                                                "key": "new",
                                                "colorName": "blue-gray",
                                                "name": "To Do"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            },
                            {
                                "id": "10104",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10104",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10011",
                                    "key": "JC-5",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10011",
                                    "fields": {
                                        "summary": "Jira Software Core para Scrum MVP",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10002",
                                            "description": "",
                                            "iconUrl": "https://daropalmi.atlassian.net/",
                                            "name": "Backlog",
                                            "id": "10002",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                                "id": 2,
                                                "key": "new",
                                                "colorName": "blue-gray",
                                                "name": "To Do"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            },
                            {
                                "id": "10101",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10101",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is included by",
                                    "outward": "includes",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                                },
                                "outwardIssue": {
                                    "id": "10012",
                                    "key": "JC-6",
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10012",
                                    "fields": {
                                        "summary": "Jira Software Core para Kanban MVP",
                                        "status": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10002",
                                            "description": "",
                                            "iconUrl": "https://daropalmi.atlassian.net/",
                                            "name": "Backlog",
                                            "id": "10002",
                                            "statusCategory": {
                                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                                "id": 2,
                                                "key": "new",
                                                "colorName": "blue-gray",
                                                "name": "To Do"
                                            }
                                        },
                                        "priority": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                            "name": "Medium",
                                            "id": "3"
                                        },
                                        "issuetype": {
                                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                                            "id": "10000",
                                            "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                                            "name": "Epic",
                                            "subtask": false,
                                            "hierarchyLevel": 1
                                        }
                                    }
                                }
                            }
                        ],
                        "assignee": {
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
                            "accountType": "atlassian"
                        },
                        "customfield_10015": null,
                        "status": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10023",
                            "description": "",
                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/generic.png",
                            "name": "CONVERGENCE REVIEW",
                            "id": "10023",
                            "statusCategory": {
                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/4",
                                "id": 4,
                                "key": "indeterminate",
                                "colorName": "yellow",
                                "name": "In Progress"
                            }
                        }
                    }
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "10000",
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10000",
                    "key": "POR-1",
                    "fields": {
                        "summary": "Proyecto ejemplo",
                        "issuetype": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                            "id": "10005",
                            "description": "Initiative",
                            "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                            "name": "Initiative",
                            "subtask": false,
                            "avatarId": 10551,
                            "hierarchyLevel": 0
                        },
                        "duedate": "2022-12-15",
                        "created": "2022-11-14T10:30:59.174-0300",
                        "project": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/project/10001",
                            "id": "10001",
                            "key": "PORF",
                            "name": "Portfolio",
                            "projectTypeKey": "software",
                            "simplified": false,
                            "avatarUrls": {
                                "48x48": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416",
                                "24x24": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=small",
                                "16x16": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=xsmall",
                                "32x32": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10416?size=medium"
                            }
                        },
                        "issuelinks": [],
                        "assignee": {
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
                            "accountType": "atlassian"
                        },
                        "status": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10029",
                            "description": "",
                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/generic.png",
                            "name": "BLOCKED",
                            "id": "10029",
                            "statusCategory": {
                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/4",
                                "id": 4,
                                "key": "indeterminate",
                                "colorName": "yellow",
                                "name": "In Progress"
                            }
                        },
                        "customfield_10015": "2021-10-01"
                    }
                }
            ],
            "names": {
                "summary": "Summary",
                "issuetype": "Issue Type",
                "duedate": "Due date",
                "created": "Created",
                "issuelinks": "Linked Issues",
                "assignee": "Assignee",
                "status": "Status",
                "customfield_10015": "Start date"
            },
            "schema": {
                "summary": {
                    "type": "string",
                    "system": "summary"
                },
                "issuetype": {
                    "type": "issuetype",
                    "system": "issuetype"
                },
                "duedate": {
                    "type": "date",
                    "system": "duedate"
                },
                "created": {
                    "type": "datetime",
                    "system": "created"
                },
                "issuelinks": {
                    "type": "array",
                    "items": "issuelinks",
                    "system": "issuelinks"
                },
                "assignee": {
                    "type": "user",
                    "system": "assignee"
                },
                "status": {
                    "type": "status",
                    "system": "status"
                },
                "customfield_10015": {
                    "type": "date",
                    "custom": "com.atlassian.jira.plugin.system.customfieldtypes:datepicker",
                    "customId": 10015
                }
            }
        };
    };

    async function getIssueBySelf(issueUrl: string): Promise<any> {
        //console.log("Fake fetch for getIssueBySelf( issueUrl ):", issueUrl);
        const randomNum = Math.floor(Math.random() * 1000);
        const strkeyNum: string = randomNum.toString();
        return {
            "expand": "renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations,customfield_10010.requestTypePractice,customfield_10043.properties,customfield_10044.properties,customfield_10045.properties",
            "id": `${strkeyNum}`,
            "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10053",
            "key": `EPIC-${strkeyNum}`,
            "fields": {
                "statuscategorychangedate": "2022-11-18T12:01:16.443-0300",
                "issuetype": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10000",
                    "id": "10000",
                    "description": "A big user story that needs to be broken down. Created by Jira Software - do not edit or delete.",
                    "iconUrl": "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                    "name": "Epic",
                    "subtask": false,
                    "hierarchyLevel": 1
                },
                "parent": {
                    "id": "10051",
                    "key": "POR-3",
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10051",
                    "fields": {
                        "summary": "Shop Project",
                        "status": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10021",
                            "description": "",
                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/generic.png",
                            "name": "SELECTED",
                            "id": "10021",
                            "statusCategory": {
                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/4",
                                "id": 4,
                                "key": "indeterminate",
                                "colorName": "yellow",
                                "name": "In Progress"
                            }
                        },
                        "priority": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                            "name": "Medium",
                            "id": "3"
                        },
                        "issuetype": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                            "id": "10005",
                            "description": "Initiative",
                            "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                            "name": "Initiative",
                            "subtask": false,
                            "avatarId": 10551,
                            "hierarchyLevel": 0
                        }
                    }
                },
                "timespent": null,
                "project": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/project/10003",
                    "id": "10003",
                    "key": "SHOP",
                    "name": "Shop",
                    "projectTypeKey": "software",
                    "simplified": false,
                    "avatarUrls": {
                        "48x48": "https://daropalmi.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10418",
                        "24x24": "https://daropalmi.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10418?size=small",
                        "16x16": "https://daropalmi.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10418?size=xsmall",
                        "32x32": "https://daropalmi.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10418?size=medium"
                    }
                },
                "customfield_10031": null,
                "fixVersions": [
                    {
                        "self": "https://daropalmi.atlassian.net/rest/api/3/version/10001",
                        "id": "10001",
                        "description": "",
                        "name": "Release MVP v1.0.0",
                        "archived": false,
                        "released": false,
                        "releaseDate": "2022-11-30"
                    }
                ],
                "aggregatetimespent": null,
                "customfield_10035": [],
                "resolution": null,
                "customfield_10036": null,
                "customfield_10037": null,
                "customfield_10027": null,
                "customfield_10028": null,
                "customfield_10029": null,
                "resolutiondate": null,
                "workratio": -1,
                "watches": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/SHOP-2/watchers",
                    "watchCount": 1,
                    "isWatching": true
                },
                "lastViewed": "2022-11-25T10:47:06.289-0300",
                "issuerestriction": {
                    "issuerestrictions": {},
                    "shouldDisplay": false
                },
                "created": "2022-11-18T12:01:16.136-0300",
                "customfield_10020": null,
                "customfield_10021": null,
                "customfield_10022": null,
                "customfield_10023": null,
                "priority": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                    "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                    "name": "Medium",
                    "id": "3"
                },
                "customfield_10024": null,
                "customfield_10025": null,
                "customfield_10026": null,
                "labels": [
                    "Retail"
                ],
                "customfield_10016": null,
                "customfield_10017": "purple",
                "customfield_10018": {
                    "hasEpicLinkFieldDependency": false,
                    "showField": true,
                    "data": {
                        "id": 10051,
                        "key": "POR-3",
                        "keyNum": 3,
                        "summary": "Shop Project",
                        "projectId": 10001,
                        "issueType": {
                            "id": "10005",
                            "iconUrl": "/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium"
                        }
                    }
                },
                "customfield_10019": "0|i000av:",
                "aggregatetimeoriginalestimate": null,
                "timeestimate": null,
                "versions": [],
                "issuelinks": [
                    {
                        "id": "10077",
                        "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10077",
                        "type": {
                            "id": "10006",
                            "name": "Project",
                            "inward": "is included by",
                            "outward": "includes",
                            "self": "https://daropalmi.atlassian.net/rest/api/3/issueLinkType/10006"
                        },
                        "inwardIssue": {
                            "id": "10051",
                            "key": "POR-3",
                            "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10051",
                            "fields": {
                                "summary": "Shop Project",
                                "status": {
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/status/10021",
                                    "description": "",
                                    "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/generic.png",
                                    "name": "SELECTED",
                                    "id": "10021",
                                    "statusCategory": {
                                        "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/4",
                                        "id": 4,
                                        "key": "indeterminate",
                                        "colorName": "yellow",
                                        "name": "In Progress"
                                    }
                                },
                                "priority": {
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/priority/3",
                                    "iconUrl": "https://daropalmi.atlassian.net/images/icons/priorities/medium.svg",
                                    "name": "Medium",
                                    "id": "3"
                                },
                                "issuetype": {
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                                    "id": "10005",
                                    "description": "Initiative",
                                    "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                                    "name": "Initiative",
                                    "subtask": false,
                                    "avatarId": 10551,
                                    "hierarchyLevel": 0
                                }
                            }
                        }
                    }
                ],
                "assignee": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/user?accountId=6357e13c13f37118d72646f3",
                    "accountId": "6357e13c13f37118d72646f3",
                    "avatarUrls": {
                        "48x48": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6357e13c13f37118d72646f3/8e9cc84a-fd5c-46be-b1f8-8aa348365243/48",
                        "24x24": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6357e13c13f37118d72646f3/8e9cc84a-fd5c-46be-b1f8-8aa348365243/24",
                        "16x16": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6357e13c13f37118d72646f3/8e9cc84a-fd5c-46be-b1f8-8aa348365243/16",
                        "32x32": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6357e13c13f37118d72646f3/8e9cc84a-fd5c-46be-b1f8-8aa348365243/32"
                    },
                    "displayName": "Dario Palminio",
                    "active": true,
                    "timeZone": "America/Santiago",
                    "accountType": "atlassian"
                },
                "updated": "2022-11-28T17:54:39.315-0300",
                "status": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/status/1",
                    "description": "The issue is open and ready for the assignee to start work on it.",
                    "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/open.png",
                    "name": "Open",
                    "id": "1",
                    "statusCategory": {
                        "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                        "id": 2,
                        "key": "new",
                        "colorName": "blue-gray",
                        "name": "To Do"
                    }
                },
                "components": [
                    {
                        "self": "https://daropalmi.atlassian.net/rest/api/3/component/10001",
                        "id": "10001",
                        "name": "Shop API (Back-end)",
                        "description": "Shop API (Back-end)"
                    },
                    {
                        "self": "https://daropalmi.atlassian.net/rest/api/3/component/10000",
                        "id": "10000",
                        "name": "Shop Web Site (Front-end)",
                        "description": "Shop Web Site (Front-end)"
                    }
                ],
                "customfield_10050": null,
                "timeoriginalestimate": null,
                "description": null,
                "customfield_10010": null,
                "customfield_10011": "Catalog",
                "customfield_10012": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/customFieldOption/10016",
                    "value": "To Do",
                    "id": "10016"
                },
                "customfield_10013": "ghx-label-7",
                "customfield_10014": null,
                "customfield_10015": "2022-12-01",
                "timetracking": {},
                "customfield_10005": null,
                "customfield_10049": null,
                "customfield_10006": null,
                "customfield_10007": null,
                "security": null,
                "customfield_10008": null,
                "customfield_10009": null,
                "attachment": [],
                "aggregatetimeestimate": null,
                "summary": `Sumary-Example-${strkeyNum}`,
                "creator": {
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
                    "accountType": "atlassian"
                },
                "subtasks": [
                    {
                        "id": `213${strkeyNum}`,
                        "key": `KR-${strkeyNum}`,
                        "self": `https://cencosud.atlassian.net/rest/api/3/issue/144285${strkeyNum}`,
                        "fields": {
                            "summary": "100 % implementación Jira para Q1",
                            "status": {
                                "self": "https://cencosud.atlassian.net/rest/api/3/status/10286",
                                "description": "",
                                "iconUrl": "https://cencosud.atlassian.net/images/icons/statuses/generic.png",
                                "name": "New",
                                "id": "10286",
                                "statusCategory": {
                                    "self": "https://cencosud.atlassian.net/rest/api/3/statuscategory/2",
                                    "id": 2,
                                    "key": "new",
                                    "colorName": "blue-gray",
                                    "name": "To Do"
                                }
                            },
                            "priority": {
                                "self": "https://cencosud.atlassian.net/rest/api/3/priority/3",
                                "iconUrl": "https://cencosud.atlassian.net/images/icons/priorities/minor.svg",
                                "name": "Medium",
                                "id": "3"
                            },
                            "issuetype": {
                                "self": "https://cencosud.atlassian.net/rest/api/3/issuetype/10180",
                                "id": "10180",
                                "description": "Resultado Clave",
                                "iconUrl": "https://cencosud.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10321?size=medium",
                                "name": "Key Result",
                                "subtask": true,
                                "avatarId": 10321,
                                "hierarchyLevel": -1
                            }
                        }
                    }
                ],
                "customfield_10040": null,
                "customfield_10041": null,
                "customfield_10042": null,
                "customfield_10043": null,
                "reporter": {
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
                    "accountType": "atlassian"
                },
                "customfield_10044": null,
                "aggregateprogress": {
                    "progress": 0,
                    "total": 0
                },
                "customfield_10001": {
                    "id": "4",
                    "title": "Avengers",
                    "isShared": true,
                    "name": "Avengers"
                },
                "customfield_10045": {
                    "id": 1,
                    "value": "Auto bottom up"
                },
                "customfield_10002": null,
                "customfield_10046": null,
                "customfield_10003": null,
                "customfield_10047": null,
                "customfield_10004": null,
                "customfield_10048": "2022-12-01",
                "customfield_10038": null,
                "customfield_10039": null,
                "environment": null,
                "duedate": "2023-01-25",
                "progress": {
                    "progress": 0,
                    "total": 0
                },
                "comment": {
                    "comments": [],
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10053/comment",
                    "maxResults": 0,
                    "total": 0,
                    "startAt": 0
                },
                "votes": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/SHOP-2/votes",
                    "votes": 0,
                    "hasVoted": false
                },
                "worklog": {
                    "startAt": 0,
                    "maxResults": 20,
                    "total": 0,
                    "worklogs": []
                }
            }
        };
    };


    async function getIssueLinkTypes(): Promise<any> {
        console.log("Fake for getIssueLinkTypes( ):");
        return {
            "issueLinkTypes": [
                {
                    "id": "10000",
                    "name": "Blocks",
                    "inward": "is blocked by",
                    "outward": "blocks",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10000"
                },
                {
                    "id": "10001",
                    "name": "Cloners",
                    "inward": "is cloned by",
                    "outward": "clones",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10001"
                },
                {
                    "id": "10002",
                    "name": "Duplicate",
                    "inward": "is duplicated by",
                    "outward": "duplicates",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10002"
                },
                {
                    "id": "10007",
                    "name": "Initiative",
                    "inward": "is included by",
                    "outward": "includes",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10007"
                },
                {
                    "id": "10006",
                    "name": "Problem/Incident",
                    "inward": "is caused by",
                    "outward": "causes",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10006"
                },
                {
                    "id": "10003",
                    "name": "Relates",
                    "inward": "relates to",
                    "outward": "relates to",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10003"
                }
            ]
        }
    }

    async function getChildrens(epicKey: string, maxResults: number, startAt: number): Promise<any> {
        //console.log("Fake fetch for getChildrens with epicKey:", epicKey);
        const num = Math.floor(Math.random() * 1000);
        const strNum: string = num.toString();
        //return 3 issues as childs
        return {
            "expand": "schema,names",
            "startAt": 0,
            "maxResults": 15,
            "total": 3,
            "issues": [
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": `${strNum}`,
                    "self": `https://dariopalminio.atlassian.net/rest/api/3/issue/${strNum}`,
                    "key": `ID-${strNum}`,
                    "fields": {
                        "summary": "Tarea ejemplo 1",
                        "issuetype": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/issuetype/10002",
                            "id": "10002",
                            "description": "Un trabajo pequeño e independiente.",
                            "iconUrl": "https://dariopalminio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                            "name": "Tarea",
                            "subtask": false,
                            "avatarId": 10318,
                            "hierarchyLevel": 0
                        },
                        "duedate": null,
                        "created": "2022-12-15T19:39:59.482-0300",
                        "project": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/project/10000",
                            "id": "10000",
                            "key": "TKP",
                            "name": "Test Kanban Project",
                            "projectTypeKey": "software",
                            "simplified": false,
                            "avatarUrls": {
                                "48x48": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407",
                                "24x24": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407?size=small",
                                "16x16": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407?size=xsmall",
                                "32x32": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407?size=medium"
                            },
                            "projectCategory": {
                                "self": "https://dariopalminio.atlassian.net/rest/api/3/projectCategory/10000",
                                "id": "10000",
                                "description": "Paortafolio",
                                "name": "Portfolio"
                            }
                        },
                        "issuelinks": [],
                        "assignee": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/user?accountId=6059177c2f7d9000707f1a60",
                            "accountId": "6059177c2f7d9000707f1a60",
                            "emailAddress": "dariopalminio@gmail.com",
                            "avatarUrls": {
                                "48x48": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/48",
                                "24x24": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/24",
                                "16x16": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/16",
                                "32x32": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/32"
                            },
                            "displayName": "Dario Andres Palminio Choy",
                            "active": true,
                            "timeZone": "America/Santiago",
                            "accountType": "atlassian"
                        },
                        "status": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/status/10000",
                            "description": "",
                            "iconUrl": "https://dariopalminio.atlassian.net/",
                            "name": "Backlog",
                            "id": "10000",
                            "statusCategory": {
                                "self": "https://dariopalminio.atlassian.net/rest/api/3/statuscategory/2",
                                "id": 2,
                                "key": "new",
                                "colorName": "blue-gray",
                                "name": "Por hacer"
                            }
                        },
                        "customfield_10015": null
                    }
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": `${strNum+1}`,
                    "self": `https://dariopalminio.atlassian.net/rest/api/3/issue/${strNum+1}`,
                    "key": `ID-${strNum+1}`,
                    "fields": {
                        "summary": "Historia de usuario ejemplo 2",
                        "issuetype": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/issuetype/10001",
                            "id": "10001",
                            "description": "Una función o funcionalidad expresada como objetivo del usuario.",
                            "iconUrl": "https://dariopalminio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium",
                            "name": "Historia",
                            "subtask": false,
                            "avatarId": 10315,
                            "hierarchyLevel": 0
                        },
                        "created": "2022-12-15T19:39:44.037-0300",
                        "duedate": null,
                        "project": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/project/10000",
                            "id": "10000",
                            "key": "TKP",
                            "name": "Test Kanban Project Large description full",
                            "projectTypeKey": "software",
                            "simplified": false,
                            "avatarUrls": {
                                "48x48": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407",
                                "24x24": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407?size=small",
                                "16x16": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407?size=xsmall",
                                "32x32": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407?size=medium"
                            },
                            "projectCategory": {
                                "self": "https://dariopalminio.atlassian.net/rest/api/3/projectCategory/10000",
                                "id": "10000",
                                "description": "Paortafolio",
                                "name": "Portfolio"
                            }
                        },
                        "issuelinks": [],
                        "assignee": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/user?accountId=6059177c2f7d9000707f1a60",
                            "accountId": "6059177c2f7d9000707f1a60",
                            "emailAddress": "dariopalminio@gmail.com",
                            "avatarUrls": {
                                "48x48": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/48",
                                "24x24": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/24",
                                "16x16": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/16",
                                "32x32": "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/32"
                            },
                            "displayName": "Dario Andres Palminio Choy",
                            "active": true,
                            "timeZone": "America/Santiago",
                            "accountType": "atlassian"
                        },
                        "status": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/status/3",
                            "description": "El responsable está trabajando actualmente en esta incidencia.",
                            "iconUrl": "https://dariopalminio.atlassian.net/images/icons/statuses/inprogress.png",
                            "name": "En curso",
                            "id": "3",
                            "statusCategory": {
                                "self": "https://dariopalminio.atlassian.net/rest/api/3/statuscategory/4",
                                "id": 4,
                                "key": "indeterminate",
                                "colorName": "yellow",
                                "name": "En curso"
                            }
                        },
                        "customfield_10015": null
                    }
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": `${strNum+2}`,
                    "self": `https://dariopalminio.atlassian.net/rest/api/3/issue/${strNum+2}`,
                    "key": `ID-${strNum+2}`,
                    "fields": {
                        "summary": "Historia de usuario ejemplo 1",
                        "issuetype": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/issuetype/10001",
                            "id": "10001",
                            "description": "Una función o funcionalidad expresada como objetivo del usuario.",
                            "iconUrl": "https://dariopalminio.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium",
                            "name": "Historia",
                            "subtask": false,
                            "avatarId": 10315,
                            "hierarchyLevel": 0
                        },
                        "duedate": null,
                        "created": "2022-12-15T19:39:33.255-0300",
                        "project": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/project/10000",
                            "id": "10000",
                            "key": "TKP",
                            "name": "Test Kanban Project",
                            "projectTypeKey": "software",
                            "simplified": false,
                            "avatarUrls": {
                                "48x48": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407",
                                "24x24": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407?size=small",
                                "16x16": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407?size=xsmall",
                                "32x32": "https://dariopalminio.atlassian.net/rest/api/3/universal_avatar/view/type/project/avatar/10407?size=medium"
                            },
                            "projectCategory": {
                                "self": "https://dariopalminio.atlassian.net/rest/api/3/projectCategory/10000",
                                "id": "10000",
                                "description": "Paortafolio",
                                "name": "Portfolio"
                            }
                        },
                        "issuelinks": [],
                        "assignee": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/user?accountId=6059177c2f7d9000707f1a60",
                            "accountId": "6059177c2f7d9000707f1a60",
                            "emailAddress": "dariopalminio@gmail.com",
                            "avatarUrls": {
                                "48x48": "https://avatar1-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/48",
                                "24x24": "https://avatar1-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/24",
                                "16x16": "https://avatar1-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/16",
                                "32x32": "https://avatar1-management--avatars.us-west-2.prod.public.atl-paas.net/6059177c2f7d9000707f1a60/a7d2f5d2-8ae9-48f9-9bd9-a93e701ff6ee/32"
                            },
                            "displayName": "Dario Palminio",
                            "active": true,
                            "timeZone": "America/Santiago",
                            "accountType": "atlassian"
                        },
                        "customfield_10015": null,
                        "status": {
                            "self": "https://dariopalminio.atlassian.net/rest/api/3/status/10000",
                            "description": "",
                            "iconUrl": "https://dariopalminio.atlassian.net/",
                            "name": "Backlog",
                            "id": "10000",
                            "statusCategory": {
                                "self": "https://dariopalminio.atlassian.net/rest/api/3/statuscategory/2",
                                "id": 2,
                                "key": "new",
                                "colorName": "blue-gray",
                                "name": "Por hacer"
                            }
                        }
                    }
                }
            ],
            "names": {
                "summary": "Resumen",
                "issuetype": "Tipo de Incidencia",
                "duedate": "Fecha de vencimiento",
                "created": "Creada",
                "project": "Proyecto",
                "issuelinks": "Incidencias Enlazadas",
                "assignee": "Responsable",
                "status": "Estado",
                "customfield_10015": "Start date"
            },
            "schema": {
                "summary": {
                    "type": "string",
                    "system": "summary"
                },
                "issuetype": {
                    "type": "issuetype",
                    "system": "issuetype"
                },
                "duedate": {
                    "type": "date",
                    "system": "duedate"
                },
                "created": {
                    "type": "datetime",
                    "system": "created"
                },
                "project": {
                    "type": "project",
                    "system": "project"
                },
                "issuelinks": {
                    "type": "array",
                    "items": "issuelinks",
                    "system": "issuelinks"
                },
                "assignee": {
                    "type": "user",
                    "system": "assignee"
                },
                "status": {
                    "type": "status",
                    "system": "status"
                },
                "customfield_10015": {
                    "type": "date",
                    "custom": "com.atlassian.jira.plugin.system.customfieldtypes:datepicker",
                    "customId": 10015
                }
            }
        }
    };

    async function getProjectVersions(projectKey: string): Promise<any> {

        return {
            "self": "https://cencosud.atlassian.net/rest/api/2/project/PTECH/version?maxResults=50&startAt=0",
            "maxResults": 50,
            "startAt": 0,
            "total": 19,
            "isLast": true,
            "values": [
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10018",
                    "id": "10018",
                    "name": "Ecommerce - Release 06 (Marzo)",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-03-23",
                    "releaseDate": "2020-03-31",
                    "userStartDate": "22/Mar/20",
                    "userReleaseDate": "30/Mar/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 25
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10010",
                    "id": "10010",
                    "description": "Release E-Commerce Enero 13 a Febrero 28",
                    "name": "E-commerce Jan - Feb 20', 1st Release",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-01-13",
                    "releaseDate": "2020-03-23",
                    "userStartDate": "12/Jan/20",
                    "userReleaseDate": "22/Mar/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 39
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10011",
                    "id": "10011",
                    "description": "Release E-Commerce Diciembre 30 a Enero 10",
                    "name": "E-Commerce Jan 20', 1st Release",
                    "archived": false,
                    "released": true,
                    "startDate": "2019-12-30",
                    "releaseDate": "2020-01-10",
                    "userStartDate": "29/Dec/19",
                    "userReleaseDate": "09/Jan/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 10
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10012",
                    "id": "10012",
                    "description": "Release E-Commerce Diciembre 2 al 13",
                    "name": "E-Commerce Dec 19', 1st Release",
                    "archived": false,
                    "released": true,
                    "startDate": "2019-12-02",
                    "releaseDate": "2019-12-13",
                    "userStartDate": "01/Dec/19",
                    "userReleaseDate": "12/Dec/19",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 16
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10013",
                    "id": "10013",
                    "description": "Release para GO LIVE de la nueva funcionalidad de Multishipping",
                    "name": "Go Live Multishipping E-commerce Jan 20",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-02-13",
                    "releaseDate": "2020-02-27",
                    "userStartDate": "12/Feb/20",
                    "userReleaseDate": "26/Feb/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 76
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10014",
                    "id": "10014",
                    "description": "Release E-Commerce Diciembre 16 al 27",
                    "name": "E-Commerce Dec 19', 2nd Release",
                    "archived": false,
                    "released": true,
                    "startDate": "2019-12-16",
                    "releaseDate": "2020-01-31",
                    "userStartDate": "15/Dec/19",
                    "userReleaseDate": "30/Jan/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 21
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10017",
                    "id": "10017",
                    "name": "E-commerce Mar 20'",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-03-02",
                    "releaseDate": "2020-03-23",
                    "userStartDate": "01/Mar/20",
                    "userReleaseDate": "22/Mar/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 26
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10019",
                    "id": "10019",
                    "name": "Ecommerce - Release 07 (Abril)",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-04-01",
                    "releaseDate": "2020-04-17",
                    "userStartDate": "31/Mar/20",
                    "userReleaseDate": "16/Apr/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 30
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10020",
                    "id": "10020",
                    "name": "Ecommerce - Release 08 (Abril)",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-04-18",
                    "releaseDate": "2020-04-30",
                    "userStartDate": "17/Apr/20",
                    "userReleaseDate": "29/Apr/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 49
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10022",
                    "id": "10022",
                    "name": "Ecommerce - Release 09 (Mayo)",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-05-01",
                    "releaseDate": "2020-05-15",
                    "userStartDate": "30/Apr/20",
                    "userReleaseDate": "14/May/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 51
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10023",
                    "id": "10023",
                    "name": "Ecommerce - Release 05 Mayo 2020",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-05-16",
                    "releaseDate": "2020-05-31",
                    "userStartDate": "15/May/20",
                    "userReleaseDate": "30/May/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 31
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10024",
                    "id": "10024",
                    "name": "Ecommerce - Release 06 Junio 2020",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-06-01",
                    "releaseDate": "2020-06-30",
                    "userStartDate": "31/May/20",
                    "userReleaseDate": "29/Jun/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 1,
                        "inProgress": 0,
                        "done": 92
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10025",
                    "id": "10025",
                    "name": "Ecommerce - Release 07 Julio 2020",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-07-01",
                    "releaseDate": "2020-07-31",
                    "userStartDate": "30/Jun/20",
                    "userReleaseDate": "30/Jul/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 46
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10026",
                    "id": "10026",
                    "name": "Ecommerce - Release Grouping 2020",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-06-15",
                    "releaseDate": "2020-07-31",
                    "userStartDate": "14/Jun/20",
                    "userReleaseDate": "30/Jul/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 98
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10027",
                    "id": "10027",
                    "name": "Ecommerce - Release 08 Agosto 2020",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-08-01",
                    "releaseDate": "2020-08-31",
                    "userStartDate": "31/Jul/20",
                    "userReleaseDate": "30/Aug/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 46
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10029",
                    "id": "10029",
                    "name": "Ecommerce - Release 09 Septiembre 2020",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-09-01",
                    "releaseDate": "2020-09-30",
                    "userStartDate": "31/Aug/20",
                    "userReleaseDate": "29/Sep/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 33
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10030",
                    "id": "10030",
                    "name": "Ecommerce - Release 10 Octubre 2020",
                    "archived": false,
                    "released": true,
                    "startDate": "2020-10-01",
                    "releaseDate": "2020-10-31",
                    "userStartDate": "30/Sep/20",
                    "userReleaseDate": "30/Oct/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 36
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10031",
                    "id": "10031",
                    "name": "Ecommerce - Release 11 Noviembre 2020",
                    "archived": false,
                    "released": false,
                    "startDate": "2020-11-01",
                    "releaseDate": "2020-11-30",
                    "overdue": true,
                    "userStartDate": "31/Oct/20",
                    "userReleaseDate": "29/Nov/20",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 11
                    }
                },
                {
                    "expand": "issuesstatus",
                    "self": "https://cencosud.atlassian.net/rest/api/2/version/10050",
                    "id": "10050",
                    "name": "Limpieza",
                    "archived": false,
                    "released": true,
                    "releaseDate": "2021-05-29",
                    "userReleaseDate": "28/May/21",
                    "projectId": 10009,
                    "issuesStatusForFixVersion": {
                        "unmapped": 0,
                        "toDo": 0,
                        "inProgress": 0,
                        "done": 32
                    }
                }
            ]
        }
    };

    return {
        searchJql,
        getCurrentUser,
        getIssueBySelf,
        getIssueLinkTypes,
        getChildrens,
        getProjectVersions
    };
};
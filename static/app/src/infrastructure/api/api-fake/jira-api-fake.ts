import { IJiraApi } from '../../../domain/outgoing/jira-api.interface';

/**
 * Jira API
 * 
 * The Jira API uses REST API and enables you to interact with Jira programmatically.  
 * This Calls to back-end resolver using invoke and the back-end call to Jira REST API with asUser or asApp.
 * Other strategy is to use requestJira, it communicates directly with jira without going through the Back-end.
 */
export default function JiraApiFakeImpl(): IJiraApi {


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

    async function searchJql(jql: string) : Promise<any> {

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
                        "created": "2022-11-28T17:39:22.333-0300",
                        "duedate": null,
                        "issuelinks": [
                            {
                                "id": "10107",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10107",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                        "customfield_10015": "2022-11-29",
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
                        }
                    }
                },
                {
                    "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
                    "id": "10051",
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10051",
                    "key": "POR-3",
                    "fields": {
                        "summary": "Shop Project",
                        "duedate": "2022-12-31",
                        "created": "2022-11-18T11:59:32.924-0300",
                        "issuelinks": [
                            {
                                "id": "10076",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10076",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                        "duedate": null,
                        "created": "2022-11-15T19:40:15.333-0300",
                        "issuelinks": [
                            {
                                "id": "10102",
                                "self": "https://daropalmi.atlassian.net/rest/api/3/issueLink/10102",
                                "type": {
                                    "id": "10006",
                                    "name": "Project",
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                                    "inward": "is in project",
                                    "outward": "project includes",
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
                        "customfield_10015": "2022-11-28",
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
                        "duedate": "2022-12-31",
                        "created": "2022-11-14T10:30:59.174-0300",
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
                        "customfield_10015": "2022-11-07",
                        "status": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/status/10029",
                            "description": "",
                            "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/generic.png",
                            "name": "IMPLEMENTING",
                            "id": "10029",
                            "statusCategory": {
                                "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/4",
                                "id": 4,
                                "key": "indeterminate",
                                "colorName": "yellow",
                                "name": "In Progress"
                            }
                        }
                    }
                }
            ],
            "names": {
                "summary": "Summary",
                "created": "Created",
                "duedate": "Due date",
                "issuelinks": "Linked Issues",
                "assignee": "Assignee",
                "customfield_10015": "Start date",
                "status": "Status"
            },
            "schema": {
                "summary": {
                    "type": "string",
                    "system": "summary"
                },
                "created": {
                    "type": "datetime",
                    "system": "created"
                },
                "duedate": {
                    "type": "date",
                    "system": "duedate"
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
                "customfield_10015": {
                    "type": "date",
                    "custom": "com.atlassian.jira.plugin.system.customfieldtypes:datepicker",
                    "customId": 10015
                },
                "status": {
                    "type": "status",
                    "system": "status"
                }
            }
        }
    };


    return {
        searchJql,
        getCurrentUser
    };
};
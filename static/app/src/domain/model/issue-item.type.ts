
  
  /*
"key": "POR-4",
"fields": {
  "summary": "",
  "assignee":"Daro Palmi",
  "status": "",
  "customfield_10015": "2022-11-28",
  "duedate":"2022-12-31",
  issuetype: {
    "name": "Epic",
    "iconUrl": "url..."
    "issuelinks": [
      {
        "type": {
                            "name": "Initiative",
                            "outward": "includes",
                        },
        "outwardIssue": {
          "key": "AP-1",
          "self": "https://daropalmi.atlassian.net/rest/api/3/issue/10001",
        }
      }
    ]
  }
},
"hasChildren":
"childrens": {}

*/

import { IssueItemType, TreeToggleType } from "../../application/component/tree";

export const togglesTreeExample: TreeToggleType = {};
togglesTreeExample['k-1'] = false;
togglesTreeExample['k-2'] = false;
togglesTreeExample['k-21'] = false;
togglesTreeExample['k-22'] = false;
togglesTreeExample['k-221'] = false;
togglesTreeExample['k-222'] = false;

export const treeExample: IssueItemType[] = [
    {
      key: "k-1",
      summary: "item 1",
      iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
      hasChildren: false,
      fields: {
        "summary": "Proyecto ejemplo 2",
              "issuetype": {
                  "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                  "id": "10005",
                  "description": "Portfolio",
                  "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                  "name": "Portfolio",
                  "subtask": false,
                  "avatarId": 10551,
                  "hierarchyLevel": 0
              },
              "created": "2022-11-14T10:30:59.174-0300",
              "duedate": "2022-12-31",
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
                  "displayName": "Leo Messi",
                  "active": true,
                  "timeZone": "America/Santiago",
                  "accountType": "atlassian"
              }
      },
      childrens: []
    },
    {
        key: "k-2",
        summary: "item 2",
        iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
        hasChildren: true,
        fields: {
          "summary": "Proyecto ejemplo 2",
                "issuetype": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                    "id": "10005",
                    "description": "Portfolio",
                    "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                    "name": "Portfolio",
                    "subtask": false,
                    "avatarId": 10551,
                    "hierarchyLevel": 0
                },
                "created": "2022-11-14T10:30:59.174-0300",
                "duedate": "2022-12-31",
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
                }
        },
        childrens: [
            {
                key: "k-21",
                summary: "item 21",
                iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                hasChildren: false,
                fields: {"summary": "Proyecto ejemplo",
                "issuetype": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                    "id": "10005",
                    "description": "Portfolio",
                    "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                    "name": "Portfolio",
                    "subtask": false,
                    "avatarId": 10551,
                    "hierarchyLevel": 0
                },
                "created": "2022-11-14T10:30:59.174-0300",
                "duedate": "2022-12-31",
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
                    "displayName": "Ivonne Bueno",
                    "active": true,
                    "timeZone": "America/Santiago",
                    "accountType": "atlassian"
                }},
                childrens: []
              },
              {
                  key: "k-22",
                  summary: "item 22",
                  iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                  hasChildren: true,
                  fields: {
                    "summary": "Proyecto ejemplo 2",
                          "issuetype": {
                              "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                              "id": "10005",
                              "description": "Portfolio",
                              "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                              "name": "Portfolio",
                              "subtask": false,
                              "avatarId": 10551,
                              "hierarchyLevel": 0
                          },
                          "created": "2022-11-14T10:30:59.174-0300",
                          "duedate": "2022-12-31",
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
                              "displayName": "Roberto Carlos",
                              "active": true,
                              "timeZone": "America/Santiago",
                              "accountType": "atlassian"
                          }
                  },
                  childrens: [
                    {
                        key: "k-221",
                        summary: "item 221",
                        iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                        hasChildren: false,
                        fields: {"summary": "Proyecto ejemplo",
                        "issuetype": {
                            "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                            "id": "10005",
                            "description": "Portfolio",
                            "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                            "name": "Portfolio",
                            "subtask": false,
                            "avatarId": 10551,
                            "hierarchyLevel": 0
                        },
                        "created": "2022-11-14T10:30:59.174-0300",
                        "duedate": "2022-12-31",
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
                            "displayName": "Alonso de córdoba",
                            "active": true,
                            "timeZone": "America/Santiago",
                            "accountType": "atlassian"
                        }},
                        childrens: []
                      },
                      {
                          key: "k-222",
                          summary: "item 222",
                          iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                          hasChildren: false,
                          fields: {"summary": "Proyecto ejemplo",
                          "issuetype": {
                              "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                              "id": "10005",
                              "description": "Portfolio",
                              "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                              "name": "Portfolio",
                              "subtask": false,
                              "avatarId": 10551,
                              "hierarchyLevel": 0
                          },
                          "created": "2022-11-14T10:30:59.174-0300",
                          "duedate": "2022-12-31",
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
                              "displayName": "Sebastian",
                              "active": true,
                              "timeZone": "America/Santiago",
                              "accountType": "atlassian"
                          }},
                          childrens: []
                        }
                ]
                }
        ]
      }

  ];

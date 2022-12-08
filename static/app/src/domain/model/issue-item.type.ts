
  
  /*
"key": "POR-4",
"fields": {
  "summary": "",
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
      fields: {},
      childrens: []
    },
    {
        key: "k-2",
        summary: "item 2",
        iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
        hasChildren: true,
        fields: {},
        childrens: [
            {
                key: "k-21",
                summary: "item 21",
                iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                hasChildren: false,
                fields: {},
                childrens: []
              },
              {
                  key: "k-22",
                  summary: "item 22",
                  iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                  hasChildren: true,
                  fields: {},
                  childrens: [
                    {
                        key: "k-221",
                        summary: "item 221",
                        iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                        hasChildren: false,
                        fields: {},
                        childrens: []
                      },
                      {
                          key: "k-222",
                          summary: "item 222",
                          iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                          hasChildren: false,
                          fields: {},
                          childrens: []
                        }
                ]
                }
        ]
      }

  ];

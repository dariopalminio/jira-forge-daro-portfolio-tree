export type IssueItemType = {
    key: string;
    summary: string;
    iconUrl: string;
    fields: any;
    hasChildren: boolean;
    childrens: Array<IssueItemType>;
  };
  
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

export const treeExample: IssueItemType[] = [
    {
      key: "1",
      summary: "item 1",
      iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
      hasChildren: false,
      fields: {},
      childrens: []
    },
    {
        key: "2",
        summary: "item 2",
        iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
        hasChildren: true,
        fields: {},
        childrens: [
            {
                key: "21",
                summary: "item 21",
                iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                hasChildren: false,
                fields: {},
                childrens: []
              },
              {
                  key: "22",
                  summary: "item 22",
                  iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                  hasChildren: true,
                  fields: {},
                  childrens: [
                    {
                        key: "221",
                        summary: "item 221",
                        iconUrl: "https://daropalmi.atlassian.net/images/icons/issuetypes/epic.svg",
                        hasChildren: false,
                        fields: {},
                        childrens: []
                      },
                      {
                          key: "222",
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

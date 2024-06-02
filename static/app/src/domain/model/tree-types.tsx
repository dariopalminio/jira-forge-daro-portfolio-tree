/**
 * IssueTreeNodeType is a nnode for tree data structure. 
 * The “node” is the basic structure we use to build a “tree”. All the elements of a tree are nodes.
 */
export type IssueTreeNodeType = {
    key: string;
    level: number;
    summary: string;
    iconUrl: string;
    path: string;
    fields: any;
    hasChildren: boolean;
    childrens: Array<IssueTreeNodeType>;
  };

  export const issueItemDefault: IssueTreeNodeType = {
    key: 'root',
    level: 1,
    summary: 'root',
    iconUrl: '',
    path: '',
    fields: {},
    hasChildren: false,
    childrens: []
  };

export type TreeToggleType = { [key: string]: boolean };

export const emptyTreeToggle: TreeToggleType = {};
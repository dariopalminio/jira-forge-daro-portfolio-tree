export type IssueItemType = {
    key: string;
    summary: string;
    iconUrl: string;
    fields: any;
    hasChildren: boolean;
    childrens: Array<IssueItemType>;
  };

export type TreeToggleType = { [key: string]: boolean };


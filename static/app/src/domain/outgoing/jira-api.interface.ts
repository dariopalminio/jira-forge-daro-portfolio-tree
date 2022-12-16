

//Interface to do dependency inversion
export interface IJiraApi {

  searchJql: (jql: string) => Promise<any>;
  getCurrentUser: () => Promise<any>;
  getIssueBySelf: (issueUrl: string) => Promise<any>;
  getIssueLinkTypes: ()=>  Promise<any>;
  getIssuesByEpikLink: (epicKey: string)=>  Promise<any>;
};
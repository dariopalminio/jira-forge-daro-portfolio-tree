

//Interface to do dependency inversion
export interface IJiraApi {

  searchJql: (jql: string, maxResults: number, startAt: number) => Promise<any>;
  getChildrens: (parentKey: string, maxResults: number, startAt: number)=>  Promise<any>;
  getCurrentUser: () => Promise<any>;
  getIssueBySelf: (issueUrl: string) => Promise<any>;
  getIssueLinkTypes: ()=>  Promise<any>;
  getProjectVersions: (projectKey: string) => Promise<any>;
};
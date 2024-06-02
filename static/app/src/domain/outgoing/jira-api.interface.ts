

//Interface to do dependency inversion
export interface IJiraApi {

  searchJql: (jql: string) => Promise<any[]>;
  getChildrens: (parentKey: string)=>  Promise<any[]>;
  getIssueBySelf: (issueUrl: string) => Promise<any>;
  getProjectVersions: (projectKey: string) => Promise<any>;
};
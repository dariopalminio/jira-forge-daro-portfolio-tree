export type VersionType = {
    self: string;
    id: string;
    description: string;
    name: string;
    archived: boolean;
    released: boolean;
    releaseDate: string;
    overdue: boolean;
    projectId: number;
    userReleaseDate?: string;
    userStartDate?: string;
    issuesStatusForFixVersion: {
        unmapped: number;
        toDo: number;
        inProgress:number;
        done: number;
    }
  };

  //Paginated version result
export type VersionResultType = {
    self: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: Array<VersionType>;
  };

  export type ProjectVersions = {
    projectKey: string;
    projectName: string;
    versions: Array<VersionType>;
  };
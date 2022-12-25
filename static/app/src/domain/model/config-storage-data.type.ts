
export type ConfigStorageDataType = {
  updatedAt: string;
  linksOutwards: string[];
  lastJql: string;
};

export const ConfigStorageDataDefault: ConfigStorageDataType = {
  updatedAt: '',
  linksOutwards: [],
  lastJql: ''
}

/*
const configStorageData = {
  linksOutwards: ['includes'],
  permission: {
    edit: {
      groups: ['site-admins'],
      users: [
        {accountId: '636915272f8b3c8f116ac78d'}
      ]
    },
    view: {
      groups: ['site-admins'],
      users: [
        {accountId: '636915272f8b3c8f116ac78d'}
      ]
    }
  }
}


*/
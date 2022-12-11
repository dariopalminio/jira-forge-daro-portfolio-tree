
export type ConfigStorageDataType = {
  updatedAt: string;
  linksOutwards: string[];
};

export const ConfigStorageDataDefault: ConfigStorageDataType = {
  updatedAt: '2022-11-07',
  linksOutwards: ['includes']
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
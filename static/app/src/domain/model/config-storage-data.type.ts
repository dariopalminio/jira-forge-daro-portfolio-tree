
export type ConfigStorageDataType = {
  date: string;
  linksOutwards: string[];
};

export const ConfigStorageDataDefault: ConfigStorageDataType = {
  date: '2022-11-07',
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

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


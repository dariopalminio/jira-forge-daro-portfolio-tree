

//Interface to do dependency inversion
export interface IStorageApi {

    getConfigStorage: (key: string) => Promise<any>;
    setConfigStorage: (key: string, data: any) => Promise<any>;

  };        
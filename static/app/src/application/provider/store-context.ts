import { createContext } from 'react';
import { ConfigStorageDataDefault, ConfigStorageDataType } from '../../domain/model/config-storage-data.type';


export interface IStoreContext {
    configData: ConfigStorageDataType;
    setConfigData: (newConfigData: ConfigStorageDataType) => void;
    configHasChanges: boolean;
    setConfigHasChanges: (configHasChanges: boolean) => void;
    setConfigStorage: (configData: ConfigStorageDataType) => Promise<ConfigStorageDataType>;
};
// const setConfigStorage = useCallback(async (configData: ConfigStorageDataType): Promise<ConfigStorageDataType> => {

export const StoreContextDefaultValues: IStoreContext = {
    configData: ConfigStorageDataDefault,
    setConfigData: (newConfigData: ConfigStorageDataType) => { },
    configHasChanges: false,
    setConfigHasChanges: (configHasChanges: boolean) => {},
    setConfigStorage: async (configData: ConfigStorageDataType): Promise<ConfigStorageDataType> => {
        return Promise.resolve(configData); 
    },
};

const StoreContext = createContext<IStoreContext>(StoreContextDefaultValues);


export default StoreContext;
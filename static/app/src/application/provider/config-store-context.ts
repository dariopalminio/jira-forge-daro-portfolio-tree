import { createContext } from 'react';
import { ConfigStorageDataDefault, ConfigStorageDataType } from '../../domain/model/config-storage-data-type';
import { InitialResultState } from '../../domain/hook/hook-result-state.type';


export interface IConfigStoreContext {
    configData: ConfigStorageDataType;
    setConfigData: (newConfigData: ConfigStorageDataType) => void;
    configHasChanges: boolean;
    setConfigHasChanges: (configHasChanges: boolean) => void;
    setConfigStorage: (configData: ConfigStorageDataType) => Promise<ConfigStorageDataType>;
    getOutwardsFromJira: () => Promise<string[]>;
    resultState: any
};
// const setConfigStorage = useCallback(async (configData: ConfigStorageDataType): Promise<ConfigStorageDataType> => {

export const StoreContextDefaultValues: IConfigStoreContext = {
    configData: ConfigStorageDataDefault,
    setConfigData: (newConfigData: ConfigStorageDataType) => { },
    configHasChanges: false,
    setConfigHasChanges: (configHasChanges: boolean) => {},
    setConfigStorage: async (configData: ConfigStorageDataType): Promise<ConfigStorageDataType> => {
        return Promise.resolve(configData); 
    },
    getOutwardsFromJira: async (): Promise<string[]> => {
        return Promise.resolve([]); 
    },
    resultState: InitialResultState
};

const ConfigStoreContext = createContext<IConfigStoreContext>(StoreContextDefaultValues);


export default ConfigStoreContext;
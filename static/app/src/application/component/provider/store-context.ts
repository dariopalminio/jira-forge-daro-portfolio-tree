import { createContext } from 'react';
import { ConfigStorageDataDefault, ConfigStorageDataType } from '../../../domain/model/config-storage-data.type';


export interface IStoreContext {
    configData: ConfigStorageDataType;
    setConfigData: (newConfigData: ConfigStorageDataType) => void;
    configHasChanges: boolean;
    setConfigHasChanges: (configHasChanges: boolean) => void;
};

export const StoreContextDefaultValues: IStoreContext = {
    configData: ConfigStorageDataDefault,
    setConfigData: (newConfigData: ConfigStorageDataType) => { },
    configHasChanges: false,
    setConfigHasChanges: (configHasChanges: boolean) => {}
};

const StoreContext = createContext<IStoreContext>(StoreContextDefaultValues);


export default StoreContext;
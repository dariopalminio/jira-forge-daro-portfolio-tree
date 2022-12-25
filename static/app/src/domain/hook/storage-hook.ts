import { useContext, useState } from 'react';
import StorageApiImpl from '../../infrastructure/api/storage-api.impl';
import { ConfigStorageDataDefault, ConfigStorageDataType } from '../model/config-storage-data.type';
import { IStorageApi } from '../outgoing/storage-api.interface';
import { IHookState, InitialState } from './hook.type';
import * as GlobalConfig from '../../infrastructure/global.config';

const CONFIG_KEY = 'CONFIG';
/**
 * Custom hook
 * 
 * All users share the same configuration storage.
 * 
 * @returns 
 */
export default function useStorageHook() {

    const [state, setState] = useState<IHookState>(InitialState);
    const storageApi: IStorageApi = GlobalConfig.Factory.get('storageApi');

    const getConfigStorage = async (): Promise<ConfigStorageDataType> => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const data = await storageApi.getConfigStorage(CONFIG_KEY);
            if (!data || data === null || data === undefined || isEmpty(data)) {
                //The first time there is no data
                const config: ConfigStorageDataType = ConfigStorageDataDefault;
                return config;
            }
            const config: ConfigStorageDataType = data;
            return config;
        } catch (error) {
            //TODO...
            console.error(error);
            return ConfigStorageDataDefault;
        }
    };

    const isEmpty = (object: any) => {
        for (const property in object) {
            return false;
        }
        return true;
    }

    const setConfigStorage = async (configData: ConfigStorageDataType): Promise<ConfigStorageDataType> => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const data: any = await storageApi.setConfigStorage(CONFIG_KEY, configData);
            const config: ConfigStorageDataType = data;
            return config;
        } catch (error) {
            //TODO...
            console.error(error);
            return ConfigStorageDataDefault;
        }
    };

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getConfigStorage,
        setConfigStorage
    };
};
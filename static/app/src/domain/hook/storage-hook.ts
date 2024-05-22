import { useState, useCallback } from 'react';
import { ConfigStorageDataDefault, ConfigStorageDataType } from '../model/config-storage-data.type';
import { IStorageApi } from '../outgoing/storage-api.interface';
import { IHookState, InitialState } from './hook.type';
import * as GlobalConfig from '../../infrastructure/global.config';
import { ServiceKeys } from '../outgoing/service-key';

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
    const storageApi: IStorageApi = GlobalConfig.Factory.get(ServiceKeys.StorageApi);

    const getConfigStorage = useCallback(async (): Promise<ConfigStorageDataType> => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const data = await storageApi.getConfigStorage(CONFIG_KEY);
            return data || ConfigStorageDataDefault;
        } catch (error) {
            console.error(error);
            setState({ ...state, hasError: true, msg: 'Error fetching configuration' });
            return ConfigStorageDataDefault;
        }
    }, [storageApi]);

    const setConfigStorage = useCallback(async (configData: ConfigStorageDataType): Promise<ConfigStorageDataType> => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const data = await storageApi.setConfigStorage(CONFIG_KEY, configData);
            setState({ ...state, isSuccess: true });
            return data;
        } catch (error) {
            console.error(error);
            setState({ ...state, hasError: true, msg: 'Error updating configuration' });
            return ConfigStorageDataDefault;
        }
    }, [storageApi]);

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getConfigStorage,
        setConfigStorage
    };
};
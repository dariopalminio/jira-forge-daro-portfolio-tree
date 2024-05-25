import { useState, useCallback } from 'react';
import { ConfigStorageDataDefault, ConfigStorageDataType } from '../model/config-storage-data.type';
import { IStorageApi } from '../outgoing/storage-api.interface';
import { IHookState, InitialState } from './hook.type';

const CONFIG_KEY = 'CONFIG';
/**
 * Custom hook
 * 
 * All users share the same configuration storage.
 * 
 */
export default function useJiraStorageHook(storageApi: IStorageApi) {
    const [state, setState] = useState<IHookState>(InitialState);

    const getConfigStorage = useCallback(async (): Promise<ConfigStorageDataType> => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const data = await storageApi.getConfigStorage(CONFIG_KEY);
            setState({ isProcessing: false, hasError: false, msg: '', isSuccess: true });
            return data || ConfigStorageDataDefault;
        } catch (error) {
            console.error(error);
            setState({ ...state, hasError: true, msg: 'Error fetching configuration' });
            return ConfigStorageDataDefault;
        }
    }, []);

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
    }, []);

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getConfigStorage,
        setConfigStorage
    };
};
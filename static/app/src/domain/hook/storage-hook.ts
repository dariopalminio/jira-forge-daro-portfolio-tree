import { useContext, useState } from 'react';
import StorageApiImpl from '../../infrastructure/storage/storage-api.impl';
import { ConfigStorageData } from '../model/config-storage-data';
import { IStorageApi } from '../outgoing/storage-api.interface';
import { IHookState, InitialState } from './hook.type';


/**
 * Custom hook
 * 
 * @returns 
 */
export default function useStorageHook() {

    const [state, setState] = useState<IHookState>(InitialState);
    const storageApi: IStorageApi = StorageApiImpl();


    const getConfigStorage = async () => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const data: any = await storageApi.getConfigStorage('CONFIG');
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const setConfigStorage = async () => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const configData: ConfigStorageData = {
                date: (new Date).toString()
            };
            const data: any = await storageApi.setConfigStorage('CONFIG', configData);
            return data;
        } catch (error) {
            console.error(error);
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
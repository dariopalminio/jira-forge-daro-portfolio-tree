import { useContext, useState } from 'react';
import StorageApiImpl from '../../infrastructure/storage/storage-api.impl';
import { ConfigStorageDataType } from '../model/config-storage-data.type';
import { IStorageApi } from '../outgoing/storage-api.interface';
import { IHookState, InitialState } from './hook.type';
import * as GlobalConfig from '../../infrastructure/global.config';

/**
 * Custom hook
 * 
 * @returns 
 */
export default function useStorageHook() {

    const [state, setState] = useState<IHookState>(InitialState);
    //const storageApi: IStorageApi = StorageApiImpl();
    const storageApi: IStorageApi = GlobalConfig.Factory.get('storageApi');

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
            const configData: ConfigStorageDataType = {
                updatedAt: (new Date).toString(),
                linksOutwards: ['includes']
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
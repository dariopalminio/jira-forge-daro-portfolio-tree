import { useState, useCallback } from 'react';
import { ConfigStorageDataDefault, ConfigStorageDataType } from '../model/config-storage-data.type';
import { IStorageApi } from '../outgoing/storage-api.interface';
import { IHookResultState, InitialResultState, ProcessingResultState } from './hook-result-state.type';

const CONFIG_KEY = 'CONFIG';
/**
 * Custom hook
 * 
 * All users share the same configuration storage.
 * 
 */
export default function useJiraStorageHook(storageApi: IStorageApi) {
    
    const [resultState, setResultState] = useState<IHookResultState>(InitialResultState); //Result status

    const getConfigStorage = useCallback(async (): Promise<ConfigStorageDataType> => {
        setResultState(ProcessingResultState);
        try {
            const data = await storageApi.getConfigStorage(CONFIG_KEY);
            setResultState({ ...resultState, isSuccess: true });
            const dataStructured: ConfigStorageDataType = {...ConfigStorageDataDefault, ...data}
            return dataStructured || ConfigStorageDataDefault;
        } catch (error) {
            console.error("Error in Hook named useJiraStorageHook: ", error);
            setResultState({ ...resultState, isProcessing: false, hasError: true, msg: 'Error fetching configuration' });
            return ConfigStorageDataDefault;
        }
    }, []);

    const setConfigStorage = useCallback(async (configData: ConfigStorageDataType): Promise<ConfigStorageDataType> => {
        setResultState({...ProcessingResultState, msg: "Saving..."});
        try {
            const data = await storageApi.setConfigStorage(CONFIG_KEY, configData);
            setResultState({ ...resultState, isProcessing: false, isSuccess: true });
            return data;
        } catch (error) {
            console.error(error);
            setResultState({ ...resultState, isProcessing: false, hasError: true, msg: 'Error updating configuration' });
            return ConfigStorageDataDefault;
        }
    }, []);

        /**
     * Get array of outward names from Jira
     * @returns array of parent-child link type names of outward, eg ['includes', 'featutes by', 'related to']
     */
        const getOutwardsFromJira = useCallback(async (): Promise<string[]> => {
            setResultState({...ProcessingResultState, msg: "Loading..."});
            const excludedOutwards = ['blocks', 'causes', 'clones', 'duplicates', 'relates to'];
            try {
                let outward: string[] = [];
                const data: any = await storageApi.getIssueLinkTypes();
                const issueLinkTypes: any = data.issueLinkTypes;
                for (var i = 0; i < issueLinkTypes.length; i++) {
                    if (issueLinkTypes[i].outward
                        && (typeof issueLinkTypes[i].outward === 'string')
                        && issueLinkTypes[i].outward !== '') {
                        if (!excludedOutwards.includes(issueLinkTypes[i].outward)) {
                            outward.push(issueLinkTypes[i].outward);
                        }
                    }
                }
                setResultState({ ...resultState, isProcessing: false, isSuccess: true });
                return outward;
            } catch (error) {
                console.error("Error in get outwards from jira:", error);
                setResultState({ ...resultState, isProcessing: false, hasError: true, msg: 'Error getOutwards from jira' });
                throw error;
            }
        }, []);

    return {
        resultState,
        getConfigStorage,
        setConfigStorage,
        getOutwardsFromJira
    };
};
import { invoke } from '@forge/bridge';
import { IStorageApi } from '../../domain/outgoing/storage-api.interface';
import { requestJira } from '@forge/bridge';

/**
 * Storage API
 * 
 * This resource provides methods to store values in Forge app storage.
 * Data stored using the Storage API isn't shared between Forge apps on the same site or across different Atlassian sites.
 * The Storage API requires your app to have the storage:app scope. 
 * You don't need to include any identifiers for apps or installations in your key.
 * Internally, Forge automatically prepends an identifier to every key, mapping it to the right app and installation. 
 * This lets you use the full key length without risking conflicts across apps or installations.
 */
export default function StorageApiImpl(): IStorageApi {

    async function getConfigStorage(key: string): Promise<any> {
        try {
            const payload = {
                key: key
            };
            const info: any | null = await invoke('getConfigStorage', payload);
            return info;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Stores a JSON value with a specified key. 
     * Forge resolves write conflicts using a last-write-wins strategy.
     * @returns 
     */
    async function setConfigStorage(key: string, data: any): Promise<any> {
        try {
            const payload = {
                key: key, //'CONFIG'
                data: data
            };
            const info: any | null = await invoke('setConfigStorage', payload);
            return info;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

        /**
     * Get issue link types
     * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-link-types/
     */
        async function getIssueLinkTypes(): Promise<any> {
            try {
                const response = await requestJira(`/rest/api/3/issueLinkType`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

    return {
        getConfigStorage,
        getIssueLinkTypes,
        setConfigStorage
    };
};
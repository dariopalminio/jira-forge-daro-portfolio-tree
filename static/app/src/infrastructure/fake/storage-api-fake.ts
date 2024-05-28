import { IStorageApi } from "../../domain/outgoing/storage-api.interface";

/**
 * Jira Storage Api FAKE (mocked)
 * 
 * In this mode, API client responses are simulated with FAKE responses.
 */
export default function StorageApiFake(): IStorageApi {


    async function getConfigStorage(key: string): Promise<any> {
        return {
            updatedAt: '',
            linksOutwards: ['includes'],
            lastJql: ''
        }
    };

    /**
     * Stores a JSON value with a specified key. 
     * Forge resolves write conflicts using a last-write-wins strategy.
     * @returns 
     */
    async function setConfigStorage(key: string, data: any): Promise<any> {

        const payload = {
            key: key, //'CONFIG'
            data: data
        };
        return data;

    };

    return {
        getConfigStorage,
        setConfigStorage
    };
};
import { IStorageApi } from "../../../domain/outgoing/storage-api.interface";


export default function StorageApiFake(): IStorageApi {


    async function getConfigStorage(key: string): Promise<any> {
        return {
            updatedAt: '',
            linksOutwards: ['includes'],
            lastJql: '',
            maxResults: '15'
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
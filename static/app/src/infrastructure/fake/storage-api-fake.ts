import { IStorageApi } from "../../domain/outgoing/storage-api.interface";

/**
 * Jira Storage Api FAKE (mocked)
 * 
 * In this mode, API client responses are simulated with FAKE responses.
 */
export default function StorageApiFake(): IStorageApi {

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

        await delay(1000); 
        const payload = {
            key: key, //'CONFIG'
            data: data
        };
        return data;

    };

    
    async function getIssueLinkTypes(): Promise<any> {
        console.log("Fake for getIssueLinkTypes( ):");

        await delay(1000); 

        return {
            "issueLinkTypes": [
                {
                    "id": "10000",
                    "name": "Blocks",
                    "inward": "is blocked by",
                    "outward": "blocks",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10000"
                },
                {
                    "id": "10001",
                    "name": "Cloners",
                    "inward": "is cloned by",
                    "outward": "clones",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10001"
                },
                {
                    "id": "10002",
                    "name": "Duplicate",
                    "inward": "is duplicated by",
                    "outward": "duplicates",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10002"
                },
                {
                    "id": "10007",
                    "name": "Initiative",
                    "inward": "is included by",
                    "outward": "includes",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10007"
                },
                {
                    "id": "10006",
                    "name": "Problem/Incident",
                    "inward": "is caused by",
                    "outward": "causes",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10006"
                },
                {
                    "id": "10003",
                    "name": "Relates",
                    "inward": "relates to",
                    "outward": "relates to",
                    "self": "https://dariopalminio.atlassian.net/rest/api/3/issueLinkType/10003"
                }
            ]
        }
    }
    
    return {
        getConfigStorage,
        setConfigStorage,
        getIssueLinkTypes
    };
};
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useStorageHook from "../../domain/hook/storage-hook";


const ConfigStore: React.FC = () => {
    const [configData, setConfigData] = useState(null);
    const { getConfigStorage,
        setConfigStorage } = useStorageHook();
    const { t } = useTranslation();

    useEffect(() => {
        const getData = async () => {
            try {
                //Promise<array | boolean | number | object | string>
                const info: any | null = await getConfigStorage();
                console.log('******getConfigStorage info:', info);
                console.log('******getConfigStorage info typeof:', typeof info);
                setConfigData(info);
            } catch (error) {
                console.log(error);
            }
        }
        const setData = async () => {
            try {
                //info: Promise<array | boolean | number | object | string>
                const info: any | null = await setConfigStorage();
            } catch (error) {
                console.log(error);
            }
        }
        getData()
        setData()
    }, []);

    return (
        <div>
            <h2>{t('test')} 4: Config Data</h2>
            <p>data: {configData !== null ? JSON.stringify(configData) : 'null'}</p>
        </div>
    );
};

export default ConfigStore;
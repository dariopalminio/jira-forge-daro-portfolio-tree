import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Tabs from '../common/tab-panel/tabs';
import { TabsType } from '../common/tab-panel/types';
import styles from './portfolio-panel.module.css';
import SearchJql from "./search-jql";
import ConfigStore from "./config-store";
import PortfolioContext from "../../domain/context/portfolio-context";
import useStorageHook from "../../domain/hook/storage-hook";

interface IProps {
}

const PortfolioPanel: React.FC<IProps> = (props: IProps) => {
    const { t, i18n } = useTranslation();
    const [tabSelected, setTabSelected] = useState<string>('tab-1');
    const { configData, setConfigData } = useContext(PortfolioContext);
    const { getConfigStorage,
        setConfigStorage } = useStorageHook();
        
    const tabs: TabsType = [
        {
            id: 'tab-1',
            text: t('portfolio')
        },
        {
            id: 'tab-2',
            text: t('configure')
        }
    ];

    useEffect(() => {
        const getData = async () => {
            try {
                //Promise<array | boolean | number | object | string>
                const info: any | null = await getConfigStorage();
                console.log('******getConfigStorage info:', info);
                console.log('******getConfigStorage info typeof:', typeof info);
                setConfigData(info);
                //const infoResponse: any | null = await setConfigStorage();
            } catch (error) {
                console.log(error);
            }
        }

        getData()
    }, []);
    
    return (
        <div id="TabPanel" className={styles.panelContainer}>
            <Tabs tabs={tabs} idTabSelected={tabSelected} onClick={(idTab: string) => setTabSelected(idTab)}></Tabs>
            <div id="Panel" style={{height: "100%"}}>
                {tabSelected === 'tab-1' && <SearchJql />}
                {tabSelected === 'tab-2' && <ConfigStore />}
            </div>
        </div>
    );
};

export default PortfolioPanel;
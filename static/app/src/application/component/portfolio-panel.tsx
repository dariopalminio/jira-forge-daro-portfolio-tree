import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Tabs from '../common/tab-panel/tabs';
import { TabsType } from '../common/tab-panel/types';
import styles from './portfolio-panel.module.css';
import SearchView from "./vew/search-vew";
import ConfigStore from "./config/config-store";


interface IProps {
}

const PortfolioPanel: React.FC<IProps> = (props: IProps) => {
    const { t, i18n } = useTranslation();
    const [tabSelected, setTabSelected] = useState<string>('SearchView');

        
    const tabs: TabsType = [
        {
            id: 'SearchView',
            text: t('portfolio')
        },
        {
            id: 'ConfigStore',
            text: t('configure')
        }
    ];

    useEffect(() => {

    }, []);
    
    return (
        <div id="TabPanel" className={styles.panelContainer}>
            <Tabs tabs={tabs} idTabSelected={tabSelected} onClick={(idTab: string) => setTabSelected(idTab)}></Tabs>
            <div id="Panel" style={{height: "100%"}}>
                {tabSelected === 'SearchView' && <SearchView />}
                {tabSelected === 'ConfigStore' && <ConfigStore />}
            </div>
        </div>
    );
};

export default PortfolioPanel;
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Tabs from '../common/tab-panel/tabs';
import { TabsType } from '../common/tab-panel/types';
import styles from './portfolio-panel.module.css';
import SearchView from "./vew/search-vew";
import ConfigStore from "./config/config-store";
import { supportedLngs } from '../../domain/i18n/supported-lngs';
import { ServiceKeys } from "../../domain/outgoing/service-key";
import FactoryContext from "../provider/factory-context";
import useJiraUserHook from "../../domain/hook/jira-user-hook";
import { IJiraUserApi } from "../../domain/outgoing/jira-user-api.interface";

interface IProps {
}

const PortfolioPanel: React.FC<IProps> = (props: IProps) => {
    const [tabSelected, setTabSelected] = useState<string>('SearchView');
    const { getObject } = useContext(FactoryContext);
    const jiraUserApi: IJiraUserApi = getObject(ServiceKeys.JiraUserApi);
    const { getCurrentUser } = useJiraUserHook(jiraUserApi);
    const { t, i18n } = useTranslation();

    /**
 * Change the language to display in the browser based on the language of the current user
 */
    const changeLngToUserLng = (locale: string) => {
        if (locale === undefined || typeof locale != 'string' || locale.trim() === '') {
            console.log('The locale not detected for current user.');
            return;
        }
        let lng: string = locale.toLowerCase();
        lng = lng.substring(0, 2); // 'es_ES' -> 'es'
        if (!supportedLngs.includes(lng)) {
            console.log('The locale is not includedin this app.');
            return;
        }
        i18n.changeLanguage(lng);
    }

    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const infoUser: any = await getCurrentUser();
                if (infoUser) {
                    changeLngToUserLng(infoUser.locale);
                    return;
                }
                throw new Error("User Info is null!");
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        getData();
        return () => {
            isMounted = false;
        };
    }, []);

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

    return (
        <div id="TabPanel" className={styles.panelContainer}>
            <Tabs tabs={tabs} idTabSelected={tabSelected} onClick={(idTab: string) => setTabSelected(idTab)}></Tabs>
            <div id="Panel" style={{ height: "100%" }}>
                {tabSelected === 'SearchView' && <SearchView />}
                {tabSelected === 'ConfigStore' && <ConfigStore />}
            </div>
        </div>
    );
};

export default PortfolioPanel;
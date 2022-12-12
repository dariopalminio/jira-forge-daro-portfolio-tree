import React, { useEffect, useState } from 'react';
import ConfigStore from './component/config-store';
import styles from './App.module.css';
import { useTranslation } from "react-i18next";
import SearchJql from './component/search-jql';
import useJiraHook from '../domain/hook/jira-hook';
import { supportedLngs } from '../domain/i18n/supported-lngs';
import PortfolioContextProvider from './portfolio.provider';
import PortfolioPanel from './component/portfolio-panel';



function App() {
    const { getCurrentUser } = useJiraHook();
    const [currentUser, setCurrentUser] = useState<any>({});
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
        console.log('--->i18n.language before:', i18n.language);
        i18n.changeLanguage(lng);
        console.log('--->i18n.language after:', i18n.language);
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const infoUser: any = await getCurrentUser();
                setCurrentUser(infoUser);
                console.log('--->i18n.language infoUser.locale:', infoUser.locale);
                changeLngToUserLng(infoUser.locale);
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, []);

    return (
        <div className={styles.app}>
            <PortfolioContextProvider>
                <PortfolioPanel />
            </PortfolioContextProvider>
            <br />
        </div>
    );
}

export default App;

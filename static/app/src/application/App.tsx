import React, { useEffect, useState } from 'react';
import ConfigStore from './component/config/config-store';
import styles from './App.module.css';
import { useTranslation } from "react-i18next";
import SearchJql from './component/vew/search-vew';
import useJiraHook from '../domain/hook/jira-hook';
import { supportedLngs } from '../domain/i18n/supported-lngs';
import PortfolioContextProvider from './component/provider/portfolio.provider';
import PortfolioPanel from './component/portfolio-panel';
import StoreContextProvider from './component/provider/store.provider';



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
        i18n.changeLanguage(lng);
    }

    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const infoUser: any = await getCurrentUser();
                setCurrentUser(infoUser);
                console.log("Init infoUser:", infoUser);
                if (infoUser) {
                    changeLngToUserLng(infoUser.locale);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        getData();
        return () => {
            isMounted = false;  
        };
    }, []);

    return (
        <div className={styles.app}>
            <StoreContextProvider>
                <PortfolioContextProvider>
                    <PortfolioPanel />
                </PortfolioContextProvider>
            </StoreContextProvider>
            <br />
        </div>
    );
}

export default App;

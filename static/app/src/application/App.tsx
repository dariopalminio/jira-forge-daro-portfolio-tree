import React, { useState } from 'react';
import styles from './App.module.css';
import { useTranslation } from "react-i18next";
import PortfolioContextProvider from './provider/portfolio.provider';
import PortfolioPanel from './component/portfolio-panel';
import StoreContextProvider from './provider/store.provider';
import FactoryContextProvider from './provider/factory.provider';



function App() {

    return (
        <div className={styles.app}>
            <FactoryContextProvider>
                <StoreContextProvider>
                    <PortfolioContextProvider>
                        <PortfolioPanel />
                    </PortfolioContextProvider>
                </StoreContextProvider>
            </FactoryContextProvider>
            <br />
        </div>
    );
}

export default App;

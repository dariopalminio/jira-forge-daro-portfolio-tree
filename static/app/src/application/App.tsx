import React, { useState } from 'react';
import styles from './App.module.css';
import { useTranslation } from "react-i18next";
import PortfolioTreeContextProvider from './provider/portfolio-tree-context.provider';
import PortfolioPanel from './component/portfolio-panel';
import ConfigStoreContextProvider from './provider/config-store-context.provider';
import FactoryContextProvider from './provider/factory-context.provider';
import 'normalize.css';


function App() {

    return (
        <div className={styles.app}>
            <FactoryContextProvider>
                <ConfigStoreContextProvider>
                    <PortfolioTreeContextProvider>
                        <PortfolioPanel />
                    </PortfolioTreeContextProvider>
                </ConfigStoreContextProvider>
            </FactoryContextProvider>
            <br />
        </div>
    );
}

export default App;

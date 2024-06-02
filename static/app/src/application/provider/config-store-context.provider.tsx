import { FC, useEffect, useState, useContext } from "react";
import ConfigStoreContext from "./config-store-context";
import useJiraStorageHook from "../../domain/hook/jira-storage-hook";
import { ConfigStorageDataDefault, ConfigStorageDataType } from "../../domain/model/config-storage-data-type";
import { IStorageApi } from "../../domain/outgoing/storage-api.interface";
import FactoryContext from "./factory-context";
import { ServiceKeys } from "../../domain/outgoing/service-key";
import Loading from "../common/loading/loading";

interface Props { children?: React.ReactNode }

const ConfigStoreContextProvider: FC<Props> = ({ children }) => {
  const { getObject } = useContext(FactoryContext);
  const storageApi: IStorageApi = getObject(ServiceKeys.StorageApi);
  const { resultState, 
    getConfigStorage, 
    setConfigStorage, 
    getOutwardsFromJira, 
    configData, 
    setConfigData, 
    configHasChanges, 
    setConfigHasChanges } = useJiraStorageHook(storageApi);

  const [initialized, setInitialized] = useState(false);  // State to control initialization

  useEffect(() => {
    const getConfigDataFromStorage = async () => {
      try {
        const info: any | null = await getConfigStorage(); //fetch data from api
        setInitialized(true);  // Set initialized to true to force re-render
      } catch (error) {
        console.error("Error in useEffect when fetch data from api getConfigStorage: ", error);
      }
    }

    getConfigDataFromStorage()
  }, []);

  return (
    <ConfigStoreContext.Provider
      value={{
        configData,
        setConfigData,
        configHasChanges,
        setConfigHasChanges,
        setConfigStorage,
        getOutwardsFromJira,
        resultState
      }}
    >
      {initialized ? children : <Loading title={''} progress={60} />}
    </ConfigStoreContext.Provider>
  );
};

export default ConfigStoreContextProvider;
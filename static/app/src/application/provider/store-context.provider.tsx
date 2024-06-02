import { FC, useEffect, useState, useContext } from "react";
import StoreContext from "./store-context";
import useJiraStorageHook from "../../domain/hook/jira-storage-hook";
import { ConfigStorageDataDefault, ConfigStorageDataType } from "../../domain/model/config-storage-data.type";
import { IStorageApi } from "../../domain/outgoing/storage-api.interface";
import FactoryContext from "./factory-context";
import { ServiceKeys } from "../../domain/outgoing/service-key";

interface Props { children?: React.ReactNode }

const StoreContextProvider: FC<Props> = ({ children }) => {
  const [configData, setConfigData] = useState<ConfigStorageDataType>(ConfigStorageDataDefault);
  const [configHasChanges, setConfigHasChanges] = useState<boolean>(false);

  const { getObject } = useContext(FactoryContext);
  const storageApi: IStorageApi = getObject(ServiceKeys.StorageApi);
  const { resultState, getConfigStorage, setConfigStorage,
    getOutwardsFromJira } = useJiraStorageHook(storageApi);

  const [initialized, setInitialized] = useState(false);  // State to control initialization

  useEffect(() => {
    const getConfigDataFromStorage = async () => {
      try {
        const info: any | null = await getConfigStorage(); //fetch data from api
        setConfigData(info);
        setInitialized(true);  // Set initialized to true to force re-render
      } catch (error) {
        console.error("Error in useEffect when fetch data from api getConfigStorage: ", error);
      }
    }

    getConfigDataFromStorage()
  }, []);

  return (
    <StoreContext.Provider
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
      {initialized ? children : null}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
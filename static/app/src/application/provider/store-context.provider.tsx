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
  const { getConfigStorage, setConfigStorage } = useJiraStorageHook(storageApi);

  useEffect(() => {
    const getConfigDataFromStorage = async () => {
      try {
        const info: any | null = await getConfigStorage(); //fetch data from api
        setConfigData(info);
      } catch (error) {
        console.log(error);
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
        setConfigHasChanges
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
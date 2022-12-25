import { FC, useEffect, useState } from "react";
import StoreContext from "../../../domain/context/store-context";
import useStorageHook from "../../../domain/hook/storage-hook";
import { ConfigStorageDataDefault, ConfigStorageDataType } from "../../../domain/model/config-storage-data.type";

interface Props {children?: React.ReactNode}

const StoreContextProvider: FC<Props> = ({ children }) => {
    const [configData, setConfigData] = useState<ConfigStorageDataType>(ConfigStorageDataDefault);
    const [configHasChanges, setConfigHasChanges] = useState<boolean>(false);
    const { getConfigStorage,
      setConfigStorage } = useStorageHook();
      
    useEffect(() => {
      const getConfigDataFromStorage = async () => {
          try {
              const info: any | null = await getConfigStorage();
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
import { FC, useEffect, useState } from "react";
import PortfolioContext from "../domain/context/portfolio-context";
import { ConfigStorageDataDefault, ConfigStorageDataType } from "../domain/model/config-storage-data.type";
import { IssueItemType, TreeToggleType } from "../domain/model/tree-types";

interface Props {children?: React.ReactNode}


const PortfolioContextProvider: FC<Props> = ({ children }) => {
    const [dataTree, setDataTree] = useState<IssueItemType[]>([]);
    const [toggles, setToggles] = useState<TreeToggleType>({});
    const [configData, setConfigData] = useState<ConfigStorageDataType>(ConfigStorageDataDefault);

  useEffect(() => {

  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        dataTree,
        setDataTree,
        toggles, 
        setToggles,
        configData, 
        setConfigData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContextProvider;
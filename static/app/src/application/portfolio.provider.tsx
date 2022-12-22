import { FC, useEffect, useState } from "react";
import PortfolioContext from "../domain/context/portfolio-context";
import { ConfigStorageDataDefault, ConfigStorageDataType } from "../domain/model/config-storage-data.type";
import { issueItemDefault, IssueTreeNodeType, TreeToggleType } from "../domain/model/tree-types";

interface Props {children?: React.ReactNode}

const jqlDefault: string = "project=POR and issuetype='Portfolio Item' order by created DESC";

const PortfolioContextProvider: FC<Props> = ({ children }) => {
    const [dataTree, setDataTree] = useState<IssueTreeNodeType>(issueItemDefault);
    const [toggles, setToggles] = useState<TreeToggleType>({});
    const [configData, setConfigData] = useState<ConfigStorageDataType>(ConfigStorageDataDefault);
    const [configHasChanges, setConfigHasChanges] = useState<boolean>(false);
    const [jql, setJql] = useState<string>(jqlDefault);

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
        setConfigData,
        configHasChanges, 
        setConfigHasChanges,
        jql,
        setJql
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContextProvider;
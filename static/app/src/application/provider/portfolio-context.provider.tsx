import { FC, useContext, useEffect, useState } from "react";
import PortfolioContext from "./portfolio-context";
import StoreContext from "./store-context";
import { issueItemDefault, IssueTreeNodeType, TreeToggleType } from "../../domain/model/tree-types";

interface Props { children?: React.ReactNode }

const jqlDefault: string = "project=POR and issuetype='Initiative' order by created DESC";

const PortfolioContextProvider: FC<Props> = ({ children }) => {
  const { configData, setConfigData, configHasChanges, setConfigHasChanges } = useContext(StoreContext);
  const [dataTree, setDataTree] = useState<IssueTreeNodeType>(issueItemDefault);
  const [toggles, setToggles] = useState<TreeToggleType>({});
  const [jql, setJql] = useState<string>('');
  const [initialized, setInitialized] = useState(false);  // State to control initialization

  useEffect(() => {
    console.log("PortfolioContextProvider-->useEffect");
    const loadedJql = configData.lastJql;
    if (loadedJql !== '') {
      setJql(loadedJql);
    } else {
      setJql(jqlDefault); //first time
    }
    setInitialized(true);  // Set initialized to true to force re-render
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        dataTree,
        setDataTree,
        toggles,
        setToggles,
        jql,
        setJql
      }}
    >
       {initialized ? children : null}  
    </PortfolioContext.Provider>
  );
};

export default PortfolioContextProvider;


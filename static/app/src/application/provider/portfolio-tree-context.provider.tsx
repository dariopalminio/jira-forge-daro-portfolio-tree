import { FC, useContext, useEffect, useState } from "react";
import PortfolioTreeContext from "./portfolio-tree-context";
import StoreContext from "./config-store-context";
import FactoryContext from "./factory-context";
import { IJiraApi } from "../../domain/outgoing/jira-api.interface";
import { ServiceKeys } from "../../domain/outgoing/service-key";
import useJiraTreeHook from "../../domain/hook/jira-tree-hook";
import Loading from "../common/loading/loading";

interface Props { children?: React.ReactNode }

const jqlDefault: string = "project=POR and issuetype='Initiative' order by created DESC";

const PortfolioTreeContextProvider: FC<Props> = ({ children }) => {
  const { configData, setConfigData, configHasChanges, setConfigHasChanges } = useContext(StoreContext);
  const { getObject } = useContext(FactoryContext);
  const jiraApi: IJiraApi = getObject(ServiceKeys.JiraApi);
  const { resultState, dataTree,
    toggles,
    progress, searchAndLoadDataTree, setToggles } = useJiraTreeHook(jiraApi);
  const [jql, setJql] = useState<string>('');
  const [initialized, setInitialized] = useState(false);  // State to control initialization


  useEffect(() => {
    const loadedJql = configData.lastJql;
    if (loadedJql !== '') {
      setJql(loadedJql);
    } else {
      setJql(jqlDefault); //first time
    }
    setInitialized(true);  // Set initialized to true to force re-render
  }, []);

  return (
    <PortfolioTreeContext.Provider
      value={{
        searchAndLoadDataTree,
        dataTree,
        toggles,
        setToggles,
        jql,
        setJql,
        resultState,
        progress
      }}
    >
      {initialized ? children : <Loading title={''} progress={90} />}
    </PortfolioTreeContext.Provider>
  );
};

export default PortfolioTreeContextProvider;


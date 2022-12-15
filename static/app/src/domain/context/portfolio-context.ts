import { createContext } from 'react';
import { ConfigStorageDataDefault, ConfigStorageDataType } from '../model/config-storage-data.type';
import { issueItemDefault, IssueTreeNodeType, TreeToggleType } from '../model/tree-types';

//const [toggles, setToggles] = useState<TreeToggleType>({});
//const [configData, setConfigData] = useState(null);
export interface IPortfolioContext {
    dataTree:  IssueTreeNodeType ;
    setDataTree: (newDataTree: IssueTreeNodeType) => void;
    toggles: TreeToggleType;
    setToggles: (newToggles: TreeToggleType) => void;
    configData: ConfigStorageDataType;
    setConfigData: (newConfigData: ConfigStorageDataType) => void;
    configHasChanges: boolean;
    setConfigHasChanges: (configHasChanges: boolean) => void;
};

export const PortfolioContextDefaultValues: IPortfolioContext = {
    dataTree: issueItemDefault,
    setDataTree: (newDataTree: IssueTreeNodeType) => { },
    toggles: {},
    setToggles: (newToggles: TreeToggleType) => { },
    configData: ConfigStorageDataDefault,
    setConfigData: (newConfigData: ConfigStorageDataType) => { },
    configHasChanges: false,
    setConfigHasChanges: (configHasChanges: boolean) => {}
};

const PortfolioContext = createContext<IPortfolioContext>(PortfolioContextDefaultValues);


export default PortfolioContext;
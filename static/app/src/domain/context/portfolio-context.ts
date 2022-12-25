import { createContext } from 'react';
import { ConfigStorageDataDefault, ConfigStorageDataType } from '../model/config-storage-data.type';
import { issueItemDefault, IssueTreeNodeType, TreeToggleType } from '../model/tree-types';


export interface IPortfolioContext {
    dataTree:  IssueTreeNodeType ;
    setDataTree: (newDataTree: IssueTreeNodeType) => void;
    toggles: TreeToggleType;
    setToggles: (newToggles: TreeToggleType) => void;
    jql: string;
    setJql: (newJql: string) => void;
};

export const PortfolioContextDefaultValues: IPortfolioContext = {
    dataTree: issueItemDefault,
    setDataTree: (newDataTree: IssueTreeNodeType) => { },
    toggles: {},
    setToggles: (newToggles: TreeToggleType) => { },
    jql: '',
    setJql: (newJql: string) => {}
};

const PortfolioContext = createContext<IPortfolioContext>(PortfolioContextDefaultValues);


export default PortfolioContext;
import { createContext } from 'react';
import { emptyTreeToggle, issueItemDefault, IssueTreeNodeType, TreeToggleType } from '../../domain/model/tree-types';
import { InitialResultState } from '../../domain/hook/hook-result-state.type';
import { progressEmpty, ProgressType } from '../../domain/model/progress.type';

export interface IPortfolioTreeContext {
    resultState: any;
    searchAndLoadDataTree: (jqlToSearch: string, linksOutwards: string[]) => void;
    dataTree:  IssueTreeNodeType ;
    toggles: TreeToggleType;
    setToggles: (newToggles: TreeToggleType) => void;
    jql: string;
    setJql: (newJql: string) => void;
    progress: ProgressType;
};

export const PortfolioContextDefaultValues: IPortfolioTreeContext = {
    resultState: InitialResultState,
    searchAndLoadDataTree: (jqlToSearch: string, linksOutwards: string[]): void=> {},
    dataTree: issueItemDefault,
    toggles: {},
    setToggles: (newToggles: TreeToggleType) => { },
    jql: '',
    setJql: (newJql: string) => {},
    progress: progressEmpty
};

const PortfolioTreeContext = createContext<IPortfolioTreeContext>(PortfolioContextDefaultValues);


export default PortfolioTreeContext;
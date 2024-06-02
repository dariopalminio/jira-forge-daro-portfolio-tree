import { createContext } from 'react';
import { emptyTreeToggle, issueItemDefault, IssueTreeNodeType, TreeToggleType } from '../../domain/model/tree-types';
import { InitialResultState } from '../../domain/hook/hook-result-state.type';

export interface IPortfolioContext {
    dataTree:  IssueTreeNodeType ;
    setDataTree: (newDataTree: IssueTreeNodeType) => void;
    toggles: TreeToggleType;
    setToggles: (newToggles: TreeToggleType) => void;
    jql: string;
    setJql: (newJql: string) => void;
    resultState: any;
    getTreeFromJQL: (jql: string) => Promise<IssueTreeNodeType | undefined>;
    getTreeTogglesFrom: (issuesTree: IssueTreeNodeType) => TreeToggleType;
    addChildsToTreeByLink: (issuesTree: IssueTreeNodeType, linksOutwards: string[], maxLevel: number) => Promise<IssueTreeNodeType>;
    addChildsToTreeByParent: (issuesTree: IssueTreeNodeType, maxLevel: number) => Promise<IssueTreeNodeType>;
};

export const PortfolioContextDefaultValues: IPortfolioContext = {
    dataTree: issueItemDefault,
    setDataTree: (newDataTree: IssueTreeNodeType) => { },
    toggles: {},
    setToggles: (newToggles: TreeToggleType) => { },
    jql: '',
    setJql: (newJql: string) => {},
    resultState: InitialResultState,
    getTreeFromJQL:  (jql: string) => {
        return Promise.resolve(undefined); 
    },
    getTreeTogglesFrom: (issuesTree: IssueTreeNodeType) => emptyTreeToggle,
    addChildsToTreeByLink: (issuesTree: IssueTreeNodeType, linksOutwards: string[], maxLevel: number) => {
        return Promise.resolve(issueItemDefault); 
    },
    addChildsToTreeByParent: (issuesTree: IssueTreeNodeType, maxLevel: number)=> {
        return Promise.resolve(issueItemDefault); 
    }
};

const PortfolioContext = createContext<IPortfolioContext>(PortfolioContextDefaultValues);


export default PortfolioContext;
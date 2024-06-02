import { useState, useCallback } from 'react';
import { IJiraApi } from '../outgoing/jira-api.interface';
import { IHookResultState, InitialResultState, ProcessingResultState } from './hook-result-state.type';
import { issueItemDefault, IssueTreeNodeType, TreeToggleType } from '../model/tree-types';
import { ProgressType, progressEmpty } from '../model/progress.type';

/**
 * useJiraTreeHook Custom hook
 * 
 */
export default function useJiraTreeHook(jiraApi: IJiraApi) {

    const MAX_ALLOWED_LEVEL = 8; //maximum allowable depth of the tree

    const [resultState, setResultState] = useState<IHookResultState>(InitialResultState); //Result status
    const [dataTree, setDataTree] = useState<IssueTreeNodeType>(issueItemDefault);
    const [toggles, setToggles] = useState<TreeToggleType>({});
    const [progress, setProgress] = useState<ProgressType>(progressEmpty);
    
    const updateResultState = useCallback((newState: any) => {
        setResultState(prev => ({ ...prev, ...newState }));
    }, []);

    const searchAndLoadDataTree = useCallback(async (jqlToSearch: string, linksOutwards: string[], maxLevel: number) => {
        try {
            //load first level, generally are Initiatives
            setProgress({ percentage: 0, title: 'Loading JQL with tree first level...' });
            const dataTreeFirst: IssueTreeNodeType | undefined = await getTreeFromJQL(jqlToSearch);
            if (dataTreeFirst === undefined) throw new Error('Search JQL not found data!')
            const treeToggles = getTreeTogglesFrom(dataTreeFirst);
            setToggles(treeToggles);
            setDataTree(dataTreeFirst);

            if (dataTreeFirst && dataTreeFirst.hasChildren){
                //load childs by links to all levels
                setProgress({
                    percentage: 30,
                    title: 'Loading childs by links to all tree levels...'
                });
                const newDataTree: IssueTreeNodeType = await addChildsToTreeByLink(dataTreeFirst, linksOutwards, maxLevel);
                const newTreeToggles = getTreeTogglesFrom(newDataTree);
                setToggles(newTreeToggles);
                setDataTree(newDataTree);

                //load Epics children and children by parent
                setProgress({
                    percentage: 60,
                    title: 'Loading childs by parent to all tree levels ...'
                });
                const lastDataTree: IssueTreeNodeType = await addChildsToTreeByParent(newDataTree, maxLevel);
                const lastTreeToggles = getTreeTogglesFrom(lastDataTree);
                setToggles(lastTreeToggles);
                setDataTree(lastDataTree);
            }
            setProgress({percentage: 100, title: '' });

        } catch (error) {
            console.log(error);
        }
    }, [jiraApi, updateResultState]);

    /**
     * Get Tree from JQL
     * 
     * Obtain a tree from a JQL type query. Search JQL in Jira to retrieve issues for portfolio.
     * Return first level of a tree structure.
     * @param jql - String for search with Jira Query Language (JQL)
     * @param maxResults - The "maxResults" parameter indicates how many results to return per page. 
     * Each API may have a different limit for number of items returned.
     * @param startAt  - The "startAt" parameter indicates which item should be used as the first item in the page of results.
     * The index of the first item to return (0-based) must be 0 or a multiple of maxResults
     */
    const getTreeFromJQL = useCallback(async (jql: string): Promise<IssueTreeNodeType | undefined> => {
        setResultState(ProcessingResultState);
        try {
            const data: any[] = await jiraApi.searchJql(jql);
            const tree = buildTree(data);
            if (tree && tree.hasChildren){
                setResultState({ isProcessing: false, hasError: false, msg: undefined, isSuccess: true });
            }else{
                setResultState({ isProcessing: false, hasError: false, msg: "No.issues.found", isSuccess: true });
            }
            return tree;
        } catch (error: any) {
            const errorMessage = error?.message || 'An unknown error occurred';
            console.error('Error in searchJql:', errorMessage);
            updateResultState({ isProcessing: false, hasError: true, msg: errorMessage , isSuccess: false });
            return issueItemDefault;
        }
    }, [jiraApi, updateResultState]);

    const buildTree = (issues: any[]): IssueTreeNodeType => {
        const treeArray = issues?.map((item: IssueTreeNodeType) => convertToIssueTreeNodeType(item, 1)) || [];
        return {
            key: 'root',
            level: 0,
            summary: 'root node',
            iconUrl: '',
            path: '',
            fields: { issues: [] },
            hasChildren: treeArray.length > 0,
            childrens: treeArray
        };
    };

    /**
     * Convert Jira issue to IssueTreeNodeType node for tree
     * @param issueItem jira issue 
     * @returns IssueTreeNodeType
     */
    const convertToIssueTreeNodeType = (issueItem: any, level: number): IssueTreeNodeType => {
        const issueTreeNode: IssueTreeNodeType = {
            key: issueItem.key,
            level: level,
            summary: issueItem?.fields?.summary ? issueItem.fields.summary : '',
            iconUrl: issueItem?.fields?.issuetype?.iconUrl ? issueItem.fields.issuetype.iconUrl : '',
            path: getSelfLink(issueItem.self, issueItem.key),
            fields: issueItem?.fields ? { ...issueItem.fields, self: issueItem.self } : {},
            hasChildren: false,
            childrens: []
        }
        return issueTreeNode;
    };

    /**
     * Get browseable link to issue
     * @param url self link
     * @param key issue key
     * @returns string url
     */
    const getSelfLink = (url: string, key: string): string => {
        //let domain = (new URL(url));
        //let origin = domain.origin;
        //const urlResult = `${origin}/browse/${key}`;
        return `/browse/${key}`;
    }

    /**
     * Get Tree Toggle
     * Each issue has a boolean value associated with your key to indicate if it is open
     * (showing its children) or not.
     * Returns a data dictionary to indicate that nodes are expanded (opened) or collapsed (closed).
     */
    const getTreeTogglesFrom = useCallback((issuesTree: IssueTreeNodeType): TreeToggleType => {

        let toggles: TreeToggleType = {}; //dictionary = { [key: string]: boolean };
        if (issuesTree.hasChildren) {
            for (var i = 0; i < issuesTree.childrens.length; i++) {
                toggles[`${issuesTree.childrens[i].key}`] = false;
                if (issuesTree.childrens[i].hasChildren) {
                    const togglesRec: TreeToggleType = getTreeTogglesFrom(issuesTree.childrens[i]);
                    toggles = { ...toggles, ...togglesRec };
                }
            }
        }
        return toggles;
    }, []);

    /**
     * Get Children of each issue in tree by Links Hierarchy and subtasks.
     */
    const addChildsToTreeByLink = useCallback(async (issuesTree: IssueTreeNodeType, linksOutwards: string[], maxLevel: number): Promise<IssueTreeNodeType> => {
        setResultState(ProcessingResultState);
        try {
            let outwards: string[] = [];
            if (linksOutwards && Array.isArray(linksOutwards) && linksOutwards.length > 0) {
                outwards = linksOutwards;
            }
            const initialLevel: number = 1;
            const r: IssueTreeNodeType = await getTreeWithChildrenByLink(issuesTree, outwards, initialLevel, maxLevel);
            setResultState({ isProcessing: false, hasError: false, msg: undefined, isSuccess: true });
            return r;
        } catch (error: any) {
            const errorMessage = error?.message || 'An unknown error occurred';
            setResultState({ isProcessing: false, hasError: true, msg: errorMessage, isSuccess: false });
            console.error('Error in addChildsToTreeByLink:', error);
            return issueItemDefault;
        }
    }, [updateResultState]);

    /**
     * Get recursively Children of each issue in tree by Links Hierarchy and subtasks.
     * Complete all children based on Outwards type links by bringing the issues from Jira and completing the data tree.
     * The iteration of the tree is using Order Traversal Sequence by Level.
     * Each level iterates through the entire level looking for the children of each node.
     * To get outward name: fields.issuelinks[i].type.outward
     * To get outward children issue: fields.issuelinks[i].outwardIssue
     * To get url of outward children issue: fields.issuelinks[i].outwardIssue.self
     * @param issuesTree Tree node
     * @param outwards array of parent-child link type names of outward, eg ['includes', 'featutes by', 'related to']
     * @param level tree iteration level
     * @returns IssueTreeNodeType tree
     */
    const getTreeWithChildrenByLink = async (issuesTree: IssueTreeNodeType, outwards: string[], level: number, maxLevel: number): Promise<IssueTreeNodeType> => {

        if (issuesTree.hasChildren && ((level < maxLevel) && (level < MAX_ALLOWED_LEVEL))) {
            let childsArray: IssueTreeNodeType[] = [...issuesTree.childrens];
            //get subtask children
            for (var i = 0; i < childsArray.length; i++) {
                if (childsArray[i]?.fields?.subtasks && childsArray[i]?.fields?.subtasks.length > 0) {
                    for (var n = 0; n < childsArray[i]?.fields?.subtasks.length; n++) {
                        const issueUrl: string = childsArray[i]?.fields?.subtasks[n].self;
                        const issueChild: any = await jiraApi.getIssueBySelf(issueUrl);
                        const issue: IssueTreeNodeType = convertToIssueTreeNodeType(issueChild, level + 1);
                        childsArray[i].childrens.push(issue);
                        childsArray[i].hasChildren = true;
                    }
                }
            }
            //get Links children
            for (var i = 0; i < childsArray.length; i++) {
                const links: any[] = childsArray[i].fields?.issuelinks;
                for (var j = 0; j < links.length; j++) {
                    const outwardTag = links[j].type?.outward;
                    if (outwardTag
                        && (typeof outwardTag === 'string')
                        && outwards.includes(outwardTag)
                        && links[j].outwardIssue) {
                        const issueUrl: string = links[j].outwardIssue?.self;
                        const issueChild: any = await jiraApi.getIssueBySelf(issueUrl);
                        const issue: IssueTreeNodeType = convertToIssueTreeNodeType(issueChild, level + 1);
                        childsArray[i].childrens.push(issue);
                        childsArray[i].hasChildren = true;
                    }
                }
            }

            const newArray: IssueTreeNodeType[] = [...childsArray];
            const finalArray: IssueTreeNodeType[] = [];
            for (var i = 0; i < newArray.length; i++) {
                const child = await getTreeWithChildrenByLink(newArray[i], outwards, level + 1, maxLevel);
                finalArray.push(child);
            }
            return { ...issuesTree, childrens: finalArray };
        } else {
            return issuesTree;
        }
    };

    /**
     * Add children to Tree by Parent.
     * 
     * @param issuesTree - Node tree
     * @param maxResults - The "maxResults" parameter indicates how many results to return per page. 
     * Each API may have a different limit for number of items returned.
     * @param startAt  - The "startAt" parameter indicates which item should be used as the first item in the page of results.
     * The index of the first item to return (0-based) must be 0 or a multiple of maxResults
     * @param maxLevel - Maximum number of parent type levels without counting the root.
     * @returns - Promise<IssueTreeNodeType>
     */
    const addChildsToTreeByParent = useCallback(async (issuesTree: IssueTreeNodeType, maxLevel: number): Promise<IssueTreeNodeType> => {
        setResultState(ProcessingResultState);
        try {
            const r: IssueTreeNodeType = await getTreeChildrenByParent(issuesTree, 0, maxLevel);
            setResultState({ isProcessing: false, hasError: false, msg: undefined, isSuccess: true });
            return r;
        } catch (error) {
            console.error(error);
            setResultState({ isProcessing: false, hasError: true, msg: 'Error fetching current user', isSuccess: false });
            return issueItemDefault;
        }
    }, [updateResultState]);

    const getTreeChildrenByParent = async (issuesTree: IssueTreeNodeType, level: number, maxLevel: number): Promise<IssueTreeNodeType> => {

        if (issuesTree.hasChildren && ((level < maxLevel) && (level < MAX_ALLOWED_LEVEL))) {
            let childsArray: IssueTreeNodeType[] = [...issuesTree.childrens];
            for (var i = 0; i < childsArray.length; i++) {
                const issues: any[] = await jiraApi.getChildrens(childsArray[i].key);
                if (issues && Array.isArray(issues) && (issues?.length > 0)) {
                    for (var j = 0; j < issues?.length; j++) {
                        const issue: IssueTreeNodeType = convertToIssueTreeNodeType(issues[j], level + 2);
                        if (!elementAlreadyExists(childsArray[i].childrens, issue)) {
                            childsArray[i].childrens.push(issue);
                            childsArray[i].hasChildren = true;
                        }

                    }
                }
            }
            const newArray: IssueTreeNodeType[] = [...childsArray];
            const finalArray: IssueTreeNodeType[] = [];
            for (var i = 0; i < newArray.length; i++) {
                const issue = await getTreeChildrenByParent(newArray[i], level + 1, maxLevel);
                finalArray.push(issue);
            }
            return { ...issuesTree, childrens: finalArray };
        } else {
            return issuesTree;
        }
    };

  /**
   * Checks if an element already exists in an array based on its key.
   * @param array  - Array of elements to search for.
   * @param element  - Element to search for in the array.
   * @returns true if the element exists, false otherwise.
   */
    const elementAlreadyExists = (array: IssueTreeNodeType[] | null | undefined,
        element: IssueTreeNodeType | null | undefined): boolean => {
        return !!array && !!element && array.some(item => item?.key === element.key);
    };

    return {
        resultState,
        searchAndLoadDataTree,
        dataTree,
        toggles,
        setToggles,
        progress
    };
};
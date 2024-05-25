import { useState, useCallback } from 'react';
import { IJiraApi } from '../outgoing/jira-api.interface';
import { IHookState, InitialState } from './hook.type';
import { issueItemDefault, IssueTreeNodeType, TreeToggleType } from '../model/tree-types';


/**
 * useJiraTreeHook Custom hook
 * 
 */
export default function useJiraTreeHook(jiraApi: IJiraApi) {

    const [state, setState] = useState<IHookState>(InitialState);
    const MAX_ALLOWED_LEVEL = 20;

    const updateState = useCallback((newState) => {
        setState(prev => ({ ...prev, ...newState }));
    }, []);

    /**
     * Searcj JQL in Jira to retrieve issues from portfolio.
     * Return first level of a tree structure.
     */
    const searchJql = useCallback(async (jql: string, maxResults: number, startAt: number): Promise<IssueTreeNodeType | undefined> => {
        updateState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const data = await jiraApi.searchJql(jql, maxResults, startAt);
            const tree = buildTree(data);
            updateState({ isProcessing: false, hasError: false, msg: '', isSuccess: true });
            return tree;
        } catch (error) {
            console.error('Error in searchJql:', error);
            updateState({ hasError: true, msg: 'Search JQL failed', isSuccess: false });
            return issueItemDefault;
        }
    }, [jiraApi, updateState]);

    const buildTree = (data:any): IssueTreeNodeType => {
        const treeArray = data?.issues?.map((item: IssueTreeNodeType) => convertToIssueTreeNodeType(item, 1)) || [];
        return {
            key: 'root',
            level: 0,
            summary: 'root node',
            iconUrl: '',
            path: '',
            fields: { ...data, issues: [] },
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
    const addChildrenByLink = useCallback(async (issuesTree: IssueTreeNodeType, linksOutwards: string[], maxLevel: number): Promise<IssueTreeNodeType> => {
        updateState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            let outwards: string[] = [];
            if (linksOutwards && Array.isArray(linksOutwards) && linksOutwards.length > 0) {
                outwards = linksOutwards;
            }
            //const MAX_ALLOWED_LEVEL = 10;
            const r: IssueTreeNodeType = await getTreeWithChildrenByLink(issuesTree, outwards, 1, maxLevel);
            setState({ isProcessing: false, hasError: false, msg: '', isSuccess: true });
            return r;
        } catch (error) {
            updateState({ hasError: true, msg: 'Error addChildrenByLink', isSuccess: false });
            console.error('Error in useJiraTreeHook.searchJql:', error);
            return issueItemDefault;
        }
    }, [updateState]);

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
     * Get array of outward names from Jira
     * @returns array of parent-child link type names of outward, eg ['includes', 'featutes by', 'related to']
     */
    const getOutwardsFromJira = useCallback(async (): Promise<string[]> => {
        const excludedOutwards = ['blocks', 'causes', 'clones', 'duplicates', 'relates to'];
        try {
            let outward: string[] = [];
            const data: any = await jiraApi.getIssueLinkTypes();
            const issueLinkTypes: any = data.issueLinkTypes;
            for (var i = 0; i < issueLinkTypes.length; i++) {
                if (issueLinkTypes[i].outward
                    && (typeof issueLinkTypes[i].outward === 'string')
                    && issueLinkTypes[i].outward !== '') {
                    if (!excludedOutwards.includes(issueLinkTypes[i].outward)) {
                        outward.push(issueLinkTypes[i].outward);
                    }
                }
            }
            return outward;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }, []);

    /**
     * JQL to getChildrenByEpicLink:  "Epic Link" ='CHILD-KEY-1' order by created DESC
     * @param issuesTree 
     * @returns 
     */
    const addChildrenByParent = useCallback(async (issuesTree: IssueTreeNodeType, maxResults: number, startAt: number, maxLevel: number): Promise<IssueTreeNodeType> => {
        updateState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });
        try {
            const r: IssueTreeNodeType = await getTreeChildrenByParent(issuesTree, 0, maxLevel, maxResults, startAt);
            setState({ isProcessing: false, hasError: false, msg: '', isSuccess: true });
            return r;
        } catch (error) {
            console.error(error);
            updateState({ hasError: true, msg: 'Error fetching current user', isSuccess: false });
            return issueItemDefault;
        }
    }, [updateState]);

    const getTreeChildrenByParent = async (issuesTree: IssueTreeNodeType, level: number, maxLevel: number, maxResults: number, startAt: number): Promise<IssueTreeNodeType> => {

        if (issuesTree.hasChildren && ((level < maxLevel) && (level < MAX_ALLOWED_LEVEL))) {
            let childsArray: IssueTreeNodeType[] = [...issuesTree.childrens];
            for (var i = 0; i < childsArray.length; i++) {
                //get Epic Children
                //if (childsArray[i]?.fields?.issuetype?.name === 'Epic') {
                const data: any = await jiraApi.getChildrens(childsArray[i].key, maxLevel, startAt);
                if (data?.issues && Array.isArray(data?.issues) && (data?.issues?.length > 0)) {
                    for (var j = 0; j < data?.issues?.length; j++) {
                        const issue: IssueTreeNodeType = convertToIssueTreeNodeType(data?.issues[j], level + 2);
                        if (!elementAlreadyExists(childsArray[i].childrens, issue)) {
                            childsArray[i].childrens.push(issue);
                            childsArray[i].hasChildren = true;
                        }

                    }
                }
                //}
            }
            const newArray: IssueTreeNodeType[] = [...childsArray];
            const finalArray: IssueTreeNodeType[] = [];
            for (var i = 0; i < newArray.length; i++) {
                const issue = await getTreeChildrenByParent(newArray[i], level + 1, maxLevel, maxResults, startAt);
                finalArray.push(issue);
            }
            return { ...issuesTree, childrens: finalArray };
        } else {
            return issuesTree;
        }
    };

    const elementAlreadyExists = (array: IssueTreeNodeType[] | null | undefined,
        elementoBuscado: IssueTreeNodeType | null | undefined): boolean => {
        return (
            array !== null &&
            array !== undefined &&
            elementoBuscado !== null &&
            elementoBuscado !== undefined &&
            array.some(item => item && item.key === elementoBuscado.key)
        );
    };

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        searchJql,
        getTreeTogglesFrom,
        addChildrenByLink,
        getOutwardsFromJira,
        addChildrenByParent
    };
};
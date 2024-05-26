import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useJiraTreeHook from "../../../domain/hook/jira-tree-hook";
import Button from "../../common/button/button";
import TextField from "../../common/text-field/text-field";
import { IColHeader } from "../table";
import { IssueTreeNodeType, TreeToggleType } from "../../../domain/model/tree-types";
import PortfolioContext from "../../provider/portfolio-context";
import styles from './search-view.module.css';
import { ModalDialog } from "../../common/dialog";
import { TabsType } from "../../common/tab-panel/types";
import Tabs from "../../common/tab-panel/tabs";
import RoadmapViewPanel from "./roadmaps-view-panel";
import TableViewPanel from "./table-view-panel";
import TreeViewPanel from "./tree-view-panel";
import IssueView from "../issue/issue-view";
import Loading from "../../common/loading/loading";
import StoreContext from "../../provider/store-context";
import { ConfigStorageDataType } from "../../../domain/model/config-storage-data.type";
import useJiraStorageHook from "../../../domain/hook/jira-storage-hook";
import Checkbox, { CheckboxType } from "../../common/checkbox/checkbox";
import FactoryContext from "../../provider/factory-context";
import { ServiceKeys } from "../../../domain/outgoing/service-key";
import { IStorageApi } from "../../../domain/outgoing/storage-api.interface";
import { IJiraApi } from "../../../domain/outgoing/jira-api.interface";


const SearchView: React.FC = () => {
    const { getObject } = useContext(FactoryContext);
    const jiraApi: IJiraApi = getObject(ServiceKeys.JiraApi);
    const { getTreeFromJQL, getTreeTogglesFrom, addChildsToTreeByLink, addChildsToTreeByParent,
        isProcessing, hasError, msg, isSuccess } = useJiraTreeHook(jiraApi);
    const { dataTree, setDataTree, toggles, setToggles, jql, setJql } = useContext(PortfolioContext);
    const { configData, setConfigData, configHasChanges, setConfigHasChanges } = useContext(StoreContext);

    const storageApi: IStorageApi = getObject(ServiceKeys.StorageApi);
    const { getConfigStorage, setConfigStorage } = useJiraStorageHook(storageApi);
    
    const [isValid, setIsValid] = useState<boolean>(true);
    const { t } = useTranslation();
    const [issueToShow, setIssueToShow] = useState<IssueTreeNodeType | null>(null);
    const [tabSelected, setTabSelected] = useState<string>('tree');
    const [progress, setProgress] = useState<number>(0);
    const [progressTitle, setProgressTitle] = useState<string>('Loading...');

    const withEpicsChildrenDefault: CheckboxType = {
        label: t('with.epics.children'),
        checked: false
    };
    const [withEpicsChildren, setWithEpicsChildren] = useState<CheckboxType>(withEpicsChildrenDefault);



    const TableHeadersDefault: IColHeader[] = [
        {
            "prop": "key",
            "label": t("key"),
            "width": 230
        },
        {
            "prop": "issuetype",
            "label": t("issue.type"),
            "width": 100
        },
        {
            "prop": "summary",
            "label": t("summary"),
            "width": 250
        },
        {
            "prop": "project",
            "label": t("project"),
            "width": 160
        },
        {
            "prop": "assignee",
            "label": t("assignee"),
            "width": 160
        },
        {
            "prop": "startdate",
            "label": t("startdate"),
            "width": 100
        },
        {
            "prop": "duedate",
            "label": t("duedate"),
            "width": 100
        },
        {
            "prop": "status",
            "label": t("status"),
            "width": 150
        },
        {
            "prop": "progress",
            "label": t("children.progress"),
            "width": 260
        },
    ];

    const tabs: TabsType = [
        {
            id: 'tree',
            text: t('tree')
        },
        {
            id: 'table',
            text: t('table')
        }
        ,
        {
            id: 'roadmaps',
            text: t('roadmaps')
        }
    ];

    /**
     * Get max results for pagination
     */
    const getMaxResults = (): number => {
        if (!configData?.maxResults || configData?.maxResults === '' || configData?.maxResults === null) {
            return 1000;
        }
        const maxResults: number = Number(configData?.maxResults);
        return Math.abs(maxResults);
    }

    const searchData = async () => {
        try {
            const MAX_ALLOWED_LEVEL = 7;
       
            //load first level, generally are Initiatives
            setProgress(0);
            setProgressTitle('Loading JQL with tree first level...');
            const dataTree: IssueTreeNodeType | undefined = await getTreeFromJQL(jql, getMaxResults(), 0);
            if (dataTree === undefined) throw new Error('Search JQL not found data!')
            const treeToggles = getTreeTogglesFrom(dataTree);
            setToggles(treeToggles);
            setDataTree(dataTree);
            setProgress(30);
            setProgressTitle('Loading childs by links to all tree levels...');
            
            //load childs by links to all levels
            const newDataTree: IssueTreeNodeType = await addChildsToTreeByLink(dataTree, configData.linksOutwards, MAX_ALLOWED_LEVEL);
            const newTreeToggles = getTreeTogglesFrom(newDataTree);
            setToggles(newTreeToggles);
            setDataTree(newDataTree);
            setProgress(60);
            setProgressTitle('Loading childs by parent to all tree levels ...');
            
            //load Epics children and children by parent
            const lastDataTree: IssueTreeNodeType = await addChildsToTreeByParent(newDataTree, 150, 0, MAX_ALLOWED_LEVEL);
            const lastTreeToggles = getTreeTogglesFrom(lastDataTree);
            setToggles(lastTreeToggles);
            setDataTree(lastDataTree);
            setProgress(100);
            console.log("lastDataTree:",lastDataTree);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        //getDatas()
    }, []);

    const handleSearch = () => {
        searchData()
    }

    const handleChange = async (val: string) => {
        setJql(val);
        if (val === '') {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    };

    const handleClick = (item: IssueTreeNodeType) => {
        //Here do navigate to path
        setIssueToShow(item);
    }

    const handlerToggleChange = (newToggles: TreeToggleType) => {
        setToggles(newToggles)
    }

    const closeDialog = () => {
        setIssueToShow(null);
    }

    const handleSave = async () => {
        const todate: string = (new Date).toString();
        const configDataEdited = { ...configData, updatedAt: todate, lastJql: jql };
        const infoResponse: ConfigStorageDataType = await setConfigStorage(configDataEdited);
        setConfigData(infoResponse);
        setConfigHasChanges(false);
    }

    const handleWithEpicsChildrenToggle = () => {
        setWithEpicsChildren({ ...withEpicsChildren, checked: !withEpicsChildren.checked })
    }

    return (
        <div id="TabPanel" className={styles.panelContainer}>
            <div id="actionPanel" className={styles.actionPanel}>
                <div className={styles.searchWrapper}>
                    <div className={styles.jqlWrapper}>
                        <TextField
                            id="jql-textfield"
                            placeholder={'Here JQL...'}
                            onChange={(e) => handleChange(e.target.value)}
                            value={jql}
                            {...(!isValid && { error: true, helperText: 'input error' })}
                        />
                    </div>
                    <div style={{ float: 'right' }}>

                    
                        <Button style={{ marginLeft: '5px' }}
                            onClick={() => handleSave()}
                            styleType={"neutro"} >
                            {t('save')}
                        </Button>
                        <Button onClick={() => handleSearch()}
                            style={{ marginLeft: '5px', float: 'right' }}>
                            {t('search')}
                        </Button>
                    </div>
                </div>
            </div>

            <Tabs tabs={tabs} idTabSelected={tabSelected} onClick={(idTab: string) => setTabSelected(idTab)}></Tabs>

            <div id="contentPanel" style={{ height: "100%" }}>


                {tabSelected === 'tree' && (
                    <TreeViewPanel headers={TableHeadersDefault}
                        onClick={(item: IssueTreeNodeType) => handleClick(item)} />
                )}

                {tabSelected === 'table' && (
                    <TableViewPanel headers={TableHeadersDefault}
                        onClick={(item: IssueTreeNodeType) => handleClick(item)} />

                )}

                {tabSelected === 'roadmaps' &&
                    (
                        <RoadmapViewPanel headers={TableHeadersDefault}
                            onClick={(item: IssueTreeNodeType) => handleClick(item)} />
                    )
                }

            </div>


            <ModalDialog
                isOpen={issueToShow !== null}
                onClose={closeDialog}
                style={{ height: '240px' }}
            >
                <IssueView issueItem={issueToShow} />

            </ModalDialog>

            {hasError && <label>{msg}</label>}

            {isProcessing && <Loading title={progressTitle} progress={progress} />}

        </div>

    );
};

export default SearchView;

import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useJiraHook from "../../../domain/hook/jira-hook";
import Button from "../../common/button/button";
import TextField from "../../common/text-field/text-field";
import { IColHeader } from "../table";
import { IssueTreeNodeType, TreeToggleType } from "../../../domain/model/tree-types";
import PortfolioContext from "../../../domain/context/portfolio-context";
import styles from './search-view.module.css';
import { ModalDialog } from "../../common/dialog";
import { TabsType } from "../../common/tab-panel/types";
import Tabs from "../../common/tab-panel/tabs";
import RoadmapViewPanel from "./roadmaps-view-panel";
import TableViewPanel from "./table-view-panel";
import TreeViewPanel from "./tree-view-panel";
import useJiraHostHook from "../../../domain/hook/jira-host-hook";
import IssueView from "../issue/issue-view";
import Loading from "../../common/loading/loading";
import StoreContext from "../../../domain/context/store-context";
import { ConfigStorageDataType } from "../../../domain/model/config-storage-data.type";
import useStorageHook from "../../../domain/hook/storage-hook";
import Checkbox, { CheckboxType } from "../../common/checkbox/checkbox";


const SearchView: React.FC = () => {

    const { searchJql, getTreeTogglesFrom, addChildrenByLink, addChildrenByEpicLink,
        isProcessing, hasError, msg, isSuccess } = useJiraHook();
    const { dataTree, setDataTree, toggles, setToggles, jql, setJql } = useContext(PortfolioContext);
    const { configData, setConfigData, configHasChanges, setConfigHasChanges } = useContext(StoreContext);
    const { getConfigStorage,
        setConfigStorage } = useStorageHook();
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
            "width": 150
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

    const getMaxResults = (): number => {
        //console.log('***configData?.maxResults:', configData?.maxResults);
        if (!configData?.maxResults || configData?.maxResults === '' || configData?.maxResults === null) {
            return 15;
        }
        const maxResults: number = Number(configData?.maxResults);
        //console.log('***maxResults:', Math.abs(maxResults));
        return Math.abs(maxResults);
    }

    const searchData = async () => {
        try {
            const MAX_ALLOWED_LEVEL = 10;
            //load first level, generally are Initiatives
            setProgress(0);
            setProgressTitle('Loading JQL with tree first level...');
            const dataTree: IssueTreeNodeType | undefined = await searchJql(jql, getMaxResults(), 0);
            if (dataTree === undefined) throw new Error('Search JQL not found data!')
            const treeToggles = getTreeTogglesFrom(dataTree);
            setToggles(treeToggles);
            setDataTree(dataTree);
            setProgress(30);
            setProgressTitle('Loading childs by links to all tree levels...');
            //load childs by links to all levels
            const newDataTree: IssueTreeNodeType = await addChildrenByLink(dataTree, configData.linksOutwards, MAX_ALLOWED_LEVEL);
            const newTreeToggles = getTreeTogglesFrom(newDataTree);
            setToggles(newTreeToggles);
            setDataTree(newDataTree);
            setProgress(60);
            setProgressTitle('Loading Epics children...');
            //load Epics children
            const lastDataTree: IssueTreeNodeType = await addChildrenByEpicLink(dataTree, 150, 0, MAX_ALLOWED_LEVEL);
            const lastTreeToggles = getTreeTogglesFrom(newDataTree);
            setToggles(lastTreeToggles);
            setDataTree(lastDataTree);
            setProgress(100);
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

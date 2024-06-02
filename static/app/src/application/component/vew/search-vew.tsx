import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../common/button/button";
import TextField from "../../common/text-field/text-field";
import { IColHeader } from "../table";
import { IssueTreeNodeType, TreeToggleType } from "../../../domain/model/tree-types";
import PortfolioContext from "../../provider/portfolio-tree-context";
import styles from './search-view.module.css';
import { ModalDialog } from "../../common/dialog";
import { TabsType } from "../../common/tab-panel/types";
import Tabs from "../../common/tab-panel/tabs";
import RoadmapViewPanel from "./roadmaps-view-panel";
import TableViewPanel from "./table-view-panel";
import TreeViewPanel from "./tree-view-panel";
import IssueView from "../issue/issue-view";
import Loading from "../../common/loading/loading";
import StoreContext from "../../provider/config-store-context";
import { ConfigStorageDataType } from "../../../domain/model/config-storage-data-type";
import { CheckboxType } from "../../common/checkbox/checkbox";
import Alert from "../../common/alert/alert";


const SearchView: React.FC = () => {
    const { resultState,
        setToggles,
        jql,
        setJql,
        searchAndLoadDataTree,
        progress } = useContext(PortfolioContext);

    const { configData, setConfigData, configHasChanges, setConfigHasChanges, setConfigStorage } = useContext(StoreContext);
    const [isValid, setIsValid] = useState<boolean>(true);
    const { t } = useTranslation();
    const [issueToShow, setIssueToShow] = useState<IssueTreeNodeType | null>(null);
    const [tabSelected, setTabSelected] = useState<string>('tree');

    const withEpicsChildrenDefault: CheckboxType = {
        label: t('with.epics.children'),
        checked: false
    };
    const [withEpicsChildren, setWithEpicsChildren] = useState<CheckboxType>(withEpicsChildrenDefault);

    const TableHeadersDefaultConfig: IColHeader[] = [
        {
            "prop": "key",
            "label": t("key"),
            "width": 230,
            "isVisible": true
        },
        {
            "prop": "issuetype",
            "label": t("issue.type"),
            "width": 100,
            "isVisible": true
        },
        {
            "prop": "summary",
            "label": t("summary"),
            "width": 250,
            "isVisible": true
        },
        {
            "prop": "project",
            "label": t("project"),
            "width": 160,
            "isVisible": true
        },
        {
            "prop": "assignee",
            "label": t("assignee"),
            "width": 160,
            "isVisible": true
        },
        {
            "prop": "startdate",
            "label": t("startdate"),
            "width": 100,
            "isVisible": true
        },
        {
            "prop": "duedate",
            "label": t("duedate"),
            "width": 100,
            "isVisible": true
        },
        {
            "prop": "status",
            "label": t("status"),
            "width": 150,
            "isVisible": true
        },
        {
            "prop": "progress",
            "label": t("children.progress"),
            "width": 260,
            "isVisible": true
        }
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

    const handleSearch = async () => {
        const maxLeve = 7; //maximum allowable depth of the tree
        await searchAndLoadDataTree(jql, configData.linksOutwards, maxLeve)
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
                    <TreeViewPanel headers={TableHeadersDefaultConfig}
                        onClick={(item: IssueTreeNodeType) => handleClick(item)} />
                )}

                {tabSelected === 'table' && (
                    <TableViewPanel headers={TableHeadersDefaultConfig}
                        onClick={(item: IssueTreeNodeType) => handleClick(item)} />

                )}

                {tabSelected === 'roadmaps' &&
                    (
                        <RoadmapViewPanel headers={TableHeadersDefaultConfig}
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

            {resultState.isProcessing && <Loading title={progress.title} progress={progress.percentage} />}

            {(!resultState.hasError && resultState.msg) && <Alert severity="info">{resultState.msg ? t(resultState.msg) : ''}</Alert>}

            {resultState.hasError && <Alert severity="error">{resultState.msg}</Alert>}

        </div>

    );
};

export default SearchView;

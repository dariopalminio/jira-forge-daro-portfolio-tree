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

const SearchView: React.FC = () => {
    const jqlDefault: string = "project=Portfolio and issuetype=Initiative order by created DESC";
    const { searchJql, getTreeTogglesFrom, addChildrenByLink, addChildrenByEpicLink,
        isProcessing, hasError, msg, isSuccess } = useJiraHook();
    const { dataTree, setDataTree, toggles, setToggles, configData } = useContext(PortfolioContext);
    const [jql, setJql] = useState<string>(jqlDefault);
    const [isValid, setIsValid] = useState<boolean>(true);
    const { t } = useTranslation();
    const [issueToShow, setIssueToShow] = useState<IssueTreeNodeType | null>(null);
    const [tabSelected, setTabSelected] = useState<string>('tree');


    const TableHeadersDefault: IColHeader[] = [
        {
            "prop": "key",
            "label": t("key"),
            "width": 150
        },
        {
            "prop": "summary",
            "label": t("summary"),
            "width": 160
        },
        {
            "prop": "status",
            "label": t("status"),
            "width": 100
        },
        {
            "prop": "project",
            "label": t("project"),
            "width": 150
        },
        {
            "prop": "assignee",
            "label": t("assignee"),
            "width": 110
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

    const searchData = async () => {
        try {
            //load first level, generally are Initiatives
            const dataTree: IssueTreeNodeType | undefined = await searchJql(jql);
            if (dataTree === undefined) throw new Error('Search JQL not found data!')
            const treeToggles = getTreeTogglesFrom(dataTree?.childrens);
            setToggles(treeToggles);
            setDataTree(dataTree);
            //load childs by links
            const newDataTree: IssueTreeNodeType = await addChildrenByLink(dataTree, configData.linksOutwards);
            const newTreeToggles = getTreeTogglesFrom(newDataTree?.childrens);
            setToggles(newTreeToggles);
            setDataTree(newDataTree);
            //load child by epic link
            const lastDataTree: IssueTreeNodeType = await addChildrenByEpicLink(dataTree);
            const lastTreeToggles = getTreeTogglesFrom(newDataTree?.childrens);
            setToggles(lastTreeToggles);
            setDataTree(lastDataTree);
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

    return (
        <div id="TabPanel" className={styles.panelContainer}>
            <div id="actionPanel" className={styles.actionPanel}>
                <div className={styles.searchWrapper}>
                    <div className={styles.jqlWrapper}>
                        <TextField
                            id="jql-textfield"
                            placeholder="Here text..."
                            onChange={(e) => handleChange(e.target.value)}
                            value={jql}
                            {...(!isValid && { error: true, helperText: 'input error' })}
                        />
                    </div>

                    <Button onClick={() => handleSearch()} style={{ float: 'right' }}>{t('search')}</Button>

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
            >
                <span>GO: <a href={issueToShow?.path} target="_blank">{issueToShow?.path}</a></span>

            </ModalDialog>

            {hasError && <label>{msg}</label>}
            
        </div>

    );
};

export default SearchView;

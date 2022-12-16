import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useJiraHook from "../../../domain/hook/jira-hook";
import Button from "../../common/button/button";
import TextField from "../../common/text-field/text-field";
import { Tree } from "../tree";
import { SplitableContainer, SplitLeft, SplitBar, SplitRight } from "../../common/splitable-container"
import { TableSelectable } from "../table";
import { IssueTreeNodeType, TreeToggleType } from "../../../domain/model/tree-types";
import PortfolioContext, { IPortfolioContext } from "../../../domain/context/portfolio-context";
import styles from './search-view.module.css';
import { ModalDialog } from "../../common/dialog";

const SearchView: React.FC = () => {
    const jqlDefault: string = "project=Portfolio and issuetype=Initiative order by created DESC";
    const { searchJql, getTreeTogglesFrom, addChildrenByLink, addChildrenByEpicLink } = useJiraHook();
    const { dataTree, setDataTree, toggles, setToggles, configData } = useContext(PortfolioContext);
    const [jql, setJql] = useState<string>(jqlDefault);
    const [isValid, setIsValid] = useState<boolean>(true);
    const { t } = useTranslation();
    const idSpliter = "Daro";
    const [issueToShow, setIssueToShow] = useState<IssueTreeNodeType | null>(null);

    const TableHeadersDefault = [
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
        <>
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

            <div id="contentPanel">

                <SplitableContainer id={idSpliter} style={{ height: 'calc(100vh - 150px)' }}>
                    <SplitLeft id={idSpliter}>
                        <div style={{ width: "5000px" }}>
                            <div style={{ height: "20px", width: "5000px", background: "#F0F5F5", color: "grey", fontSize: "12px" }}>
                                {t('tree.list.title')}
                            </div>
                            <Tree
                                collapseAllLabel={t("collapse.all")}
                                expandAllLabel={t("expand.all")}
                                tree={dataTree}
                                toggles={toggles}
                                togglesChange={(newToggles: TreeToggleType) => handlerToggleChange(newToggles)}
                                onClick={(item) => handleClick(item)} />
                        </div>
                    </SplitLeft>
                    <SplitBar id={idSpliter}></SplitBar>
                    <SplitRight id={idSpliter}>
                        <div style={{ height: "20px", width: "5000px", background: "#F0F5F5", color: "grey", fontSize: "12px" }}>
                            {t('table.fields.title')}
                        </div>
                        <TableSelectable
                            headers={TableHeadersDefault}
                            tree={dataTree}
                            toggles={toggles}
                            togglesChange={(newToggles: TreeToggleType) => handlerToggleChange(newToggles)}
                            onClick={(item: any) => alert(item.key)} />

                    </SplitRight>
                </SplitableContainer>

            </div>

            <ModalDialog
                isOpen={issueToShow !== null}
                onClose={closeDialog}
            >
                <span>GO: <a href={issueToShow?.path} target="_blank">{issueToShow?.path}</a></span>
                
            </ModalDialog>

        </>
    );
};

export default SearchView;

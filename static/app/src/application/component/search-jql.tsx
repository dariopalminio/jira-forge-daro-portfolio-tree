import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useJiraHook from "../../domain/hook/jira-hook";
import Button from "../common/button/button";
import TextField from "../common/text-field/text-field";
import { Tree } from "./tree";
import { SplitableContainer, SplitLeft, SplitBar, SplitRight } from "../common/splitable-container"
import { TableSelectable } from "./table";
import { IssueItemType, TreeToggleType } from "../../domain/model/tree-types";
import PortfolioContext, { IPortfolioContext } from "../../domain/context/portfolio-context";

const SearchJql: React.FC = () => {
    const jqlDefault: string = "project=Portfolio and issuetype=Initiative order by created DESC";
    const { searchJql, getTreeTogglesFrom, getChildren } = useJiraHook();
    const { dataTree, setDataTree, toggles, setToggles, configData } = useContext(PortfolioContext);
    const [jql, setJql] = useState<string>(jqlDefault);
    const [isValid, setIsValid] = useState<boolean>(true);
    const { t } = useTranslation();
    const idSpliter = "Daro";

    const TableHeadersDefault = [
        {
            "prop": "project",
            "label": t("project"),
            "width": "150px"
        },
        {
            "prop": "assignee",
            "label": t("assignee"),
            "width": "100px"
        },
        {
            "prop": "status",
            "label": t("status"),
            "width": "100px"
        },
        {
            "prop": "startdate",
            "label": t("startdate"),
            "width": "100px"
        },
        {
            "prop": "duedate",
            "label": t("duedate"),
            "width": "100px"
        },
    ];

    const searchData = async () => {
        try {
            //load first level, generally are Initiatives
            const data = await searchJql(jql);
            const treeToggles = getTreeTogglesFrom(data.issues);
            setToggles(treeToggles);
            setDataTree(data.issues);
            //load childs of second level, generally are EPICs
            const newDataTree:IssueItemType[] = await getChildren(data.issues, configData.linksOutwards);
            const newTreeToggles = getTreeTogglesFrom(newDataTree);
            setToggles(newTreeToggles);
            setDataTree(newDataTree);
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

    const handleClick = (item: IssueItemType) => {
        //Here do navigate to path
        alert(`Select item: ${item.summary}`);
    }

    const handlerToggleChange = (newToggles: TreeToggleType) => {
        setToggles(newToggles)
    }

    return (
        <>
            <div id="actionPanel" style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <div style={{ float: 'left', width: '90%', alignItems: 'center' }}>
                    <TextField
                        id="jql-textfield"
                        placeholder="Here text..."
                        onChange={(e) => handleChange(e.target.value)}
                        value={jql}
                        {...(!isValid && { error: true, helperText: 'input error' })}
                    />
                </div>
                <div style={{ marginLeft: '10px', marginTop: '0px' }}>
                    <Button onClick={() => handleSearch()} style={{ float: 'right' }}>Search</Button>
                </div>
            </div>

            <div id="contentPanel">

                <SplitableContainer id={idSpliter}>
                    <SplitLeft id={idSpliter}>
                        <div style={{width: "5000px"}}>
                        <div style={{height: "20px", width: "5000px", background: "#F0F5F5", color: "grey", fontSize: "12px"}}>Lista en Árbol</div>
                        <Tree
                            title={t("work.breakdown")}
                            tree={dataTree}
                            toggles={toggles}
                            togglesChange={(newToggles: TreeToggleType) => handlerToggleChange(newToggles)}
                            onClick={(item) => handleClick(item)} />
                            </div>
                    </SplitLeft>
                    <SplitBar id={idSpliter}></SplitBar>
                    <SplitRight id={idSpliter}>
                    <div style={{height: "20px", width: "5000px", background: "#F0F5F5", color: "grey", fontSize: "12px"}}>Tabla de campos</div>
                        <TableSelectable
                            headers={TableHeadersDefault}
                            tree={dataTree}
                            toggles={toggles}
                            togglesChange={(newToggles: TreeToggleType) => handlerToggleChange(newToggles)}
                            onClick={(item: any) => alert(item.key)} />

                    </SplitRight>
                </SplitableContainer>



            </div>
        </>
    );
};

export default SearchJql;

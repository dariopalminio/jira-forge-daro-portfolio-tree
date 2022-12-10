import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useJiraHook from "../../domain/hook/jira-hook";
import Button from "../common/button/button";
import TextField from "../common/text-field/text-field";
import { Tree } from "./tree";
import { SplitableContainer, SplitLeft, SplitBar, SplitRight } from "../common/splitable-container"
import { TableSelectable } from "./table";
import { IssueItemType, TreeToggleType } from "../../domain/model/tree-types";

const SearchJql: React.FC = () => {
    const jqlDefault: string = "project=Portfolio and issuetype=Initiative order by created DESC";
    const { searchJql, getTreeTogglesFrom, getChildren } = useJiraHook();
    const [dataTree, setDataTree] = useState<IssueItemType[]>([]);
    const [jql, setJql] = useState<string>(jqlDefault);
    const [isValid, setIsValid] = useState<boolean>(true);
    const { t } = useTranslation();
    const [toggles, setToggles] = useState<TreeToggleType>({});
    const idSpliter = "Daro";

    const TableHeadersDefault = [
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
            "width": "190px"
        },
        {
            "prop": "duedate",
            "label": t("duedate"),
            "width": "190px"
        },
    ];

    const searchData = async () => {
        try {
            const data = await searchJql(jql);
            const treeToggles = getTreeTogglesFrom(data.issues);
            setToggles(treeToggles);
            setDataTree(data.issues);
            console.log('SearchJql data:', data);
            const newDataTree:IssueItemType[] = await getChildren(data.issues);
            console.log('************************newDataTree:',newDataTree);
            const t = getTreeTogglesFrom(newDataTree);
            console.log("new Toggles:",t);
            console.log("End new Toggles");
            setToggles(t);
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
        console.log("toggles:", toggles);
        console.log("newToggles:", newToggles);
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
                        <Tree
                            title={t("work.breakdown")}
                            tree={dataTree}
                            toggles={toggles}
                            togglesChange={(newToggles: TreeToggleType) => handlerToggleChange(newToggles)}
                            onClick={(item) => handleClick(item)} />
                    </SplitLeft>
                    <SplitBar id={idSpliter}></SplitBar>
                    <SplitRight id={idSpliter}>

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

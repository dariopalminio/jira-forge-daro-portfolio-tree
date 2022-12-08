import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useJiraHook from "../../domain/hook/jira-hook";
import { togglesTreeExample, treeExample } from "../../domain/model/issue-item.type";
import Button from "../common/button/button";
import TextField from "../common/text-field/text-field";
import { IssueItemType, Tree, TreeToggleType } from "./tree";
import { SplitableContainer, SplitLeft, SplitBar, SplitRight } from "../common/splitable-container"
import { TableSelectable } from "./table";


const TableHeadersDefault = [
    {
        "prop": "assignee",
        "label": "assignee"
    }, 
    {
        "prop": "status",
        "label": "status"
    },
    {
        "prop": "startdate",
        "label": "startdate"
    }, 
    {
        "prop": "duedate",
        "label": "duedate"
    },
];

const SearchJql: React.FC = () => {
    const jqlDefault: string = "project=TKP and issuetype = Epic order by created DESC";
    const { searchJql } = useJiraHook();
    const [total, setTotal] = useState('none');
    const [value, setValue] = useState<string>(jqlDefault);
    const [isValid, setIsValid] = useState<boolean>(true);
    const { t } = useTranslation();
    const [toggles, setToggle] = useState<TreeToggleType>(togglesTreeExample);
    const idSpliter = "Daro";

    const getDatas = async () => {
        try {
            const data = await searchJql(value);
            if (data.total) setTotal(data.total)
            console.log('SearchJql data:', data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        //getDatas()
    }, []);

    const handleOnClick = () => {
        getDatas()
    }

    const handleChange = async (val: string) => {
        setValue(val);
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
        setToggle(newToggles)
    }

    return (
        <>

            <div id="actionPanel" style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <div style={{ float: 'left', width: '90%', alignItems: 'center' }}>
                    <TextField
                        id="standard-basic-1"
                        placeholder="Here text..."
                        onChange={(e) => handleChange(e.target.value)}
                        value={value}
                        {...(!isValid && { error: true, helperText: 'input error' })}
                    />
                </div>
                <div style={{ marginLeft: '10px', marginTop: '0px' }}>
                    <Button onClick={() => handleOnClick()} style={{ float: 'right' }}>Search</Button>
                </div>
            </div>

            <div id="contentPanel">
                <p>Results Total (issues count): {total}</p>

                <SplitableContainer id={idSpliter}>
                    <SplitLeft id={idSpliter}>
                        <Tree
                            title={"work.breakdown"}
                            tree={treeExample}
                            toggles={toggles}
                            togglesChange={(newToggles: TreeToggleType) => handlerToggleChange(newToggles)}
                            onClick={(item) => handleClick(item)} />
                    </SplitLeft>
                    <SplitBar id={idSpliter}></SplitBar>
                    <SplitRight id={idSpliter}>

                        <TableSelectable
                            headers={TableHeadersDefault}
                            tree={treeExample}
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

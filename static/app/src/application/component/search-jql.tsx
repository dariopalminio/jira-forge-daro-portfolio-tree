import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useJiraHook from "../../domain/hook/jira-hook";
import { IssueItemType, treeExample } from "../../domain/model/issue-item.type";
import Button from "../common/button/button";
import TextField from "../common/text-field/text-field";
import Tree from "./tree/tree";


const SearchJql: React.FC = () => {
    const jqlDefault: string = "project=TKP and issuetype = Epic order by created DESC";
    const { searchJql } = useJiraHook();
    const [total, setTotal] = useState('none');
    const [value, setValue] = useState<string>(jqlDefault);
    const [isValid, setIsValid] = useState<boolean>(true);
    const { t } = useTranslation();

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

                <Tree list={treeExample} onClick={(item) => handleClick(item)} />


            </div>
        </>
    );
};

export default SearchJql;

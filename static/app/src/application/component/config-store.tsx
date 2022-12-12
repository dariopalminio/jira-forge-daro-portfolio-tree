import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PortfolioContext from "../../domain/context/portfolio-context";
import useJiraHook from "../../domain/hook/jira-hook";
import useStorageHook from "../../domain/hook/storage-hook";
import { ConfigStorageDataType } from "../../domain/model/config-storage-data.type";
import Button from "../common/button/button";
import Checkbox, { CheckboxType } from "../common/checkbox/checkbox";
import CheckboxGroup from "../common/checkbox/checkbox-group";

const ConfigStore: React.FC = () => {
    //const [configData, setConfigData] = useState(null);
    const { configData, setConfigData, configHasChanges, setConfigHasChanges } = useContext(PortfolioContext);
    const { getConfigStorage,
        setConfigStorage } = useStorageHook();
    const { t } = useTranslation();
    const { getOutwardsFromJira } = useJiraHook();
    const [outwardsCheckboxes, setOutwardsCheckboxes] = useState<CheckboxType[]>([]);
  

    /**
     * Get Outwards Ckecboxes
     * Returns a list of checkboxes containing all Jira Outwards with the selected Outwards 
     * as saved in the Outwards of configuration (from Storage)
     */
    const getOutwardsCkecboxes = (jiraOutwards: string[], outwardsConfigured: string[]) => {
        let outwardsCk: CheckboxType[] = [];
        for (var i = 0; i < jiraOutwards.length; i++) {
            const item: CheckboxType = {
                label: jiraOutwards[i],
                checked: outwardsConfigured.includes(jiraOutwards[i])
            }
            outwardsCk.push(item);
        }
        return [...outwardsCk];
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const outwardsArray: string[] = await getOutwardsFromJira();
                const outwardsCk: CheckboxType[] = getOutwardsCkecboxes(outwardsArray, configData.linksOutwards);
                setOutwardsCheckboxes(outwardsCk);
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, []);

    const handleOnChangeOutwards = (checkboxesListEdited: CheckboxType[], index: number) => {
        setOutwardsCheckboxes(checkboxesListEdited);
        if (configData.linksOutwards.includes(checkboxesListEdited[index].label)) {
            //remove
            const indexOfItemToRemove = configData.linksOutwards.findIndex((itemStr) => itemStr === checkboxesListEdited[index].label);
            const newLinksOutwards = [
                ...configData.linksOutwards.slice(0, indexOfItemToRemove),
                ...configData.linksOutwards.slice(indexOfItemToRemove + 1),
            ];
            let config = { ...configData };
            config.linksOutwards = newLinksOutwards;
            const newConfig = { ...config };
            setConfigData(newConfig);
        } else {
            let config = { ...configData };
            config.linksOutwards.push(checkboxesListEdited[index].label);
            const newConfig = { ...config };
            setConfigData(newConfig);
        }
        setConfigHasChanges(true);
        console.log("*************setThereAreChanges");
    }

    const handleSave = async () => {
        const configDataEdited = {...configData,  updatedAt: (new Date).toString()};
        const infoResponse: ConfigStorageDataType = await setConfigStorage(configDataEdited);
        setConfigData(infoResponse);
        setConfigHasChanges(false);
    }

    return (
        <div>
            <p style={{fontSize: "11px", color: "grey"}}>configuration data: {configData !== null ? JSON.stringify(configData) : 'null'}</p>

            <form>
                <p style={{fontSize: "11px", color: "grey"}}>{t("issue.link.types.msg.active")} {t("issue.link.types.outwards.msg.")}</p>

                <div>
                    <label>{t("issue.link.types.outwards")}:</label>
                    <CheckboxGroup
                        checkboxesList={outwardsCheckboxes}
                        onChange={(checkboxesListEdited: CheckboxType[], index: number) => handleOnChangeOutwards(checkboxesListEdited, index)}
                    />
                </div>
            </form>
            {configHasChanges && (
                <div style={{ marginLeft: '10px', marginTop: '0px' }}>
                    <Button onClick={() => handleSave()} style={{ float: 'right' }}>Save</Button>
                </div>
            )}

        </div>
    );
};

export default ConfigStore;
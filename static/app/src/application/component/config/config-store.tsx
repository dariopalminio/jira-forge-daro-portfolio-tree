import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import StoreContext from "../provider/store-context";
import FactoryContext from "../provider/factory-context";
import useJiraHook from '../../../domain/hook/jira-hook';
import useStorageHook from "../../../domain/hook/storage-hook";
import { ConfigStorageDataType } from "../../../domain/model/config-storage-data.type";
import Button from "../../common/button/button";
import Checkbox, { CheckboxType } from "../../common/checkbox/checkbox";
import CheckboxGroup from "../../common/checkbox/checkbox-group";
import TextField from "../../common/text-field/text-field";
import { ServiceKeys } from '../../../domain/outgoing/service-key';
import { IStorageApi } from "../../../domain/outgoing/storage-api.interface";
import { IJiraApi } from "../../../domain/outgoing/jira-api.interface";

const ConfigStore: React.FC = () => {
    const { configData, setConfigData, configHasChanges, setConfigHasChanges } = useContext(StoreContext);

    const { getObject } = useContext(FactoryContext);
    const storageApi: IStorageApi = getObject(ServiceKeys.StorageApi);
    const { getConfigStorage, setConfigStorage } = useStorageHook(storageApi);

    const { t } = useTranslation();
    
    const jiraApi: IJiraApi = getObject(ServiceKeys.JiraApi);
    const { getOutwardsFromJira } = useJiraHook(jiraApi);

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
    }

    const handleSave = async () => {
        const todate: string = (new Date).toString();
        const configDataEdited = { ...configData, updatedAt: todate };
        const infoResponse: ConfigStorageDataType = await setConfigStorage(configDataEdited);
        setConfigData(infoResponse);
        setConfigHasChanges(false);
    }

    const handleJqlChange = async (val: string) => {
        setConfigData({ ...configData, lastJql: val });
        setConfigHasChanges(true);
    }

    const handleMaxResultsChange = async (val: string) => {
        try {
            const maxResultsNumber: number = Number(val);
            const maxResultsStr: string = Math.abs(maxResultsNumber).toString();
            if (maxResultsStr === 'NaN') {
                throw new Error('Number of maxResults has format error');
            }
            if (maxResultsStr === '0') {
                throw new Error('Number of maxResults Must be greater than zero');
            }
            setConfigData({ ...configData, maxResults: maxResultsStr });
            setConfigHasChanges(true);
        } catch (error) {
            console.log('Error in handleMaxResultsChange function: ', error);
        };
    }

    return (
        <div>
            <p style={{ fontSize: "11px", color: "grey" }}>Version 1.3.0 (versión de prueba)</p>
            <p style={{ fontSize: "11px", color: "grey" }}>configuration data: {configData !== null ? JSON.stringify(configData) : 'null'}</p>

            <form>
                <p style={{ fontSize: "11px", color: "grey" }}>
                    {t("issue.link.types.msg.active")} {t("issue.link.types.outwards.msg.")}
                </p>

                <div style={{ display: 'flex', width: '100%', marginTop: '10px' }}>
                    <label>{t("issue.link.types.outwards")}:</label>
                    <CheckboxGroup
                        checkboxesList={outwardsCheckboxes}
                        onChange={(checkboxesListEdited: CheckboxType[], index: number) => handleOnChangeOutwards(checkboxesListEdited, index)}
                    />
                </div>

                <div style={{ display: 'flex', width: '100%', marginTop: '10px' }}>
                    <label>{t("maxResults.last.label")}:</label>
                    <TextField
                        style={{ marginLeft: '5px', width: '100px' }}
                        id="maxResults-textfield-config"
                        placeholder="Here text..."
                        onChange={(e) => handleMaxResultsChange(e.target.value)}
                        value={configData.maxResults}
                    />
                </div>

                <div style={{ display: 'flex', width: '100%', marginTop: '10px' }}>
                    <label>{t("jql.last.label")}:</label>
                    <TextField
                        style={{ marginLeft: '5px', width: '500px' }}
                        id="jql-textfield-config"
                        placeholder="Here text..."
                        onChange={(e) => handleJqlChange(e.target.value)}
                        value={configData.lastJql}
                    />
                </div>
            </form>

            {configHasChanges && (
                <div style={{ marginLeft: '10px', marginTop: '0px' }}>
                    <Button onClick={() => handleSave()} style={{ marginTop: '10px', float: 'right' }}>{t('save')}</Button>
                </div>
            )}

        </div>
    );
};

export default ConfigStore;
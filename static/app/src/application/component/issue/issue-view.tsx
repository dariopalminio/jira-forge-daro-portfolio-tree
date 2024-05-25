import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import useJiraHostHook from "../../../domain/hook/jira-host-hook";
import { IssueTreeNodeType } from "../../../domain/model/tree-types";
import Button from "../../common/button/button";
import TextField from "../../common/text-field/text-field";
import AssigneeCell from "../table/cells/assignee-cell";
import StatusCell from "../table/cells/status-cell";
import { IStorageApi } from "../../../domain/outgoing/storage-api.interface";
import { ServiceKeys } from "../../../domain/outgoing/service-key";
import FactoryContext from "../../provider/factory-context";
import { IJiraHost } from "../../../domain/outgoing/jira-host.interface";


interface IProps {
    issueItem: IssueTreeNodeType | null;
}

/**
 * IssueView component
 */
const IssueView: React.FC<IProps> = (props: IProps) => {

    const { getObject } = useContext(FactoryContext);
    const jiraHostApi: IJiraHost = getObject(ServiceKeys.StorageApi);
    const { navigateToNewWindows } = useJiraHostHook(jiraHostApi);
    
    const { t } = useTranslation();

    const goToIssue = () => {
        if (props.issueItem?.path) {
            navigateToNewWindows(props.issueItem?.path);
        }
    }

    const handleOnClickAnchorLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        goToIssue();
    }

    const getSummary = () => {
        return props.issueItem?.summary ? props.issueItem?.summary : ''
    }

    const getIssueTypeName = (): string => {
        const name: string = props.issueItem?.fields?.issuetype?.name? props.issueItem.fields.issuetype.name  : '';
        return name;
    }

    return (
        <>


            <div style={{ display: 'block', marginTop: '5px' }}>
            <div style={{ display: 'flex' }}>
                    <label style={{width: '120px'}}>Key:</label>
                    <a href={'#'} onClick={(e) => handleOnClickAnchorLink(e)}>
                    {props.issueItem?.key}
                </a>
                </div>
            </div>

            <div style={{ display: 'block', marginTop: '5px' }}>
            <div style={{ display: 'flex' }}>
                    <label style={{width: '120px'}}>Issue Type Name:</label>
                    <label>{getIssueTypeName()}</label>
                </div>
            </div>

            <div style={{ display: 'block', marginTop: '5px' }}>
                <div style={{ display: 'flex' }}>
                    <label style={{width: '120px'}}>{t("project")}:</label>
                    {props.issueItem?.fields?.project?.name}
                </div>
            </div>

            <div style={{ display: 'block', marginTop: '5px' }}>
                <div style={{ display: 'flex' }}>
                    <label style={{width: '120px'}}>{t("summary")}:</label>
                    <TextField
                        id="jql-textfield"
                        placeholder="Here text..."
                        onChange={(e) => { return; }}
                        value={getSummary()}
                        style={{width: '350px'}}
                    />
                </div>
            </div>

            <div style={{ display: 'block', marginTop: '5px' }}>
                <div style={{ display: 'flex' }}>
                    <label style={{width: '120px'}}>{t("status")}:</label>
                    <StatusCell item={props.issueItem} />
                </div>
            </div>

            <div style={{ display: 'block', marginTop: '5px' }}>
                <div style={{ display: 'flex' }}>
                    <label style={{width: '120px'}}>{t("assignee")}:</label>
                    <AssigneeCell item={props.issueItem} />
                </div>
            </div>

            <div style={{ display: 'block', marginTop: '5px' }}>
                <div style={{ display: 'flex' }}>
                    <label style={{width: '120px'}}>{t("startdate")}:</label>
                    {props.issueItem?.fields?.customfield_10015}
                </div>
            </div>


            <div style={{ display: 'block', marginTop: '5px' }}>
                <div style={{ display: 'flex' }}>
                    <label style={{width: '120px'}}>{t("duedate")}:</label>
                    {props.issueItem?.fields?.duedate}
                </div>
            </div>
            
            <Button onClick={() => goToIssue()} style={{ float: 'right' }}>{t('go.to')}</Button>

        </>
    );
};

export default IssueView;
import { IColHeader } from "../types";

/**
"fields": {
                "summary": "Proyecto ejemplo",
                "issuetype": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/issuetype/10005",
                    "id": "10005",
                    "description": "Portfolio",
                    "iconUrl": "https://daropalmi.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10551?size=medium",
                    "name": "Portfolio",
                    "subtask": false,
                    "avatarId": 10551,
                    "hierarchyLevel": 0
                },
                "created": "2022-11-14T10:30:59.174-0300",
                "duedate": "2022-12-31",
                "issuelinks": [],
                "assignee": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/user?accountId=636915272f8b3c8f116ac78d",
                    "accountId": "636915272f8b3c8f116ac78d",
                    "emailAddress": "dario.palminio@agilistik.cl",
                    "avatarUrls": {
                        "48x48": "https://secure.gravatar.com/avatar/4c36a83de2784e01d99138459099e319?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FDP-1.png",
                        "24x24": "https://secure.gravatar.com/avatar/4c36a83de2784e01d99138459099e319?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FDP-1.png",
                        "16x16": "https://secure.gravatar.com/avatar/4c36a83de2784e01d99138459099e319?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FDP-1.png",
                        "32x32": "https://secure.gravatar.com/avatar/4c36a83de2784e01d99138459099e319?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FDP-1.png"
                    },
                    "displayName": "Daro Palmi",
                    "active": true,
                    "timeZone": "America/Santiago",
                    "accountType": "atlassian"
                },
 */

interface IPropsAssigneeCell {
    item: any;
    element: IColHeader;
}
const AssigneeCell: React.FC<IPropsAssigneeCell> = (props: IPropsAssigneeCell) => {
    return (<div >
        <img src={props?.item?.fields?.assignee?.avatarUrls['16x16']} alt="" height="16" width="16"/>
        <label>{props?.item?.fields?.assignee?.displayName}</label>
    </div>)
}

export default AssigneeCell;
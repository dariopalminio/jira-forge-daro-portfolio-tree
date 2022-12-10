import { IColHeader } from "../types";
import styles from './assignee-cell.module.css';
import imgError from "./item-no-image.png"

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
    colHeader: IColHeader;
}
const AssigneeCell: React.FC<IPropsAssigneeCell> = (props: IPropsAssigneeCell) => {

    const getAvatarUrl = (): string | undefined => {
        try {
            const url = props?.item?.fields?.assignee?.avatarUrls['16x16'];
            if (url === undefined || url === null || typeof url !== 'string') {
                throw new Error(`Property named props.item.fields.assignee.avatarUrls['16x16'] not found`);
            }
            return url;
        } catch (error: any) {
            console.log(error.message);
            return undefined;
        }
    }

    const getDisplayName = (): string | undefined => {
        try {
            const displayName = props?.item?.fields?.assignee?.displayName;
            if (displayName === undefined || displayName === null || typeof displayName !== 'string') {
                return undefined;
            }
            return displayName;
        } catch (error) {
            return undefined;
        }
    }

    return (
        <div style={{ width: props.colHeader.width }}>
            {
                getAvatarUrl() &&
                <img src={getAvatarUrl()}
                    onError={(e) => {
                        e.currentTarget.src = imgError
                    }}
                    height="16" width="16" />
            }
            {
                getDisplayName() &&
                <label className={styles.assigneeLabel}>{getDisplayName()}</label>
            }
        </div>
    )
}

export default AssigneeCell;
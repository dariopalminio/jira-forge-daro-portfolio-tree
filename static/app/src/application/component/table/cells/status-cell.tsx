import { IColHeader } from "../types";
import styles from './status-cell.module.css';

/**
"fields": {
    "status": {
                    "self": "https://daropalmi.atlassian.net/rest/api/3/status/10029",
                    "description": "",
                    "iconUrl": "https://daropalmi.atlassian.net/images/icons/statuses/generic.png",
                    "name": "IMPLEMENTING",
                    "id": "10029",
                    "statusCategory": {
                        "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/4",
                        "id": 4,
                        "key": "indeterminate",
                        "colorName": "yellow",
                        "name": "In Progress"
                    }
                }
                     "status": {
                                    "self": "https://daropalmi.atlassian.net/rest/api/3/status/10002",
                                    "description": "",
                                    "iconUrl": "https://daropalmi.atlassian.net/",
                                    "name": "Backlog",
                                    "id": "10002",
                                    "statusCategory": {
                                        "self": "https://daropalmi.atlassian.net/rest/api/3/statuscategory/2",
                                        "id": 2,
                                        "key": "new",
                                        "colorName": "blue-gray",
                                        "name": "To Do"
                                    }
                                },
}
 */

interface IPropsAssigneeCell {
    item: any;
    colHeader: IColHeader;
}
const StatusCell: React.FC<IPropsAssigneeCell> = (props: IPropsAssigneeCell) => {

    const getStatusNameText = (): string => {
        try {
            const name = props?.item?.fields?.status?.name;
            if (name === undefined || name === null || typeof name !== 'string') {
                return '';
            }
            return name;
        } catch (error) {
            return '';
        }
    }

    const getStatusName = (): string | undefined => {
        try {
            const statusName = props?.item?.fields?.status?.statusCategory?.name;
            if (statusName === undefined || statusName === null || typeof statusName !== 'string') {
                return undefined;
            }
            return statusName;
        } catch (error) {
            return undefined;
        }
    }

    const getColor = (): string => {
        try {
            const statusName = getStatusName();

            if (statusName === undefined) {
                return 'grey';
            }

            switch (statusName) {
                case 'To Do': {
                    return '#3D3D3D';
                }
                case 'In Progress': {
                    return 'DarkBlue';
                }
                case 'Done': {
                    return 'DarkGreen';
                }
                default: {
                    return 'grey';
                }
            }
        } catch (error) {
            return 'grey';
        }
    }

    const getBckgroundColor = (): string => {
        try {
            const statusName = getStatusName();

            if (statusName === undefined) {
                return 'LightGray';
            }

            switch (statusName) {
                case 'To Do': {
                    return 'LightGray';
                }
                case 'In Progress': {
                    return 'LightBlue';
                }
                case 'Done': {
                    return 'LightGreen';
                }
                default: {
                    return 'grey';
                }
            }
        } catch (error) {
            return 'LightGray';
        }
    }

    const getLabelStyle = () => {
        return {
            color: getColor(),
            background: getBckgroundColor(),
            borderRadius: '3px',
            border: '1px solid white'
        }
    }

    return (
        <div className={styles.statusWrapper}
            style={{ width: props.colHeader.width }}>
            {
                <label className={styles.statusLabel}
                    style={getLabelStyle()}>
                    {getStatusNameText()}
                </label>
            }
        </div>
    )
}

export default StatusCell;
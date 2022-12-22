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
    colHeader?: IColHeader;
}
const StatusCell: React.FC<IPropsAssigneeCell> = (props: IPropsAssigneeCell) => {

    const getStatusNameText = (): string => {
        try {
            const name = props?.item?.fields?.status?.name;
            console.log(`status?.name ${props?.item?.key}:`,name);
            if (name === undefined || name === null || typeof name !== 'string') {
                return '';
            }
            return name;
        } catch (error) {
            return '';
        }
    }

    const getStatusKey = (): string | undefined => {
        try {
            const statusName = props?.item?.fields?.status?.statusCategory?.key;
            console.log('statusCategory-->statusName:',statusName);
            if (statusName === undefined || statusName === null || typeof statusName !== 'string') {
                return undefined;
            }
            return statusName;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * 
    statusCategory: 
        colorName: "green"
        id: 3
        key: "done"
        name: "Listo"
    statusCategory: 
        colorName: "blue-gray"
        id: 2
        key: "new"
        name: "Por hacer"
    statusCategory: 
        colorName: "yellow"
        id: 4
        key: "indeterminate"
        name: "En curso"
     */
    const getColor = (): string => {
        try {
            const statusName = getStatusKey();

            if (statusName === undefined) {
                return 'grey';
            }

            switch (statusName) {
                case 'new': {
                    return 'black';
                }
                case 'indeterminate': {
                    return 'black';
                }
                case 'done': {
                    return 'black';
                }
                default: {
                    return 'black';
                }
            }
        } catch (error) {
            return 'grey';
        }
    }

    const getBckgroundColor = (): string => {
        try {
            const statusName = getStatusKey();

            if (statusName === undefined) {
                return 'LightGray';
            }

            switch (statusName) {
                case 'new': {
                    return 'LightGray';
                }
                case 'indeterminate': {
                    return '#a4d0f8';
                }
                case 'done': {
                    return 'LightGreen';
                }
                default: {
                    return 'LightGreen';
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
            border: '1px solid white',
            maxWidth: props.colHeader?.width? props.colHeader?.width : '400px'
        }
    }

    return (
        <div className={styles.statusWrapper}
            style={{ width: props.colHeader?.width? props.colHeader?.width : '400px' }}>
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
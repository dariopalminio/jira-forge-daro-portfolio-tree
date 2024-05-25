import { IColHeader } from "../types";
import styles from './status-cell.module.css';


interface IPropsAssigneeCell {
    item: any;
    colHeader?: IColHeader;
}

/**
 * StatusCell component
 */
const StatusCell: React.FC<IPropsAssigneeCell> = (props: IPropsAssigneeCell) => {
    const redStatusNames = ['BLOCKED', 'OFF TRACK', 'CRITICAL', 'BLOQUEADO', 'DEFICIENTE', 'DEFICIENT', 'FALLIDO', 'FAILED', 'FAILURE'];
    const yellowStatusNames = ['AT RISK', 'CON RIESGO', 'NEED ATTENTION', 'ATTENTION'];

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

    const getStatusKey = (): string | undefined => {
        try {
            const statusName = props?.item?.fields?.status?.statusCategory?.key;
            
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
            const statusName: string = getStatusNameText().toUpperCase();

            if (redStatusNames.includes(statusName)){
                return '#F94881';
            }

            if (yellowStatusNames.includes(statusName)){
                return '#F0E776';
            }

            const statusKey: string | undefined = getStatusKey();

            if (statusKey === undefined) {
                return 'LightGray';
            }

            switch (statusKey) {
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

    const getWithStatusWrapper = () => {
        if (props.colHeader?.width) {
            return { width: props.colHeader?.width? props.colHeader?.width : '400px' };
        }
        return {};
    }

    return (
        <div className={styles.statusWrapper}
            style={getWithStatusWrapper()}>
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
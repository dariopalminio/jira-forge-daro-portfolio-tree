import { IColHeader } from "../types";
import styles from './key-cell.module.css';
import imgError from "./item-no-image.png"
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
import { TreeToggleType } from "../../../../domain/model/tree-types";

interface IPropsAssigneeCell {
    item: any;
    colHeader: IColHeader;
    toggles: TreeToggleType;
    togglesChange: (newToggles: TreeToggleType) => void;
}
const KeyCell: React.FC<IPropsAssigneeCell> = (props: IPropsAssigneeCell) => {

    const getPaddingLeft = (): string => {
        return ((props.item.level - 1) * 15).toString() + 'px';
    }

    const isOpen = (): boolean => {
        return props.toggles[props.item.key];
    }

    const handleClickOpen = () => {
        const newToggles = { ...props.toggles, [props.item.key]: !props.toggles[props.item.key] };
        props.togglesChange(newToggles);
    }

    return (
        <div style={{ width: props.colHeader.width }}>
            <span style={{ marginLeft: getPaddingLeft() }} />
            {props.item?.hasChildren ? (
                <div className={styles.toggleSelector}
                    onClick={() => handleClickOpen()}>
                    {isOpen() ?
                        <RiArrowDownSLine size={15} color="#a6a6a6" /> :
                        <RiArrowRightSLine size={15} color="#a6a6a6" />}
                </div>
            ) : <label style={{ marginLeft: "15px" }} />
            }
            <img
                src={props.item.iconUrl}
                onError={(e) => {
                    e.currentTarget.src = imgError
                }}
                alt="" height="16" width="16" />
                <a 
                 
                 href={props.item?.path} target="_blank">{props.item?.key}</a>
            
        </div>
    )
}

export default KeyCell;
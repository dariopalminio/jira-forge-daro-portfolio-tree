import { IColHeader } from "./types";
import styles from './table-selectable.module.css';
import TableSelectableItem from "./table-selectable-item";
import { TreeToggleType } from "../tree";


interface IProps {
    headers: IColHeader[];
    tree: any[]; //object where each 'Key' name is same to headers 'prop' value indicated by IColHeader
    onClick: (item: any) => void;
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

/**
 * TableGridSelector
 * 
 * - The order of the columns depends on the headers array input. 
 * - The title of the columns is given by the 'label' property in each item of headers array. 
 * - The rows are selectable with the onClick method and return the selected row object.
 * 
 * @param props 
 * @returns 
 */
const TableSelectable: React.FC<IProps> = (props: IProps) => {

    const handleOnClickLink = (item: any) => {
        props.onClick(item);
    }

    const getHeaderCellElements = (): React.ReactNode => {
        return props.headers?.map((element: IColHeader, index: number) => {
            return (
                <div key={index}>
                    {element.label}
                </div>
            )
        })
    }

    const getGridTemplateColumns = ()=> {
        const cols = props.headers?.length;
        return {gridTemplateColumns: `repeat(${cols}, 1fr)`};
    }

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
                <div className={styles.tableRow} 
                style={getGridTemplateColumns()}>
                    {
                        getHeaderCellElements()
                    }
                </div>
            </div>
            <div className={styles.tableBody}>
                {
                    props.tree?.map(
                        (item: any, index: number) => {
                            return (
                                <TableSelectableItem 
                                key={index} 
                                headers={props.headers}
                                level={0}
                                toggles={props.toggles}
                                togglesChange={props.togglesChange}
                                item={item} 
                                onClick={(item) => handleOnClickLink(item)} />
                            )
                        }
                    )
                }
            </div>
        </div>
    );
};

export default TableSelectable;
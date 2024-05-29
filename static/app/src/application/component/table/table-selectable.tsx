import { IColHeader } from "./types";
import styles from './table-selectable.module.css';
import TableSelectableItem from "./table-selectable-item";
import { IssueTreeNodeType, TreeToggleType } from "../../../domain/model/tree-types";


interface IProps {
    headers: IColHeader[];
    tree: IssueTreeNodeType; //object where each 'Key' name is same to headers 'prop' value indicated by IColHeader
    onClick: (item: any) => void;
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

/**
 * TableSelectable component
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
            return (element.isVisible &&
                <div key={index} style={{width: element.width}}>
                    {element.label}
                </div>
            )
        })
    }

    const getGridTemplateColumns = ()=> {
        const cols = props.headers.filter(header => header.isVisible).length;
        return {gridTemplateColumns: `repeat(${cols}, 1fr)`};
    }

    const getTableWidth = ()=> {
        let width: number = 0;
        for (var i = 0; i < props.headers.length; i++) {
            if (props.headers[i].isVisible){
                width = width + props.headers[i].width;
            }
        }
        return width;
    }

    return (
        <div className={styles.tableContainer} style={{width: `${getTableWidth()}px`}}>
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
                    props.tree?.childrens?.map(
                        (item: any, index: number) => {
                            return (
                                <TableSelectableItem 
                                key={'table' + item.key + '_i_' + index} 
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
import React, { useState } from 'react';
import useIssueHook from '../../../domain/hook/issue-hook';
import { TreeToggleType } from '../../../domain/model/tree-types';
import Progress from '../../common/progress/progress';
import AssigneeCell from './cells/assignee-cell';
import KeyCell from './cells/key-cell';
import StatusCell from './cells/status-cell';
import styles from './table-selectable.module.css';
//className={styles.inputTextField}
import { IColHeader } from "./types";

interface IProps {
    headers: IColHeader[];
    level: number;
    onClick: (item: any) => void;
    item: any;
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

/**
 * TableSelectableItem component
 */
const TableSelectableItem: React.FC<IProps> = ({ headers, level, item, onClick, toggles, togglesChange }) => {
    const { statusKeyOf,
        isStartdateExpiredAndTodo, isDuedateExpiredAndInprogress, issueTypeNameOf, getChildrenProgressCount } = useIssueHook();

    const handleOnClick = (item: any) => {
        onClick(item);
    }

    const isOpen = (): boolean => {
        //console.log(`toggles[${item.key}]: `, toggles[item.key]);
        return toggles[item.key];
    }

    const getFieldValue = (prop: string) => {
        try {
            const value = item[`${prop}`];
            if (value && value !== undefined && value !== null) {
                return value;
            }
            throw new Error(`The field named ${prop} could not be read`);
        } catch (error) {
            console.log(error);
            return 'not found';
        }
    }

    const getCellElement = (colHeader: IColHeader, index: number): React.ReactNode => {
        const keyIndex = 'cell_' + item.key + '_i_' + index;
        switch (colHeader.prop) {
            case 'key': {
                return (
                    <KeyCell key={keyIndex} item={item} colHeader={colHeader} toggles={toggles} togglesChange={togglesChange} />)
            }
            case 'assignee': {
                return (
                    <AssigneeCell key={keyIndex} item={item} colHeader={colHeader} />
                )
            }
            case 'issuetype': {
                return (
                    <div key={keyIndex} style={{ width: colHeader.width, cursor: 'pointer' }}
                        onClick={() => handleOnClick(item)}>
                        <label className={styles.textOverflow}
                            style={{ cursor: 'pointer' }}
                        >
                            {issueTypeNameOf(item)}
                        </label>
                    </div>
                )
            }
            case 'summary': {
                return (
                    <div key={keyIndex} style={{ width: colHeader.width, cursor: 'pointer' }}
                        onClick={() => handleOnClick(item)}>
                        <label className={styles.textOverflow}
                            style={{ cursor: 'pointer' }}
                        >
                            {getFieldValue('summary')}
                        </label>
                    </div>
                )
            }
            case 'status': {
                return (
                    <StatusCell key={keyIndex} item={item} colHeader={colHeader} />
                )
            }
            case 'startdate': {
                const labelColor: string = isStartdateExpiredAndTodo(item) ? 'red' : 'black';
                return (
                    <div key={keyIndex} style={{ width: colHeader.width, color: `${labelColor}` }}>
                        {item?.fields?.customfield_10015}
                    </div>
                )
            }
            case 'duedate': {
                const labelColor: string = isDuedateExpiredAndInprogress(item) ? 'red' : 'black';
                return (
                    <div key={keyIndex} style={{ width: colHeader.width, color: `${labelColor}` }}>
                        {item?.fields?.duedate}
                    </div>
                )
            }
            case 'project': {
                return (
                    <div key={keyIndex} style={{ width: colHeader.width }}>
                        <label className={styles.textOverflow}>
                            {item?.fields?.project?.name}
                        </label>
                    </div>
                )
            }
            case 'progress': {
                return (
                    <div key={keyIndex}>
                        <Progress progress={getChildrenProgressCount(item)} />
                    </div>
                )
            }
            default: {
                return (
                    <div key={keyIndex} style={{ width: colHeader.width }}>
                        {getFieldValue(colHeader.prop)}
                    </div>
                )
            }
        }
    }

    const getRowCellElements = (): React.ReactNode => {
        return headers.map(
            (element: IColHeader, index: number) => {
                return (element.isVisible ? getCellElement(element, index) : undefined)
            }
        )
    }

    const getGridTemplateColumns = () => {
        const columnCount = headers.filter(header => header.isVisible).length;
        return { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };
    }

    return (
        <>
            <div className={styles.tableRow}
                style={getGridTemplateColumns()}
            >
                {
                    getRowCellElements()
                }
            </div>
            {isOpen() &&
                item?.childrens?.map(
                    (item: any, index: number) => {
                        return (
                            <TableSelectableItem
                                key={'table-item_' + item.key + '_i_' + index}
                                headers={headers}
                                level={level + 1}
                                item={item}
                                togglesChange={togglesChange}
                                toggles={toggles}
                                onClick={(item) => handleOnClick(item)} />
                        );
                    }
                )
            }
        </>
    )
}

export default TableSelectableItem;

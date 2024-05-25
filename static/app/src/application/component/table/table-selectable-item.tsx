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
    const {statusKeyOf,
        isStartdateExpiredAndTodo, isDuedateExpiredAndInprogress, issueTypeNameOf, getChildrenProgressCount} = useIssueHook();

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
        switch (colHeader.prop) {
            case 'key': {
                return (
                    <KeyCell key={index} item={item} colHeader={colHeader} toggles={toggles} togglesChange={togglesChange} />)
            }
            case 'assignee': {
                return (
                    <AssigneeCell key={index} item={item} colHeader={colHeader} />
                )
            }
            case 'issuetype': {
                return (
                    <div key={index} style={{ width: colHeader.width, cursor: 'pointer' }}
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
                    <div key={index} style={{ width: colHeader.width, cursor: 'pointer' }}
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
                    <StatusCell key={index} item={item} colHeader={colHeader} />
                )
            }
            case 'startdate': {
                const labelColor: string = isStartdateExpiredAndTodo(item)? 'red': 'black';
                return (
                    <div key={index} style={{ width: colHeader.width, color: `${labelColor}` }}>
                        {item?.fields?.customfield_10015}
                    </div>
                )
            }
            case 'duedate': {
                const labelColor: string = isDuedateExpiredAndInprogress(item)? 'red': 'black';
                return (
                    <div key={index} style={{ width: colHeader.width, color: `${labelColor}` }}>
                        {item?.fields?.duedate}
                    </div>
                )
            }
            case 'project': {
                return (
                    <div key={index} style={{ width: colHeader.width }}>
                        <label className={styles.textOverflow}>
                        {item?.fields?.project?.name}
                        </label>
                    </div>
                )
            }
            //<Progress progress={getChildrenProgressCount(treeItem)}
            case 'progress': {
                return (
                    <Progress progress={getChildrenProgressCount(item)} />
                )
            }
            default: {
                return (
                    <div key={index} style={{ width: colHeader.width }}>
                        {getFieldValue(colHeader.prop)}
                    </div>
                )
            }
        }
    }

    const getRowCellElements = (): React.ReactNode => {
        return headers.map(
            (element: IColHeader, index: number) => {
                return getCellElement(element, index)
            }
        )
    }

    const getGridTemplateColumns = () => {
        const cols = headers?.length;
        return { gridTemplateColumns: `repeat(${cols}, 1fr)` };
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
                                key={index}
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

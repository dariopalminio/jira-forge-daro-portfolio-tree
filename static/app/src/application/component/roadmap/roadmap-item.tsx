import React, { useState } from 'react'
import { IssueTreeNodeType, TreeToggleType } from '../../../domain/model/tree-types';
//className={styles.inputTextField}
import styles from './roadmap.module.css';
import { getDaysBetweenTwoDates } from '../../../domain/helper/date.helper';
import { QuartersType } from '../../../domain/model/quarter-types';
import useIssueHook from '../../../domain/hook/issue-hook';

interface IProps {
    timelineData: QuartersType;
    onClick: (item: IssueTreeNodeType) => void;
    treeItem: IssueTreeNodeType;
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

const RoadmapItem: React.FC<IProps> = (props: IProps) => {
    const {statusKeyOf, stardateOf, duedateOf, issueTypeNameOf,
        isStartdateExpiredAndTodo, isDuedateExpiredAndInprogress} = useIssueHook();

    const handleClickOpen = () => {
        const newToggles = { ...props.toggles, [props.treeItem.key]: !props.toggles[props.treeItem.key] };
        props.togglesChange(newToggles);
    }

    const handleOnClick = (item: IssueTreeNodeType) => {
        props.onClick(item);
    }

    const getBarBackground = (): string => {
        let issueType: string = issueTypeNameOf(props.treeItem);
        issueType = issueType ? issueType.toUpperCase().trim() : '';
        let color = 'yellow';
        switch  (issueType) {
            case "EPIC":
                color = '#7007B4'; //berry
                break;
            case "STORY":
                color = '#24A75F'; //green
                break;
            case "TASK":
                color = '#42BDFF'; //blue
                break;
            case "INITIATIVE":
                color = '#2E3C50'; //berry
                break;
            case "INICIATIVA":
                color = '#0090CD'; //berry
                break;
            default:
                color = '#2E3C50';
          }
          return color;
    }

    const getStatusBckground = (): string => {
        try {
            const statusName: string = statusKeyOf(props?.treeItem);

            if (statusName === '') {
                return 'LightGray';
            }

            switch (statusName) {
                case 'new': {
                    return 'grey';
                }
                case 'indeterminate': {
                    return '#2F84FE'; //Blue
                }
                case 'done': {
                    return '#07B455';
                }
                default: {
                    return 'LightGray';
                }
            }
        } catch (error) {
            return 'LightGray';
        }
    }

    const getMarginLeft = () => {
        const startdate: string = stardateOf(props.treeItem);
        if (startdate === '') {
            return 0;
        }
        const days: number = getDaysBetweenTwoDates(props.timelineData.firstDate, new Date(startdate));

        return days * 2;
    }

    const getBarWidth = () => {
        const startdate: string = stardateOf(props.treeItem);
        if (startdate === '') {
            return 0;
        }
        const duedate = duedateOf(props.treeItem);
        if (duedate === '') {
            return 0;
        }
        const days: number = getDaysBetweenTwoDates(new Date(startdate), new Date(duedate));

        return days * 2;
    }

    const isOpen = (): boolean => {
        return props.toggles[props.treeItem.key];
    }

    const getLabelStartDate = (): React.ReactNode => {
        let date = props.treeItem?.fields?.customfield_10015;
        date = (date && typeof date === 'string' && date.length>10)? date.substring(0, 10) : date;
        const labelColor: string = isStartdateExpiredAndTodo(props.treeItem)? 'red': 'grey';
        return (
            (getBarWidth() !== 0) &&
            <label className={styles.labelDate}
                style={{ left: `${getMarginLeft() - 50}px`, color: `${labelColor}`}}>
                {date}</label>

        )
    }

    const getLabelEndDate = (): React.ReactNode => {
        let date = duedateOf(props.treeItem);
        date = (date && typeof date === 'string' && date.length>10)? date.substring(0, 10) : date;
        const labelColor: string = isDuedateExpiredAndInprogress(props.treeItem)? 'red': 'grey';
        return (
            (getBarWidth() !== 0) &&
            <label className={styles.labelDate}
                style={{ left: `${getMarginLeft() + getBarWidth() + 5}px`, color: `${labelColor}` }}>
                {date}</label>

        )
    }

    return (
        <>
            <div className={styles.bar} style={{ height: '20px' }}>
                {getLabelStartDate()}
                {getLabelEndDate()}
                <div className={styles.internalBar} onClick={() => handleOnClick(props.treeItem)}
                    style={{ marginLeft: `${getMarginLeft()}px`, width: `${getBarWidth()}px`, background: `${getBarBackground()}`}}>
                    {(getBarWidth() !== 0) && props.treeItem.key}
                    <div style={{background: getStatusBckground(), width: '100%', height: '3px'}}/>
                </div>
            </div>
            {isOpen() &&
                props.treeItem?.childrens?.map(
                    (item, index) => {
                        return (
                            <RoadmapItem
                                timelineData={props.timelineData}
                                key={index}
                                toggles={props.toggles}
                                togglesChange={props.togglesChange}
                                treeItem={item}
                                onClick={(item) => handleOnClick(item)} />
                        );
                    }
                )
            }
        </>
    )
}

export default RoadmapItem
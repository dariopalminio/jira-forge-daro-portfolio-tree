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

/**
 * RoadmapItem
 * @param props 
 * @returns 
 */
const RoadmapItem: React.FC<IProps> = (props: IProps) => {
    const { statusKeyOf, stardateOf, duedateOf, issueTypeNameOf,
        isStartdateExpiredAndTodo, isDuedateExpiredAndInprogress, hasDuedate, hasStartdate } = useIssueHook();

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
        switch (issueType) {
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

    /**
     * Calculate the margin to the left from the startdate.
     */
    const getMarginLeft = (): number => {
        const startdate: string = stardateOf(props.treeItem);
        if (startdate === '') {
            return 0;
        }
        const days: number = getDaysBetweenTwoDates(props.timelineData.firstDate, new Date(startdate));

        return days * 2;
    }

    /**
 * Calculate the margin to the left from the startdate.
 */
    const getMarginLeftForDuedate = (): number => {
        const duedate: string = duedateOf(props.treeItem);
        if (duedate === '') {
            return 0;
        }
        const days: number = getDaysBetweenTwoDates(props.timelineData.firstDate, new Date(duedate));
        console.log('*************************************days:', days * 2);
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
        date = (date && typeof date === 'string' && date.length > 10) ? date.substring(0, 10) : date;
        const labelColor: string = isStartdateExpiredAndTodo(props.treeItem) ? 'red' : 'grey';
        return (

            <label className={styles.labelDate}
                style={{ left: `${getMarginLeft() - 50}px`, color: `${labelColor}` }}>
                {date}</label>

        )
    }

    const getLabelEndDate = (): React.ReactNode => {
        let date = duedateOf(props.treeItem);
        date = (date && typeof date === 'string' && date.length > 10) ? date.substring(0, 10) : date;
        const labelColor: string = isDuedateExpiredAndInprogress(props.treeItem) ? 'red' : 'grey';
        return (
            (getBarWidth() !== 0) &&
            <label className={styles.labelDate}
                style={{ left: `${getMarginLeft() + getBarWidth() + 5}px`, color: `${labelColor}` }}>
                {date}</label>

        )
    }

    const getInternalBar = (): React.ReactNode => {
        return (
            <div className={styles.internalBar}
                onClick={() => handleOnClick(props.treeItem)}
                style={{ marginLeft: `${getMarginLeft()}px`, width: `${getBarWidth()}px`, background: `${getBarBackground()}` }}>
                {(getBarWidth() !== 0) && props.treeItem.key}
                <div style={{ background: getStatusBckground(), width: '100%', height: '3px' }} />
            </div>
        )
    }

    const getInternalRomboForStart = (): React.ReactNode => {
        return (
            <div className={styles.internalRombo}
                onClick={() => handleOnClick(props.treeItem)}
                style={{ marginLeft: `${getMarginLeft()}px` }}>

            </div>
        )
    }

    const getInternalRomboForEnd = (): React.ReactNode => {
        return (
            <div className={styles.internalRombo}
                onClick={() => handleOnClick(props.treeItem)}
                style={{ marginLeft: `${getMarginLeftForDuedate()}px` }}>

            </div>
        )
    }

    const getLabelForRomboEndDate = (): React.ReactNode => {
        let date = duedateOf(props.treeItem);
        date = (date && typeof date === 'string' && date.length > 10) ? date.substring(0, 10) : date;
        const labelColor: string = isDuedateExpiredAndInprogress(props.treeItem) ? 'red' : 'grey';
        return (
            <label className={styles.labelDate}
                style={{ left: `${getMarginLeftForDuedate() + 12}px`, color: `${labelColor}` }}>
                {date}</label>

        )
    }

    return (
        <>
            <div className={styles.bar} style={{ height: '20px' }}>
                {getLabelStartDate()}
                {getLabelEndDate()}
                {(hasDuedate(props.treeItem) && hasStartdate(props.treeItem)) && getInternalBar()}
                {(hasDuedate(props.treeItem) && !hasStartdate(props.treeItem)) &&
                    <>
                        {getInternalRomboForEnd()}
                        {getLabelForRomboEndDate()}
                    </>}
                {(!hasDuedate(props.treeItem) && hasStartdate(props.treeItem)) && getInternalRomboForStart()}

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
import React, { useState } from 'react'
import { IssueTreeNodeType, TreeToggleType } from '../../../domain/model/tree-types';
//className={styles.inputTextField}
import styles from './roadmap.module.css';
import { getDaysBetweenTwoDates } from '../../../domain/helper/date.helper';
import { QuartersType } from '../../../domain/model/quarter-types';

interface IProps {
    timelineData: QuartersType;
    onClick: (item: IssueTreeNodeType) => void;
    treeItem: IssueTreeNodeType;
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

const RoadmapItem: React.FC<IProps> = (props: IProps) => {

    const handleClickOpen = () => {
        const newToggles = { ...props.toggles, [props.treeItem.key]: !props.toggles[props.treeItem.key] };
        props.togglesChange(newToggles);
    }

    const handleOnClick = (item: IssueTreeNodeType) => {
        props.onClick(item);
    }


    const getMarginLeft = () => {
        const startdate: string = props.treeItem?.fields?.customfield_10015;
        if (!startdate || startdate === undefined  || startdate ==='') {
            return 0;
        }
        const days: number = getDaysBetweenTwoDates(props.timelineData.firstDate, new Date(startdate));
        console.log('***DAYS>:', days);
        return days * 2;
    }

    const getBarWidth = () => {
        const startdate: string = props.treeItem?.fields?.customfield_10015;
        if (!startdate || startdate === undefined  || startdate ==='') {
            return 0;
        }
        const duedate = props.treeItem?.fields?.duedate;
        if (!duedate || duedate === undefined  || duedate ==='') {
            return 0;
        }
        const days: number = getDaysBetweenTwoDates(new Date(startdate), new Date(duedate));
        console.log('***DAYS>:', days);
        return days * 2;
    }

    const isOpen = (): boolean => {
        return props.toggles[props.treeItem.key];
    }

    return (
        <>
            <div className={styles.bar} style={{ height: '20px' }}>
                <div className={styles.internalBar}
                    style={{ marginLeft: `${getMarginLeft()}px`, width: `${getBarWidth()}px` }}>
                    {props.treeItem.key}
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
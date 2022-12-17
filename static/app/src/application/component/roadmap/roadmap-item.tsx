import React, { useState } from 'react'
import { IssueTreeNodeType, TreeToggleType } from '../../../domain/model/tree-types';
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
//className={styles.inputTextField}
import styles from './roadmap.module.css';

interface IProps {
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


    const isOpen = (): boolean => {
        //console.log(`toggles[${treeItem.key}]: `, toggles[treeItem.key]);
        return props.toggles[props.treeItem.key];
    }

    return (
        <>
            <div className={styles.bar} style={{height: '20px'}}>
                <div className={styles.internalBar}>
                    {props.treeItem.key}
                </div>
            </div>
            {isOpen() &&
                props.treeItem?.childrens?.map(
                    (item, index) => {
                        return (
                            <RoadmapItem 
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
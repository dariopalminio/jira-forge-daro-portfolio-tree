import React, { useState } from 'react'
import { IssueItemType, TreeToggleType } from '../../../domain/model/issue-item.type';
import styles from './tree-item.module.css';
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
//className={styles.inputTextField}


interface IProps {
    level: number;
    onClick: (item: IssueItemType) => void;
    treeItem: IssueItemType;
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

const TreeItem: React.FC<IProps> = ({ level, treeItem, onClick, toggles, togglesChange }) => {

    const handleClickOpen = () => {
        const newToggles = { ...toggles, [treeItem.key]: !toggles[treeItem.key] };
        togglesChange(newToggles);
    }

    const handleOnClickSubMenuItem = (item: IssueItemType) => {
        onClick(item);
    }

    const handleOnClickAnchorLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        onClick(treeItem);
    }

    const getPaddingLeft = (): string => {
        //padding: 12px 0px 15px ${props => (props.level * 15).toString()}px;
        return (level * 15).toString() + 'px';
    }

    const isOpen = (): boolean => {
        console.log(`toggles[${treeItem.key}]: `, toggles[treeItem.key]);
        return toggles[treeItem.key];
    }

    return (
        <ul className={styles.treeItemContainer}>
            <li className={styles.treeItem}
                style={{ marginLeft: getPaddingLeft() }}>
                {treeItem?.hasChildren ? (
                    <div className={styles.toggleSelector}
                        onClick={() => handleClickOpen()}>
                        {isOpen() ?
                            <RiArrowDownSLine size={15} color="#a6a6a6" /> :
                            <RiArrowRightSLine size={15} color="#a6a6a6" />}
                    </div>
                ) : <label style={{marginLeft: "15px"}}/>
                }

                <a className={styles.anchorLink} href="#"
                    onClick={(e) => handleOnClickAnchorLink(e)}>
                    <img src={treeItem.iconUrl} alt="" />
                    <div className={styles.treeItemTextLine} >
                        <span style={{ color: "blue" }}>{treeItem.key}</span>
                        &nbsp;
                        <span>{treeItem.summary}</span> </div>


                </a>
            </li>
            {isOpen() &&
                treeItem?.childrens?.map(
                    (item, index) => {
                        return (
                            <TreeItem
                                key={index}
                                level={level + 1}
                                treeItem={item}
                                togglesChange={togglesChange}
                                toggles={toggles}
                                onClick={(item) => handleOnClickSubMenuItem(item)} />
                        );
                    }
                )
            }
        </ul>
    )
}

export default TreeItem
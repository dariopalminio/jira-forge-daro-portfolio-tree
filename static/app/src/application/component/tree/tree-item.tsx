import React, { useState } from 'react'
import { IssueTreeNodeType, TreeToggleType } from '../../../domain/model/tree-types';
import styles from './tree-item.module.css';
import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri";
import imgError from "./item-no-image.png"
import StatusCell from '../table/cells/status-cell';
import useIssueHook from '../../../domain/hook/issue-hook';
import Progress from '../../common/progress/progress';
//className={styles.inputTextField}


interface IProps {
    level: number;
    onClick: (item: IssueTreeNodeType) => void;
    treeItem: IssueTreeNodeType;
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

/**
 * TreeItem component
 */
const TreeItem: React.FC<IProps> = ({ level, treeItem, onClick, toggles, togglesChange }) => {
    const { issueTypeNameOf, getChildrenProgressCount } = useIssueHook();

    const handleClickOpen = () => {
        const newToggles = { ...toggles, [treeItem.key]: !toggles[treeItem.key] };
        togglesChange(newToggles);
    }

    const handleOnClick = (item: IssueTreeNodeType) => {
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
        //console.log(`toggles[${treeItem.key}]: `, toggles[treeItem.key]);
        return toggles[treeItem.key];
    }

    return (
        <span className={styles.treeItemContainer} style={{ height: '20px' }}>
            <span className={styles.treeItem}
                style={{ marginLeft: getPaddingLeft() }}>
                {treeItem?.hasChildren ? (
                    <div className={styles.toggleSelector}
                        onClick={() => handleClickOpen()}>
                        {isOpen() ?
                            <RiArrowDownSLine size={15} color="#a6a6a6" /> :
                            <RiArrowRightSLine size={15} color="#a6a6a6" />}
                    </div>
                ) : <label style={{ marginLeft: "15px" }} />
                }
                <a className={styles.anchorLink} href="#"
                    onClick={(e) => handleOnClickAnchorLink(e)} >
                    <img className={styles.treeItemImg}
                        src={treeItem.iconUrl}
                        onError={(e) => {
                            e.currentTarget.src = imgError
                        }}
                        alt="" height="16" width="16" />
                    <span className={styles.treeItemTextLine}>
                        <span className={styles.textKey}>
                            {issueTypeNameOf(treeItem)}
                        </span>
                        &nbsp;
                        <span className={styles.textKey}>
                            {`${treeItem.key}:`}
                        </span>
                        &nbsp;
                        <span className={styles.textSummary} >
                            {treeItem.summary}
                        </span>
                        &nbsp;
                        <div style={{ display: 'inline-block' }} >
                            <StatusCell item={treeItem} />
                        </div>
                        &nbsp;
                        <Progress progress={getChildrenProgressCount(treeItem)} 
                    />
                    </span>
                </a>

            </span>
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
                                onClick={(item) => handleOnClick(item)} />
                        );
                    }
                )
            }
        </span>
    )
}

export default TreeItem
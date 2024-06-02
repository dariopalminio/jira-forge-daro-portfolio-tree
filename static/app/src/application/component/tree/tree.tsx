import React, { useState } from 'react'
import { IssueTreeNodeType, TreeToggleType } from '../../../domain/model/tree-types';
import Button from '../../common/button/button';
import TreeItem from './tree-item';
import styles from './tree-item.module.css';
import { StatusFilterType } from '../../../domain/model/status-filter-type';

interface IProps {
    expandAllLabel: string;
    collapseAllLabel: string;
    onClick: (item: IssueTreeNodeType) => void;
    tree: IssueTreeNodeType;
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
    filter: StatusFilterType;
}

/**
 * Tree component
 */
const Tree: React.FC<IProps> = ({ expandAllLabel, collapseAllLabel, tree, onClick, toggles, togglesChange, filter }) => {


    const handleOnClickLink = (item: IssueTreeNodeType) => {
        onClick(item);
    }

    return (
        <div className={styles.treeContainer}>
            {tree?.childrens?.map((item, index) => {
                return (
                    <TreeItem
                        key={index}
                        level={0}
                        toggles={toggles}
                        togglesChange={togglesChange}
                        treeItem={item}
                        filter={filter}
                        onClick={(item) => handleOnClickLink(item)} />
                );
            })}
        </div>
    )
}

export default Tree;
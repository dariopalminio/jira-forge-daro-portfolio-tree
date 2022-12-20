import React, { useState } from 'react'
import { IssueTreeNodeType, TreeToggleType } from '../../../domain/model/tree-types';
import Button from '../../common/button/button';
import TreeItem from './tree-item';
import styles from './tree-item.module.css';

interface IProps {
    expandAllLabel: string;
    collapseAllLabel: string;
    onClick: (item: IssueTreeNodeType) => void;
    tree: IssueTreeNodeType;
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

const Tree: React.FC<IProps> = ({ expandAllLabel, collapseAllLabel, tree, onClick, toggles, togglesChange }) => {


    const handleOnClickLink = (item: IssueTreeNodeType) => {
        onClick(item);
    }

    const expand = () => {
        let togg: TreeToggleType = {};
        for (var key in toggles) {
            togg[`${key}`] = true;
        }
        togglesChange({ ...togg });
    }

    const collapse = () => {
        let togg: TreeToggleType = {};
        for (var key in toggles) {
            togg[`${key}`] = false;
        }
        togglesChange({ ...togg });
    }

    return (
        <div className={styles.treeContainer}>

            <div className={styles.treeHeader}>

                <Button styleType={"secondary"}
                    style={{ height: "15px", marginTop: '2px', fontSize: '10px', float: 'left' }}
                    onClick={() => expand()}>
                    {expandAllLabel}
                </Button>
                <Button styleType={"secondary"}
                    style={{ height: "15px", marginTop: '2px', marginLeft: '2px', fontSize: '10px', float: 'left' }}
                    onClick={() => collapse()}>
                    {collapseAllLabel}
                </Button>

            </div>
            {tree?.childrens?.map((item, index) => {
                return (
                    <TreeItem
                        key={index}
                        level={0}
                        toggles={toggles}
                        togglesChange={togglesChange}
                        treeItem={item}
                        onClick={(item) => handleOnClickLink(item)} />
                );
            })}
        </div>
    )
}

export default Tree;
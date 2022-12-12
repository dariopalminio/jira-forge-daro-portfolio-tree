import React, { useState } from 'react'
import { IssueItemType, TreeToggleType } from '../../../domain/model/tree-types';
import Checkbox from '../../common/checkbox/checkbox';
import RadioButton from '../../common/radio/radio-button';
import RadioButtonGroup from '../../common/radio/radio-button-group';
import TreeItem from './tree-item';
import styles from './tree-item.module.css';

interface Props {
    expandAllLabel: string;
    collapseAllLabel: string;
    onClick: (item: IssueItemType) => void;
    tree: IssueItemType[];
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

const Tree: React.FC<Props> = ({ expandAllLabel, collapseAllLabel, tree, onClick, toggles, togglesChange }) => {


    const handleOnClickLink = (item: IssueItemType) => {
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
                <RadioButtonGroup style={{ display: 'inline-block', marginLeft: '5px' }}>
                    <RadioButton id={'expand'} label={expandAllLabel} groupName={'tree'} onClick={() => expand()} />
                    <RadioButton id={'collaps'} label={collapseAllLabel} groupName={'tree'} onClick={() => collapse()} />
                </RadioButtonGroup>
            </div>
            {tree?.map((item, index) => {
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
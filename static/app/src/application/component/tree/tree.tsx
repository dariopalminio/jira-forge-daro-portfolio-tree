import React from 'react'
import { IssueItemType, TreeToggleType } from '../../../domain/model/tree-types';
import TreeItem from './tree-item';
import styles from './tree-item.module.css';

interface Props {
    title: string;
    onClick: (item: IssueItemType) => void;
    tree: IssueItemType[];
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

const Tree: React.FC<Props> = ({ title, tree, onClick, toggles, togglesChange }) => {

    const handleOnClickLink = (item: IssueItemType) => {
        onClick(item);
    }

    return (
        <div className={styles.treeContainer}>
            <label className={styles.treeHead}>{title}</label>
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
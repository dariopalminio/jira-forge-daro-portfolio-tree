import React from 'react'
import { IssueItemType, TreeToggleType } from '../../../domain/model/issue-item.type';
import TreeItem from './tree-item';

interface Props {
    onClick: (item: IssueItemType) => void;
    list: IssueItemType[];
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
}

const Tree: React.FC<Props> = ({ list, onClick, toggles, togglesChange }) => {

    const handleOnClickLink = (item: IssueItemType) => {
        onClick(item);
    }

    return (
        <div style={{width:"5000px"}}>
            {list?.map((item, index) => {
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
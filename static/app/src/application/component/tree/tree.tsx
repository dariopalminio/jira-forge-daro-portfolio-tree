import React from 'react'
import { IssueItemType } from '../../../domain/model/issue-item.type';
import TreeItem from './tree-item';

interface Props {
    onClick: (item: IssueItemType) => void;
    list: IssueItemType[];
    isOpenSidebar?: boolean; 
}

const Tree: React.FC<Props> = ({ list, onClick, isOpenSidebar=true }) => {

    const handleOnClickLink = (item: IssueItemType) => {
        onClick(item);
    }

    return (
        <div>
            {list?.map((item, index) => {
                return (
                    <TreeItem 
                    key={index} 
                    level={0}
                    isOpenSidebar={isOpenSidebar}
                    menuItem={item} 
                    onClick={(item) => handleOnClickLink(item)} />
                );
            })}
        </div>
    )
}

export default Tree;
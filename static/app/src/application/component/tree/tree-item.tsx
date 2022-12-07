import React, { useState } from 'react'
import { IssueItemType } from '../../../domain/model/issue-item.type';
import styles from './tree-item.module.css';
//className={styles.inputTextField}


interface IProps {
    level: number;
    onClick: (item: IssueItemType) => void;
    menuItem: IssueItemType;
    isOpenSidebar?: boolean;
}

const TreeItem: React.FC<IProps> = ({ level, menuItem, onClick, isOpenSidebar }) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        if (menuItem?.hasChildren) setOpen(!open)
        else onClick(menuItem);
        onClick(menuItem);
    }

    const handleOnClickSubMenuItem = (item: IssueItemType) => {
        onClick(item);
    }

    const handleOnClickAnchorLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
    }

    const getPaddingLeft = (): string => {
        //padding: 12px 0px 15px ${props => (props.level * 15).toString()}px;
        return (level * 15).toString()+'px';
    }

    return (
        <ul className={styles.treeItemContainer}>
            <li className={styles.treeItem}
                onClick={() => handleClickOpen()}
                style={{ marginLeft: getPaddingLeft() }}>
                <a className={styles.anchorLink} href="#" onClick={(e) => handleOnClickAnchorLink(e)}>
                    {<img src={menuItem.iconUrl} alt="" />}&nbsp;
                    {isOpenSidebar ? menuItem.summary : null}
                </a>
            </li>
            {open &&
                menuItem?.childrens?.map(
                    (item, index) => {
                        return (
                            <TreeItem
                                key={index}
                                level={level + 1}
                                isOpenSidebar={isOpenSidebar}
                                menuItem={item}
                                onClick={(item) => handleOnClickSubMenuItem(item)} />
                        );
                    }
                )
            }
        </ul>
    )
}

export default TreeItem
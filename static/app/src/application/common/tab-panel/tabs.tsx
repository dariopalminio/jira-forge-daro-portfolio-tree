import React, { useState } from "react";
import styles from './tabs.module.css';
import { TabsType } from "./types";


interface IProps {
    idTabSelected: string;
    onClick: (idTab: string) => void;
    tabs: TabsType;
}

const Tabs: React.FC<IProps> = (props: IProps) => {

    const getClassIfCurrent = (id: string) => {
        if (id === props.idTabSelected) {
            return styles.current;
        }
        return '';
    }

    const handleClick = (idTab: string) => {
        props.onClick(idTab);
    }

    return (
        <div className={styles.container}>
            <ul className={styles.tabs}>
                {props.tabs.map((item, index) => {
                    return (
                        <li key={index+item.id}
                            className={`${styles.tabLink} ${getClassIfCurrent(item.id)}`}
                            onClick={() => handleClick(item.id)}>
                            {item.text}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Tabs;
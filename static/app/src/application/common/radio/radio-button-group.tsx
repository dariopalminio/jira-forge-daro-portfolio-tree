import React from "react";
import styles from './radio-button.module.css';

export type CheckboxType = {
    label: string;
    checked: boolean;
};

interface IProps {
    children?: React.ReactNode;
    style?: any;
}

const RadioButtonGroup: React.FC<IProps> = (props: IProps) => {

    return (
        <div className={styles.radioButton} style={props.style? props.style : {}}>
            {props.children}
        </div>
    );
};

export default RadioButtonGroup;
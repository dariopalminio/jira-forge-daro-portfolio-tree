import React from "react";
import styles from './radio-button.module.css';

export type CheckboxType = {
    label: string;
    checked: boolean;
};

interface IProps {
    id: string;
    label: string;
    groupName: string;
    onClick?: () => void;
}

const RadioButton: React.FC<IProps> = (props: IProps) => {

    return (
        <div className={styles.radioButtonWraper}>
            <input type="radio"
                id={`radioButtonId${props.id}`}
                name={props.groupName} 
                onClick={props.onClick}/>
            <label htmlFor={`radioButtonId${props.id}`}>
                {props.label}
            </label>
        </div>
    );
};

export default RadioButton;
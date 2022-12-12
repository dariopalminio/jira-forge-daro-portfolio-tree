import React from "react";
import styles from './checkbox.module.css';

export type CheckboxType = {
    label: string;
    checked: boolean;
};

interface IProps {
    id: string;
    item: CheckboxType;
    toggle: () => void;
    disabled?: boolean;
}

const Checkbox: React.FC<IProps> = (props: IProps) => {

    return (
        <>
            {props.disabled && (
                <p></p>
            )}

            {(!props.disabled) && (
                <>
                    <input className={styles.checkboxInput}
                        id={`checkboxInputId${props.id}`}
                        name={`checkboxInputId${props.id}`}
                        type="checkbox"
                        onClick={props.toggle} 
                        checked={props.item.checked}
                        />

                        <label htmlFor={`checkboxInputId${props.id}`}>
                            {props.item.label}
                        </label>
                </>
            )}

        </>
    );
};

export default Checkbox;
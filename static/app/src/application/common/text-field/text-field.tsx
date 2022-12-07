import React from "react";
import styles from './text-field.module.css';

interface IMyProps {
    id: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    type?: "password" | "text" | undefined;
    error?: boolean;
    helperText?: string;
    multiline?: boolean;
    style?: any;
    readonly?: boolean;
}

/**
 * TextField "password" | "text"
 * Stateless components, extensible Style and controlled component
 */
export const TextField: React.FC<IMyProps> = (props: IMyProps) => {

    const getType = () => {
        return  props.type ?  props.type : "text";
    }

    const getClassName = () => {
        //return props.error ? "input-text-field-group error-text-field" : "input-text-field-group";
        return props.error ? `${styles.inputTextFieldGroup} ${styles.errorTextField}` : `${styles.inputTextFieldGroup}`;
    }

    return (
 
            <div className={getClassName()}>
                {! props.multiline && (
                    <input className={styles.inputTextField} id={ props.id} name={ props.id}
                        type={getType()}
                        placeholder={ props.placeholder ?  props.placeholder : ''}
                        defaultValue={ props.value}
                        onChange={(e) =>  props.onChange(e)}
                        style={ props.style ?  props.style : {}}
                        readOnly={ props.readonly} />)}
                { props.multiline && (
                    <textarea className={styles.inputTextField} id={ props.id} name={ props.id}
                        style={ props.style ?  props.style : { width: "98%", height: "100px" }}
                        defaultValue={ props.value}
                        onChange={(e) =>  props.onChange(e)} />)}

                <div className={styles.errorMessage}>{ props.helperText}</div>
            </div>
      
    );
};

export default TextField;

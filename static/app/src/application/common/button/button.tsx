import React from "react";
import styles from './button.module.css';


interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean,
    styleType?: "primary" | "secondary" ;
    style?: any;
}

/**
 * Customized button
 * controlled component
 */
const Button: React.FC<Props> = ({ children, onClick, type, disabled, styleType, style }) => {

    const getStyleType = () => {
        if (!styleType || styleType === undefined || styleType === null) {
            return 'primary';
        }
        const st = styleType ? styleType : "primary";
        return st;
    }

    return (
        <>
            {disabled && (
                <button className={getStyleType() === 'primary' ? styles.buttonPrimary : styles.buttonSecondary} 
                style={ style ?  style : {}}
                disabled>
                    {children}
                </button>
            )}

            {(!disabled && type) && (
                <button className={getStyleType() === 'primary' ? styles.buttonPrimary : styles.buttonSecondary}
                    onClick={onClick}
                    type={type}
                    style={ style ?  style : {}}
                >
                    {children}
                </button>
            )}

            {(!disabled && !type) && (
                <button className={getStyleType() === 'primary' ? styles.buttonPrimary : styles.buttonSecondary}
                    onClick={onClick}
                    style={ style ?  style : {}}
                >
                    {children}
                </button>
            )}
        </>
    );
};

export default Button;
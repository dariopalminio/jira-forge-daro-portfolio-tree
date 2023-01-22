import React from "react";
import styles from './button.module.css';


interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean,
    styleType?: "primary" | "secondary" | "neutro";
    style?: any;
}

/**
 * Customized button
 * controlled component
 */
const Button: React.FC<Props> = ({ children, onClick, type, disabled, styleType, style }) => {

    const getStyleType = (): string => {
        if (!styleType || styleType === undefined || styleType === null) {
            return 'primary';
        }
        const st = styleType ? styleType : "primary";
        return st;
    }

    const getClassName = () => {
        switch (getStyleType()) {
            case 'primary':{
                return styles.buttonPrimary;
            }
            case 'secondary': {
                return styles.buttonSecondary;
            }
            default: {
                return styles.buttonNeutro;
            }
        }
    }

    return (
        <>
            {disabled && (
                <button className={getClassName()}
                    style={style ? style : {}}
                    disabled>
                    {children}
                </button>
            )}

            {(!disabled && type) && (
                <button className={getClassName()}
                    onClick={onClick}
                    type={type}
                    style={style ? style : {}}
                >
                    {children}
                </button>
            )}

            {(!disabled && !type) && (
                <button className={getClassName()}
                    onClick={onClick}
                    style={style ? style : {}}
                >
                    {children}
                </button>
            )}
        </>
    );
};

export default Button;
import React from "react";
import styles from './alert.module.css';

interface Props {
    children?: React.ReactNode;
    severity?: "info" | "error" | "warning" | "success" | undefined;
}

/**
 * Customized alert
 * Stateless components
 */
const Alert: React.FC<Props> = ({ severity, children }) => {

    const getId = () => {
        return severity ? 'alert-box-' + severity : 'alert-box-';
    }

    const handlerClick = (event: React.MouseEvent<HTMLElement>) => {
        const elementId = getId();
        let popup: HTMLElement | null = document.getElementById(elementId);
        if (popup != null) {
            if (popup.style.display === "none") {
                popup.style.setProperty('display', 'block', 'important');
            } else {
                popup.style.setProperty('display', 'none', 'important');
            }
        }
        event.stopPropagation();
    };

    const getBackgroundBySeverity = () => {
        switch (severity) {
            case 'success':
                return '#12DBAD';
            case 'error':
                return '#FB5F57';
            case 'info':
                return '#81C1DF';
            case 'warning':
                return '#EBC60C';
            default:
                return '#42bdff';
        }
    };

    return (
        <div id={getId()} className={styles.alertBox} style={{ backgroundColor: getBackgroundBySeverity() }}>
            <span className={styles.alertCloseButton} onClick={(event) => handlerClick(event)}>&times;</span>
            {children}
        </div>
    );
};

export default Alert;

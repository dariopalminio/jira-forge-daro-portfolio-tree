import React from "react";
import styles from './splitable-container.module.css';


interface IProps {
    id?: string;
    children?: React.ReactNode;
    style?: any;
}

/**
 * Customized button
 * Stateless components and controlled component
 */
const SplitLeft: React.FC<IProps> = (props: IProps) => {

    return (
        <div className={styles.containerSplitLeft}
            id={`${props.id ? props.id : ''}split__left`}
            style={props.style || {}}>
            {props.children}
        </div>
    );
};

export default SplitLeft;
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
const SplitRight: React.FC<IProps> = (props: IProps) => {

    return (
        <div className={styles.containerSplitRight}
            id={`${props.id ? props.id : ''}split__right`}
            style={props.style || {}}>
            {props.children}
        </div>
    );
};

export default SplitRight;
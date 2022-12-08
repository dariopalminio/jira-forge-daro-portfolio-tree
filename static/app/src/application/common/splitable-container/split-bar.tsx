import React from "react";
import styles from './splitable-container.module.css';

interface IProps {
    id?: string;
}

/**
 * Customized button
 * Stateless components and controlled component
 */
const SplitBar: React.FC<IProps> = (props: IProps) => {

    return (
        <div className={styles.internalSplitBar}
            id={`${props.id ? props.id : ''}split__bar`} />
    );
};

export default SplitBar;
import React from "react";
import styles from './loading.module.css';


interface IProps {
    children?: React.ReactNode;
    progress: number;
}

/**
 * Customized button
 * controlled component
 */
const Loading: React.FC<IProps> = (props: IProps) => {


    return (
        <div className={styles.progressContainer}>
            <label>Progress...</label>
            <div className={`${styles.progress} ${styles.progressDanger} ${styles.progressStriped} ${styles.active}`}>
                <div className={styles.bar}
                    style={{ width: `${props.progress.toString()}%` }}></div>
            </div>
        </div>
    );
};

export default Loading;
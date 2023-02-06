import React from "react";
import styles from './progress.module.css';

/**
        let progress = {
            todo: 0,
            inprogress: 0,
            done: 0
        };
 */

interface IProps {
    progress: any;
}

const Progress: React.FC<IProps> = (props: IProps) => {

    const getTodoPercentage = (): string => {
        const total = props.progress.inprogress + props.progress.done + props.progress.todo;
        const todoPercentage = ((props.progress.todo) / total) * 100;
        return todoPercentage.toString();
    }

    const getWithInprogressPercentage = (): string => {
        const total = props.progress.inprogress + props.progress.done + props.progress.todo;
        const inprogressPercentage = ((props.progress.inprogress + props.progress.done) / total) * 100;
        return inprogressPercentage.toString();
    }

    const getInprogressPercentage = (): string => {
        const total = props.progress.inprogress + props.progress.done + props.progress.todo;
        const inprogressPercentage = (props.progress.inprogress / total) * 100;
        return inprogressPercentage.toString();
    }

    const getDonePercentage = (): string => {
        const total = props.progress.inprogress + props.progress.done + props.progress.todo;
        const donePercentage = ((props.progress.done) / total) * 100;
        return donePercentage.toString();
    }

    const isEmpty = () => {
        return (props.progress.todo + props.progress.inprogress + props.progress.done) === 0;
    }

    return (
        <div className={styles.progress}>
            {!isEmpty() && (
                <>
                    {(props.progress.todo !== 0) &&
                        <div className={`${styles.bar} ${styles.todo}`}
                            style={{ width: `100%` }}>
                            
                        </div>
                    }

                    {(props.progress.inprogress !== 0) &&
                        <div className={`${styles.bar} ${styles.inprogress}`}
                            style={{ width: `${getWithInprogressPercentage()}%` }}>
                            {getInprogressPercentage() + '%'}
                        </div>
                    }

                    {(props.progress.done !== 0) &&
                        <div className={`${styles.bar} ${styles.done}`}
                            style={{ width: `${getDonePercentage()}%` }}>
                            {getDonePercentage() + '%'}
                        </div>
                    }
                </>
            )
            }
        </div>
    );
};

export default Progress;
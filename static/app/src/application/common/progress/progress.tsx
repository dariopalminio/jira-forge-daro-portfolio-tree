import React from "react";
import styles from './progress.module.css';

interface IProps {
    progress: any; //type ProgressType = {todo: number; inprogress: number; done: number;};
}

/**
 * Progress bar component with three states: todo, inprogress and done.
 */
const Progress: React.FC<IProps> = (props: IProps) => {

    const getWithInprogressPercentage = (): string => {
        const total = props.progress.inprogress + props.progress.done + props.progress.todo;
        const inprogressPercentage = ((props.progress.inprogress + props.progress.done) / total) * 100;
        return inprogressPercentage.toFixed(0).toString();
    }

    const getInprogressPercentage = (): string => {
        const total = props.progress.inprogress + props.progress.done + props.progress.todo;
        const inprogressPercentage = (props.progress.inprogress / total) * 100;
        return inprogressPercentage.toFixed(0).toString();
    }

    const getDonePercentage = (): string => {
        const total = props.progress.inprogress + props.progress.done + props.progress.todo;
        const donePercentage = ((props.progress.done) / total) * 100;
        return donePercentage.toFixed(0).toString();
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
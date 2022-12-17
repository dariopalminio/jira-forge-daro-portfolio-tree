import React from "react";
import { getQuarters, QuartersType } from "../../../domain/helper/quarter.helper";
import styles from './roadmap.module.css';


interface IProps {
    children?: React.ReactNode;
    quarters: QuartersType;
}

/**
 * 
 */
const TimeLine: React.FC<IProps> = (props: IProps) => {


    const getQuarters = (): React.ReactNode => {
        const quartes = [];
        for (const [key, value] of Object.entries(props.quarters)) {
            quartes.push(key);
        }

        return (
            <div className={styles.timeline}>
                {quartes?.map((item, index) => {
                    return (
                        <div className={styles.quarterTimeBlock}>
                            <span className={styles.quarterText}>{item}</span>
                        </div>
                    );
                })}
            </div>
        )

    }

    const getMonths = (): React.ReactNode => {
        const months = [];
        for (const [key, value] of Object.entries(props.quarters)) {
            for (let i = 0; i < value.length; i++) {
                months.push(value[i].month);
            }
        }

        return (
            <div className={styles.timeline}>
                {months?.map((item, index) => {
                    return (
                        <div className={styles.monthTimeBlock}>
                            <span className={styles.monthText}>{item}</span>
                        </div>
                    );
                })}
            </div>
        )

    }

    return (
        <>
            {getQuarters()}
            {getMonths()}
        </>
    );
};

export default TimeLine;
import React from "react";
import { getQuarters, QuartersType } from "../../../domain/helper/quarter.helper";
import styles from './roadmap.module.css';


interface IProps {
    children?: React.ReactNode;
    quarters: QuartersType;
    monthWidth: number;
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
                        <div className={styles.quarterTimeBlock} style={{width: `${((props.monthWidth * 3)-1)}px`}} >
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
                        <div className={styles.monthTimeBlock} style={{width: `${props.monthWidth}`}}>
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
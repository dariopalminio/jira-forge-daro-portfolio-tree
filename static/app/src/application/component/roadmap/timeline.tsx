import React from "react";
import { QuartersType } from "../../../domain/model/quarter-types";
import styles from './roadmap.module.css';


interface IProps {
    children?: React.ReactNode;
    quarters: QuartersType;
    monthWidth: number;
}

/**
 * TimeLine component
 */
const TimeLine: React.FC<IProps> = (props: IProps) => {


    const getQuarters = (): React.ReactNode => {
        const quartesReactNode = [];
        for (const [key, value] of Object.entries(props.quarters.data)) {
            let qdays: number = 0;
            for (let i = 0; i < value.length; i++) {
                qdays += value[i].days;
            }
            quartesReactNode.push(
                <div key={'quarter_' + key} className={styles.quarterTimeBlock} 
                    style={{ width: `${((qdays * 2) -1)}px` }} >
                    <span className={styles.quarterText}>{key}</span>
                </div>
            );
        }

        return (
            quartesReactNode
        )

    }

    const getMonths = (): React.ReactNode => {
        const monthsReactNode = [];
        for (const [key, value] of Object.entries(props.quarters.data)) {
            for (let i = 0; i < value.length; i++) {
                monthsReactNode.push(
                    <div key={'month_' + key + '_i_' + i} className={styles.monthTimeBlock} 
                        style={{ width: `${(value[i].days * 2)-1}px` }}>
                        <span className={styles.monthText}>{value[i].month}</span>
                    </div>
                );

            }
        }

        return (
            monthsReactNode
        );
    }

    return (
        <>
            <div className={styles.timeline}>
                {getQuarters()}
            </div>
            <div className={styles.timeline}>
                {getMonths()}
            </div>
        </>
    );
};

export default TimeLine;
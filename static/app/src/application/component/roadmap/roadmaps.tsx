import React from "react";
import { getQuarters, QuartersType } from "../../../domain/helper/quarter.helper";
import styles from './roadmap.module.css';
import TimeLine from "./timeline";


interface IProps {
    children?: React.ReactNode;
}

/**
 * 
 */
const Roadmaps: React.FC<IProps> = (props: IProps) => {


    const getQuartersData = (): QuartersType => {
        return getQuarters(new Date('2022-07-28'), new Date('2023-04-20'));
    }

    return (
        <div className={styles.roadmapsContainer}>
            <TimeLine quarters={getQuartersData()} />

            <div className={styles.schedule}>
                <div className={styles.column}>

                </div>

                <div className={styles.bar}>
                    test tile
                </div>

            </div>
        </div>
    );
};

export default Roadmaps;
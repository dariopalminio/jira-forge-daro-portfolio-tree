import React, { useState } from "react";
import { getDaysBetweenTwoDates } from "../../../domain/helper/date.helper";
import { getFirstDateFromQuarters, getLastDateFromQuarters, getQuarters, getQuartersCount, QuartersType } from "../../../domain/helper/quarter.helper";
import { IssueTreeNodeType, TreeToggleType } from "../../../domain/model/tree-types";
import RoadmapItem from "./roadmap-item";
import styles from './roadmap.module.css';
import TimeLine from "./timeline";


interface IProps {
    timelineData: QuartersType;
    children?: React.ReactNode;
    tree: IssueTreeNodeType;
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
    onClick: (item: IssueTreeNodeType) => void;
}

/**
 * 
 */
const Roadmaps: React.FC<IProps> = (props: IProps) => {
    const [monthWidth, setMonthWidth] = useState<number>(60); //represent pixels
    const [timeLineWidth, setTimeLineWidth] = useState<number>(5000); //represent pixels

    const handleOnClickLink = (item: IssueTreeNodeType) => {
        props.onClick(item);
    }


    const getScheduleColumns = (): React.ReactNode => {
        const quartes = [];
        for (const [key, value] of Object.entries(props.timelineData)) {
            quartes.push(key);
        }

        return (
            <>
                {quartes?.map((item, index) => {
                    return (
                        <div className={styles.column} 
                        style={{left: `${(((monthWidth) * 3))*index}px`, width: `${((monthWidth * 3)-1)}px`}} 
                        />
                    );
                })}
            </>
        )

    }

    return (
        <div className={styles.roadmapsContainer} style={{width: `${timeLineWidth}`}}>
            <TimeLine  monthWidth={monthWidth} quarters={props.timelineData} />

            <div className={styles.schedule}>
                {getScheduleColumns()}


                {
                    props.tree?.childrens?.map(
                        (item: any, index: number) => {
                            return (
                                <RoadmapItem
                                    key={index}
                                    toggles={props.toggles}
                                    togglesChange={props.togglesChange}
                                    treeItem={item}
                                    onClick={(item) => handleOnClickLink(item)} />
                            )
                        }
                    )
                }

            </div>
        </div>
    );
};

export default Roadmaps;
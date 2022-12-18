import React, { useState } from "react";
import { QuartersDictionaryType, QuartersType } from "../../../domain/helper/quarter.helper";
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
        const quartesReactNode = [];
        let qTotalDays: number = 0;
        for (const [key, value] of Object.entries(props.timelineData.data)) {
            let qdays: number = 0;
            for (let i = 0; i < value.length; i++) {
                qdays += value[i].days;
            }
            quartesReactNode.push(
                <div className={styles.column} 
                style={{ left: `${((qTotalDays * 2) )}px`, width: `${((qdays * 2) -1)}px` }}
                        />
            );
            qTotalDays += qdays;
        }
        return (
            quartesReactNode
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
                                    timelineData={props.timelineData}
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
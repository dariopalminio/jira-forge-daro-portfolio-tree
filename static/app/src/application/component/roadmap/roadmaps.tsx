import React, { useEffect, useState } from "react";
import { getDaysBetweenTwoDates } from "../../../domain/helper/date.helper";
import useRoadmaps from "../../../domain/hook/roadmaps-hook";
import { QuartersType } from "../../../domain/model/quarter-types";
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
 * Roadmaps Component
 */
const Roadmaps: React.FC<IProps> = (props: IProps) => {
    const [monthWidth, setMonthWidth] = useState<number>(60); //represent pixels
    const [timeLineWidth, setTimeLineWidth] = useState<number>(5000); //represent pixels
    const { getDaysFromFirstDateUntilTodate } = useRoadmaps();
    const zoomFactor: number = 2;

    const handleOnClickLink = (item: IssueTreeNodeType) => {
        props.onClick(item);
    }

    const getQuarterBackground = (key: string): string => {
        var lastChar = key.substring(key.length - 1);
        switch (lastChar) {
            case '1': {
                return '#F9FAEE'; //yellow
            }
            case '2': {
                return '#F2FEEE'; //green
            }
            case '3': {
                return '#EEF4F4'; //blue
            }
            case '4': {
                return '#EEEEF4'; //berry
            }
            default: {
                return 'white';
            }
        }
    }

    const getScheduleColumns = (): React.ReactNode => {
        const quartesReactNode = [];
        let qTotalDays: number = 0;
        for (const [key, value] of Object.entries(props.timelineData.data)) {

            let qdays: number = 0;
            for (let i = 0; i < value.length; i++) {
                qdays += value[i].days;
            }
            const colLeft = qTotalDays * zoomFactor;
            const colWidth = ((qdays * zoomFactor) - 1);
            quartesReactNode.push(
                <div className={styles.column}
                    style={{ left: `${colLeft}px`, width: `${colWidth}px`, background: getQuarterBackground(key) }}
                />
            );
            qTotalDays += qdays;
        }
        return (
            quartesReactNode
        )

    }

    const getDaysFromFirstDateUntilToDate = (): number => {
        if (!props.timelineData?.firstDate ||
            props.timelineData?.firstDate === null ||
            !(props.timelineData?.firstDate instanceof Date)) {
            return 0;
        }
        return getDaysFromFirstDateUntilTodate(props.timelineData.firstDate);
    }

    const getTodateColumnLine = (): React.ReactNode => {
        return (
            <div className={styles.todate}
                style={{ left: `${(getDaysFromFirstDateUntilToDate() * zoomFactor)}px`}}
            />
        );
    }

    return (
        <div className={styles.roadmapsContainer} style={{ width: `${timeLineWidth}` }}>
            <TimeLine monthWidth={monthWidth} quarters={props.timelineData} />

            <div className={styles.schedule}>

                {getScheduleColumns()}

                {getTodateColumnLine()}

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
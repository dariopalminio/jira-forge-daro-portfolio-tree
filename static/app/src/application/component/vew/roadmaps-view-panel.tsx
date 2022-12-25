import { useContext, useEffect, useState } from "react";
import { SplitableContainer, SplitLeft, SplitBar, SplitRight } from "../../common/splitable-container"
import { IColHeader, TableSelectable } from "../table";
import { IssueTreeNodeType, TreeToggleType } from "../../../domain/model/tree-types";
import PortfolioContext, { IPortfolioContext } from "../../../domain/context/portfolio-context";
import Roadmaps from "../roadmap/roadmaps";
import { useTranslation } from "react-i18next";
import { QuartersType } from "../../../domain/model/quarter-types";
import useRoadmaps from "../../../domain/hook/roadmaps-hook";


interface IProps {
    onClick: (item: IssueTreeNodeType) => void;
    headers: IColHeader[];
}

export const RoadmapViewPanel: React.FC<IProps> = (props: IProps) => {
    const { getExtremeDatesFromTree, getRoadmapsQuarters, quarters, setQuarters } = useRoadmaps();
    const { dataTree, setDataTree, toggles, setToggles } = useContext(PortfolioContext);
    const idSpliter = "RoadmapPanelView";
    const { t } = useTranslation();

    const getQuartersData = () => {
        const dates: any = getExtremeDatesFromTree(dataTree);
        const quartersData: QuartersType = getRoadmapsQuarters(dates.fromDate, dates.toDate);
        setQuarters(quartersData);
    }

    useEffect(() => {
        const getData = async () => {
            try {
                getQuartersData();
            } catch (error) {
                console.log(error);
            }
        }
        getData()
    }, []);

    const handlerToggleChange = (newToggles: TreeToggleType) => {
        setToggles(newToggles)
    }

    return (
        <>
            <SplitableContainer id={idSpliter} style={{ height: 'calc(100vh - 200px)' }}>
                <SplitLeft id={idSpliter}>
                    <div style={{ height: "20px", width: "5000px", background: "#F0F5F5", color: "grey", fontSize: "12px" }}>
                        {t('table.fields.title')}
                    </div>
                    <TableSelectable
                        headers={props.headers}
                        tree={dataTree}
                        toggles={toggles}
                        togglesChange={(newToggles: TreeToggleType) => handlerToggleChange(newToggles)}
                        onClick={(item: any) => alert(item.key)} />
                </SplitLeft>
                <SplitBar id={idSpliter}></SplitBar>
                <SplitRight id={idSpliter}>

                    <Roadmaps
                        timelineData={quarters}
                        tree={dataTree}
                        toggles={toggles}
                        togglesChange={(newToggles: TreeToggleType) => handlerToggleChange(newToggles)}
                        onClick={(item) => props.onClick(item)}
                    >

                    </Roadmaps>

                </SplitRight>
            </SplitableContainer>
        </>
    );
};

export default RoadmapViewPanel;

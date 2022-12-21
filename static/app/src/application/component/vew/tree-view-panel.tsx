import { useContext, useEffect, useState } from "react";
import { SplitableContainer, SplitLeft, SplitBar, SplitRight } from "../../common/splitable-container"
import { IColHeader, TableSelectable } from "../table";
import { IssueTreeNodeType, TreeToggleType } from "../../../domain/model/tree-types";
import PortfolioContext, { IPortfolioContext } from "../../../domain/context/portfolio-context";
import Roadmaps from "../roadmap/roadmaps";
import { useTranslation } from "react-i18next";
import { Tree } from "../tree";


interface IProps {
    onClick: (item: IssueTreeNodeType) => void;
    headers: IColHeader[];
}

export const TreeViewPanel: React.FC<IProps> = (props: IProps) => {

    const { dataTree, setDataTree, toggles, setToggles, configData } = useContext(PortfolioContext);
    const idSpliter = "TablePanelView";
    const { t } = useTranslation();


    const handlerToggleChange = (newToggles: TreeToggleType) => {
        setToggles(newToggles)
    }

    return (
        <>
            <div style={{ width: "5000px" }}>
                <div style={{ height: "20px", width: "5000px", background: "#F0F5F5", color: "grey", fontSize: "12px" }}>
                    {t('tree.list.title')}
                </div>
                <Tree
                    collapseAllLabel={t("collapse.all")}
                    expandAllLabel={t("expand.all")}
                    tree={dataTree}
                    toggles={toggles}
                    togglesChange={(newToggles: TreeToggleType) => handlerToggleChange(newToggles)}
                    onClick={(item) => props.onClick(item)} />
            </div>
        </>
    );
};

export default TreeViewPanel;
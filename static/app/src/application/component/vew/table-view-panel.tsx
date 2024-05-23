import { useContext, useEffect, useState } from "react";
import { SplitableContainer, SplitLeft, SplitBar, SplitRight } from "../../common/splitable-container"
import { IColHeader, TableSelectable } from "../table";
import { IssueTreeNodeType, TreeToggleType } from "../../../domain/model/tree-types";
import PortfolioContext from "../provider/portfolio-context";
import { useTranslation } from "react-i18next";
import { Tree } from "../tree";


interface IProps {
    onClick: (item: IssueTreeNodeType) => void;
    headers: IColHeader[];
}

export const TableViewPanel: React.FC<IProps> = (props: IProps) => {

    const { dataTree, setDataTree, toggles, setToggles } = useContext(PortfolioContext);
    const idSpliter = "TablePanelView";
    const { t } = useTranslation();


    const handlerToggleChange = (newToggles: TreeToggleType) => {
        setToggles(newToggles)
    }

    return (
        <>
            <TableSelectable
                headers={props.headers}
                tree={dataTree}
                toggles={toggles}
                togglesChange={(newToggles: TreeToggleType) => handlerToggleChange(newToggles)}
                onClick={(item) => props.onClick(item)} />
        </>
    );
};

export default TableViewPanel;
import { useContext, useState } from "react";
import { IColHeader } from "../table";
import { IssueTreeNodeType, TreeToggleType } from "../../../domain/model/tree-types";
import PortfolioContext from "../../provider/portfolio-tree-context";
import { useTranslation } from "react-i18next";
import { Tree } from "../tree";
import { StatusFilterType, defaultStatusFilter } from "../../../domain/model/status-filter-type";
import Button from "../../common/button/button";


interface IProps {
    onClick: (item: IssueTreeNodeType) => void;
    headers: IColHeader[];
    togglesChange: (newToggles: TreeToggleType) => void;
    toggles: TreeToggleType;
    tree: IssueTreeNodeType;
    filter: StatusFilterType;
}

export const TreeViewPanel: React.FC<IProps> = (props: IProps) => {

    //const { dataTree, toggles, setToggles } = useContext(PortfolioContext);
    const idSpliter = "TablePanelView";
    const { t } = useTranslation();

    return (
            <div style={{ width: "5000px" }}>
                <div style={{ height: "20px", width: "5000px", background: "#F0F5F5", color: "grey", fontSize: "12px" }}>
                    {t('tree.list.title')}
                </div>
                <Tree
                    collapseAllLabel={t("collapse.all")}
                    expandAllLabel={t("expand.all")}
                    tree={props.tree}
                    toggles={props.toggles}
                    togglesChange={props.togglesChange}
                    filter={props.filter}
                    onClick={(item) => props.onClick(item)} />
            </div>
    );
};

export default TreeViewPanel;
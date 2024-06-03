import React, { useContext, useEffect, useState } from "react";
import styles from './filter-panel.module.css';
import Button from "../../common/button/button";
import { useTranslation } from "react-i18next";
import { TreeToggleType } from "../../../domain/model/tree-types";
import { StatusFilterType, defaultStatusFilter } from "../../../domain/model/status-filter-type";
import CheckboxGroup from "../../common/checkbox/checkbox-group";
import { CheckboxType } from "../../common/checkbox/checkbox";

interface Props {
    toggles: TreeToggleType;
    onChangeToggles: (newToggles: TreeToggleType) => void;
    filter: StatusFilterType;
    onChangeFilter: (newStatusFilter: StatusFilterType) => void;
}

const FilterPanel: React.FC<Props> = ({ toggles, onChangeToggles, filter, onChangeFilter }) => {
    const { t } = useTranslation();
    const [outwardsCheckboxes, setOutwardsCheckboxes] = useState<CheckboxType[]>([]);

    const getOutwardsCkecboxes = (defaultFilter: string[], filterActual: string[]) => {
        let outwardsCk: CheckboxType[] = [];
        for (var i = 0; i < defaultFilter.length; i++) {
            const item: CheckboxType = {
                label: t(defaultFilter[i]),
                checked: filterActual?.includes(defaultFilter[i])
            }
            outwardsCk.push(item);
        }
        return [...outwardsCk];
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const filterActual: string[] = filter.statesToShow;
                const filterCk: CheckboxType[] = getOutwardsCkecboxes(defaultStatusFilter.statesToShow, filterActual);
                setOutwardsCheckboxes(filterCk);
            } catch (error) {
                console.error("Error by useEffect in ConfigStore UI component:", error);
            }
        }
        getData()
    }, []);

    const handlerToggleChange = (newToggles: TreeToggleType) => {
        onChangeToggles(newToggles)
    }

    const expand = () => {
        let togg: TreeToggleType = {};
        for (var key in toggles) {
            togg[`${key}`] = true;
        }
        handlerToggleChange({ ...togg });
    }

    const collapse = () => {
        let togg: TreeToggleType = {};
        for (var key in toggles) {
            togg[`${key}`] = false;
        }
        handlerToggleChange({ ...togg });
    }

    const handleOnChangeFilter = (checkboxesListEdited: CheckboxType[], index: number) => {
        //TODO
        let newArray: string[] = [];
        for (let index = 0; index < checkboxesListEdited.length; index++) {
            if (checkboxesListEdited[index].checked) {
                newArray.push(defaultStatusFilter.statesToShow[index]);
            }
        }
        const newFilter: StatusFilterType = {
            statesToShow: newArray
        };
        onChangeFilter(newFilter);
    }

    return (
        <div className={styles.filteringContainerPanel}>
            <div className={styles.expandPanel}>
                <Button
                    styleType="secondary"
                    style={{ height: '20px', marginTop: '6px', fontSize: '10px', float: 'left' }}
                    onClick={() => collapse()}
                >
                    {t("collapse.all")}
                </Button>

                <Button
                    styleType="secondary"
                    style={{ height: '20px', marginTop: '6px', marginLeft: '2px', fontSize: '10px', float: 'left' }}
                    onClick={() => expand()}
                >
                    {t("expand.all")}
                </Button>
            </div>

            <div className={styles.filterStatusPanel}>
                <label>
                    {t('filter.by')}:&nbsp;&nbsp;
                </label>
                <CheckboxGroup
                    checkboxesList={outwardsCheckboxes}
                    onChange={(checkboxesListEdited, index) => handleOnChangeFilter(checkboxesListEdited, index)}
                />
            </div>
        </div>
    );
};

export default FilterPanel;
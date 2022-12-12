import React from "react";
import Checkbox, { CheckboxType } from "./checkbox";
import styles from './checkbox.module.css';


interface IProps {
    checkboxesList: CheckboxType[];
    onChange: (checkboxesListEdited: CheckboxType[], index: number) => void;
}

const CheckboxGroup: React.FC<IProps> = (props: IProps) => {

    const handleToggle = (index: number) => {
        let chList: CheckboxType[] = props.checkboxesList;
        let ch: CheckboxType = props.checkboxesList[index];
        ch.checked = !ch.checked;
        chList[index] = ch;
        props.onChange([...chList], index);
    }

    return (
        <>
                {
                    props.checkboxesList.map((item: CheckboxType, index: number) => {
                        return (
                            <Checkbox id={'' + index}
                                key={index}
                                item={item}
                                toggle={() => handleToggle(index)} />
                        )
                    }
                    )}
        </>
    );
};

export default CheckboxGroup;
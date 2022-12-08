import React from "react";
import useSplitableContainer from "./splitable-container-hook";
import styles from './splitable-container.module.css';

interface IProps {
    id?: string;
    children?: React.ReactNode;
    style?: any;
}

/**
 * SplitableContainer
 * Compound component, Stateless components and controlled component
 * 
 * Example of use:
 *               <SplitableContainer id={"idSpliter"}>
 *                    <SplitLeft id={"idSpliter"} style={{ background: "#F0D9FA" }}>
 *                        Left
 *                   </SplitLeft>
 *                   <SplitBar id={"idSpliter"}></SplitBar>
 *                   <SplitRight id={"idSpliter"} style={{ background: "#F2FFCF" }}>
 *                       Right
 *                   </SplitRight>
 *                </SplitableContainer>
 *
 */
const SplitableContainer: React.FC<IProps> = (props: IProps) => {
    useSplitableContainer(props.id);

    return (
        <div className={styles.containerSplit}
            id={`${props.id ? props.id : ''}container__split`}
            style={props.style || {}}>
            {props.children}
        </div>
    );
};

export default SplitableContainer;
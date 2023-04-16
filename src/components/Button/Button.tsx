import React from 'react';
import { FilterValuesType } from "../TodoList/TodoList";
import styles from '../TodoList/TodoList.module.css'

type ButtonType = {
    name: FilterValuesType | '+'
    callBackButton: () => void
    bntActive?: boolean
}

const Button = (props: ButtonType) => {
    const {name, callBackButton, bntActive} = props

    const onClickHandler = () => {
        callBackButton()
    }


    return (
        <button className={bntActive ? styles.colorActiveBtn : ''} onClick={onClickHandler}>{name}</button>
    );

};

export default Button;

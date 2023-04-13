import React from 'react';
import { FilterValuesType } from "../TodoList/Todolist";

type ButtonType = {
    name: FilterValuesType | '+'
    callBackButton: () => void
}

const Button = (props: ButtonType) => {
    const {name, callBackButton} = props

    const onClickHandler = () => {
        callBackButton()
    }

    return (
        <button onClick={onClickHandler}>{name}</button>
    );

};

export default Button;

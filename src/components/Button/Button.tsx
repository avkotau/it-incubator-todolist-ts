import React from 'react';
import { FilterValuesType } from "../TodoList/TodoList";

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

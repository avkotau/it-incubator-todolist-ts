import React, { ChangeEventHandler, useState } from "react";


type PropsType = {
    oldTitle: string
    callBackAddTask: (updateTitle: string) => void
}

const EditableSpan: React.FC<PropsType> = ({
    oldTitle,
    callBackAddTask
}) => {

    const [updateTitle, setUpdateTitle] = useState(oldTitle);

    const [edit, setEdit] = useState(false);

    const toggleEditHandler = () => {
        setEdit(!edit)
        if (edit) addTask()
    }

    const updateTitleHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUpdateTitle(e.currentTarget.value)

    }

    const addTask = () => {
        callBackAddTask(updateTitle)
    }

    return (
        edit
            ? <input type={'text'} value={updateTitle}
                     onChange={updateTitleHandler}
                     onBlur={toggleEditHandler}
                     autoFocus/>
            : <span onDoubleClick={toggleEditHandler}>{oldTitle}</span>
    )
}

export default EditableSpan

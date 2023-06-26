import React, { ChangeEventHandler, memo, useCallback, useState } from "react";


type PropsType = {
    oldTitle: string
    changeTaskTitle: (title: string) => void
}

export const EditableSpan: React.FC<PropsType> = memo(({
        oldTitle,
        changeTaskTitle
    }) => {

        const [updateTitle, setUpdateTitle] = useState(oldTitle);

        const [edit, setEdit] = useState(false);

        const updateTitleHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
            setUpdateTitle(e.currentTarget.value)

        }, [setUpdateTitle])

        const addTask = useCallback(() => {
            changeTaskTitle(updateTitle)
        }, [changeTaskTitle, updateTitle])

        const toggleEditHandler = () => {
            setEdit(!edit)
            if (edit) addTask()
        }

        return (
            edit
                ? <input
                    type={'text'}
                    value={updateTitle}
                    onChange={updateTitleHandler}
                    onBlur={toggleEditHandler}
                    autoFocus
                />
                : <span onDoubleClick={toggleEditHandler}>{updateTitle}</span>
        )
    }
,(prevProps, nextProps ) => {
    return prevProps !== nextProps
})

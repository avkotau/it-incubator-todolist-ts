import React from "react";


type PropsType = {
    oldTitle: string
}


const EditableSpan: React.FC<PropsType> = ({
    oldTitle
}) => {
    return (
        <span>{oldTitle}</span>
    )
}

export default EditableSpan

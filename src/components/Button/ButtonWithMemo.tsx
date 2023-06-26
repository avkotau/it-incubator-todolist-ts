import React, { memo } from "react";
import { ButtonProps } from "@mui/material/Button/Button";
import Button from "@mui/material/Button";

export const ButtonWithMemo: React.FC<ButtonProps> = memo((props) => {
    const {title, color, variant, onClick} = props
    return <Button title={title}
                   variant={variant}
                   color={color}
                   onClick={onClick}>
        {title}
    </Button>
})

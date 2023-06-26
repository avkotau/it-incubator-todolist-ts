import Checkbox from "@mui/material/Checkbox";
import React from "react";

type CheckboxContainerType = {
    completed: boolean
    onClickCheckboxHandle: (event: boolean) => void
}

export const CheckboxContainer: React.FC<CheckboxContainerType> = ({
    completed,
    onClickCheckboxHandle
}) => {

  return (
      <Checkbox
          checked={completed}  onChange={(event) =>
          onClickCheckboxHandle(event.currentTarget.checked)}
      />
  )
}

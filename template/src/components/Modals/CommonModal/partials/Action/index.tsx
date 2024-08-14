import React, { isValidElement } from "react"
import { Button } from "@mui/material"

import { ActionProps } from "./types"
import { ACTION_AREA, COMPONENT_TYPE } from "../../types"
import CustomButton from "@/components/CustomButton"

const Action = (props: ActionProps) => {
  const {
    footer = COMPONENT_TYPE.DEFAULT,
    okText = "OK",
    cancelText = "Cancel",
    onOk,
    onCancel,
    hiddenArea,
    setConfig
  } = props
  const isCloseWhenClickCancelBtn = hiddenArea?.includes(ACTION_AREA.CANCEL_BUTTON)
  const isCloseWhenClickAcceptBtn = hiddenArea?.includes(ACTION_AREA.ACCEPT_BUTTON)

  const closeModal = () => {
    setConfig(prev => ({ ...prev, open: false }))
  }

  const handleOnCancel = () => {
    onCancel && onCancel()
    isCloseWhenClickCancelBtn && closeModal()
  }

  const handleOnOk = () => {
    onOk && onOk()
    isCloseWhenClickAcceptBtn && closeModal()
  }

  switch (footer) {
    case COMPONENT_TYPE.HIDE_FOOTER:
    case null:
      return null

    case COMPONENT_TYPE.DEFAULT:
      return (
        <>
          {okText && 
            <CustomButton
            variant="contained"
            sx={{ width: '100%' }}
            title={"OK"}
            onClick={handleOnOk}
           />
          }
        </>
      )

    default:
      if (isValidElement(footer)) return footer
      return <>{footer}</>
  }
}
{/* <Button color='primary' onClick={handleOnOk} autoFocus>{okText}</Button>} */}

export default Action
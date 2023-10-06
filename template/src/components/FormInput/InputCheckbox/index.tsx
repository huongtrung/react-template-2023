import { Box, Checkbox, FormControlLabel, FormHelperText, SxProps, Theme } from "@mui/material"
import React, { FC, useState } from "react"

interface InputCheckboxProps {
  label?: string
  labelPlacement?: 'top' | 'bottom' | 'start' | 'end'
  error?: boolean
  helperText?: string | null
  fullWidth?: boolean
  value?: boolean
  disabled?: boolean
  ref?: any
  sx?: SxProps<Theme> | undefined
  onChange?: (checked: boolean) => void
}

const InputCheckbox: FC<InputCheckboxProps> = ({
  label,
  labelPlacement,
  fullWidth,
  helperText,
  error,
  ref,
  disabled,
  value,
  sx,
  onChange,
  ...rest
}) => {
  const [prevValue, setPrevValue] = useState(value)
  const onChangeHandle = (e: any) => {
    const checked: boolean = e.target.checked
    if (onChange) {
      onChange(checked)
    }
    if (prevValue !== checked) {
      setPrevValue(checked)
    }
  }
  return (
    <Box mb={3}>
      <FormControlLabel
        control={
          <Checkbox
            {...rest}
            onChange={onChangeHandle}
            disableRipple
            inputRef={ref}
            value={value}
            checked={value}
            sx={{...sx}}
          />
        }
        label={label}
        labelPlacement={labelPlacement ? labelPlacement : "end"}
        disabled={disabled}
      />
      {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </Box>
  )
}

export default InputCheckbox

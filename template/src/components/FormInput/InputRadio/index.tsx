import { useCheckFormContext } from "@/hooks/useCheckForm"
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"

interface InputRadioProps {
  options?: any[]
  name?: string
  label?: string
  value?: string | number
  hasBorderWrap?: boolean
  fullWidth?: boolean
  helperText?: string | null
  error?: boolean
  disabled?: boolean
  required?: boolean
  propertyLabel?: string
  propertyValue?: string
  noBorder?: boolean
  showValueOnly?: boolean
  onChange: (...event: any[]) => void
  onSelectValue?: (value: string | number) => void
}

const InputRadio: React.FC<InputRadioProps> = ({
  name,
  label,
  value,
  onChange,
  options=[],
  hasBorderWrap,
  fullWidth,
  helperText,
  error,
  disabled,
  required,
  propertyLabel,
  propertyValue,
  noBorder,
  showValueOnly,
  onSelectValue,
  ...rest
}) => {
  const [prevValue, setPrevValue] = useState(value)
  const { setIsChangeValue } = useCheckFormContext()
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    if ((value || value == 0) && options && options.length > 0) {
      let result: any[] = [...options]
      if (showValueOnly) {
        result = options.filter((option: any) => {
          if (propertyValue) {
            return option[propertyValue]?.toString() == value.toString()
          } else {
            return option?.value?.toString() == value.toString()
          }
        })
      }
      setData(result)
    } else {
      setData(options)
    }
  }, [showValueOnly, options, value, propertyValue])

  const onChangeHandle = (e: any) => {
    const value = e.target.value
    onChange && onChange(value)
    onSelectValue && onSelectValue(value)
    if (disabled) return
    if (value !== prevValue) {
      setIsChangeValue(true)
      setPrevValue(value)
    }
  }

  const renderInputRadio = () => {
    const getItemName = (item: any) => {
      const labelText = propertyLabel ? item[propertyLabel] : item.label
      if (isChecked(value, propertyValue ? item[propertyValue] : item.value)) {
        return <Typography sx={{ fontWeight: 600 }}>{labelText}</Typography>
      }
      return labelText
    }

    const isChecked = (value: any, itemValue: any) => {
      if (value || (value == 0 && itemValue) || itemValue == 0) {
        return value?.toString() == itemValue?.toString()
      } else {
        return false
      }
    }

    return (
      <>
        <Box component='div' sx={noBorder ? {} : {}}>
          <FormLabel
            id={name + "-row-radio-buttons-group-label"}
            error={error}
            required={required}
          >
            {label}
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby={name + "-row-radio-buttons-group-label"}
            name={name}
            value={value}
            onChange={onChangeHandle}
            {...rest}
          >
            {data &&
              data.map((item: any, i: number) => (
                <FormControlLabel
                  key={i}
                  value={
                    propertyValue && propertyValue != ""
                      ? item[propertyValue]
                      : item.value
                  }
                  control={
                    <Radio
                      disabled={disabled}
                      checked={isChecked(
                        value,
                        propertyValue && propertyValue != ""
                          ? item[propertyValue]
                          : item.value
                      )}
                    />
                  }
                  label={getItemName(item)}
                />
              ))}
          </RadioGroup>
        </Box>
        {error && (
          <FormHelperText error={error} >{helperText}</FormHelperText>
        )}
      </>
    )
  }

  return (
    <Box component='div' sx={{ width: fullWidth ? "100%" : "auto", marginBottom: 3 }}>
      <FormControl >{renderInputRadio()}</FormControl>
    </Box>
  )
}

export default InputRadio

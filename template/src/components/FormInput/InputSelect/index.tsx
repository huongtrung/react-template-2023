import { Colors } from "@/themes"
import Utilities from "@/utils/Util"
import {
  FormControl,
  FormHelperText,
  InputLabel,
  SxProps,
  Theme,
} from "@mui/material"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import SelectWithoutSearching from "./partials/SelectWithoutSearching"
import SelectWithSearching from "./partials/SelectWithSeaching"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

interface InputSelectProps {
  name?: string
  value?: string | number
  iconStyle?: React.CSSProperties
  propertyLabel?: string
  propertyValue?: string
  variant?: "standard" | "outlined" | "filled"
  label?: string
  placeholder?: string
  helperText?: string
  hideIcon?: boolean
  required?: boolean
  loading?: boolean
  error?: boolean
  disabled?: boolean
  fullWidth?: boolean
  convertValueToString?: boolean
  isReturnObj?: boolean
  triggerOnInit?: boolean
  spaceMenu?: boolean
  notched?: boolean
  options?: any[]
  size?: "small" | "medium"
  fontWeight?: number | string
  fontSizeItem?: number | string
  sx?: SxProps<Theme> | undefined
  onOpen?: () => void
  onChange: (...event: any[]) => void
  onChangeValue?: (value: string | number) => void
  onSelectValue?: (value: string | number) => void
  onChangeCallBack?: (value: string | number) => void
}

const InputSelect: React.FC<InputSelectProps> = ({
  name = "",
  value,
  iconStyle,
  propertyLabel = "label",
  propertyValue = "value",
  variant,
  hideIcon,
  loading,
  convertValueToString = false,
  options = [],
  isReturnObj,
  triggerOnInit,
  required,
  label = "",
  placeholder,
  helperText,
  disabled,
  error = false,
  fullWidth,
  spaceMenu,
  notched = false,
  size,
  fontWeight,
  fontSizeItem,
  sx,
  onOpen,
  onChange,
  onChangeValue,
  onSelectValue,
  onChangeCallBack,
}) => {
  const [shrink, setShrink] = useState(true)
  const [isIsInit, setIsInit] = useState(!!triggerOnInit)
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  useEffect(() => {
    if (value && isIsInit) {
      setIsInit(false)
      const item = Utilities.findItemByIdInOptions(
        `${value}`,
        options,
        propertyValue
      )
      onSelectValue && onSelectValue(!isReturnObj ? value : item)
    }
  }, [value])
  const onChangeHandle = (e: any) => {
    const value = isRenderSearchingSelect ? e : e.target.value
    onChange && onChange(value)
    const item = Utilities.findItemByIdInOptions(
      `${value}`,
      options,
      propertyValue
    )
    onChangeCallBack && onChangeCallBack(!isReturnObj ? value : item)
    onSelectValue && onSelectValue(!isReturnObj ? value : item)
    onChangeValue && onChangeValue(value)
  }

  const handleOpenSelect = useCallback(() => {
    onOpen && onOpen()
    setIsSelectOpen(true)
  }, [onOpen])

  const handleCloseSelect = useCallback(() => {
    setIsSelectOpen(false)
  }, [])

  const isRenderSearchingSelect = useMemo(
    () => options?.length > 30,
    [options?.length]
  )

  return (
    <FormControl
      fullWidth={fullWidth}
      variant={variant ?? "outlined"}
      sx={{
        marginBottom: 3,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: "1px !important",
            borderColor: isSelectOpen
              ? error && !isSelectOpen
                ? `${Colors.red} !important`
                : `${Colors.primary} !important`
              : null, // Change border color as needed
          },
          "&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
            borderColor:
              error && !isSelectOpen
                ? "#FF4842 !important"
                : Colors.primary + "!important",
          },
        },
      }}
    >
      <InputLabel
        id={name + "-select-outlined-label"}
        shrink={value && value !== "" ? true : notched ?? shrink}
        error={error}
        required={required}
        sx={{
          "&.MuiFormLabel-root": {
            color: Colors.neutral3,
          },
          '&.Mui-error': {
            color: isSelectOpen ? Colors.neutral3 : Colors.red,
            opacity: isSelectOpen ? 1 : .5
          },
          "&.MuiInputLabel-root": {
            "&.Mui-error span": {
              color: isSelectOpen ? Colors.neutral3 : Colors.red,
              opacity: isSelectOpen ? 1 : 0.5,
              "&.MuiInputLabel-asterisk": {
                opacity: 1,
                color: Colors.red,
              },
            },
          },
          "& .css-mmdgpg-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root ":
            {
              borderWidth: "1px !important",
              borderColor: isSelectOpen
                ? error && !isSelectOpen
                  ? `${Colors.red} !important`
                  : `${Colors.primary} !important`
                : null, // Change border color as needed
            },
        }}
      >
        <span>{label}</span>
      </InputLabel>
      {isRenderSearchingSelect ? (
        <SelectWithSearching
          options={options}
          popupIcon={
            <ExpandMoreIcon
              style={{
                ...iconStyle,
                color: disabled || error ? "#2D3748" : undefined,
              }}
            />
          }
          onOpen={handleOpenSelect}
          onClose={handleCloseSelect}
          size={size}
          disabled={disabled}
          label={label}
          value={value}
          notched={notched}
          shrink={shrink}
          setShrink={setShrink}
          error={error}
          onChangeHandle={onChangeHandle}
          propertyLabel={propertyLabel}
          propertyValue={propertyValue}
          placeholder={placeholder}
          fontSizeItem={fontSizeItem}
          fontWeight={fontWeight}
        />
      ) : (
        <SelectWithoutSearching
          label={label}
          options={options}
          name={name}
          iconComponent={(prop: any) => (
            <ExpandMoreIcon
              {...prop}
              style={{
                ...iconStyle,
                color: disabled || error ? "#2D3748" : null,
              }}
            />
          )}
          value={value}
          notched={notched}
          shrink={shrink}
          disabled={disabled}
          size={size}
          onClose={handleCloseSelect}
          onOpen={handleOpenSelect}
          onChangeHandle={onChangeHandle}
          error={error}
          placeholder={placeholder}
          setShrink={setShrink}
          propertyLabel={propertyLabel}
          propertyValue={propertyValue}
          spaceMenu={spaceMenu}
          sx={sx}
          convertValueToString={convertValueToString}
          fontWeight={fontWeight}
          fontSizeItem={fontSizeItem}
          hideIcon={hideIcon}
          loading={loading}
        />
      )}
      {helperText && (
        <FormHelperText
          error={error}
          id={name + "-helper-text"}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default InputSelect

import React, { ReactElement, memo, useMemo } from "react"
import { Colors, FontWeight } from "@/themes"
import Utilities from "@/utils/Util"
import { Autocomplete, TextField } from "@mui/material"
import styled from "styled-components"

interface SelectWithSearchingProps {
  options: any[],
  label: string,
  value: string | number | any,
  notched: boolean,
  shrink: boolean,
  error: boolean,
  placeholder?: string,
  setShrink: (value: boolean) => void,
  propertyLabel?: string,
  propertyValue?: string,
  disabled?: boolean,
  size?: any,
  onClose: () => void,
  onOpen: () => void,
  onChangeHandle: (value: any) => void,
  popupIcon: ReactElement,
  fontWeight?: number | string,
  fontSizeItem?: number | string
}

const SelectWithSearching = (props: SelectWithSearchingProps) => {
  const {
    options, label, value, notched, shrink, error, placeholder, setShrink,
    propertyLabel, disabled, propertyValue, size, onClose,
    onOpen, onChangeHandle, popupIcon, fontSizeItem, fontWeight
  } = props

  const renderAutoCompleteValue = useMemo(() => {
    if (!!value || value === 0) {
      const item = Utilities.findItemByIdInOptions(`${value}`, options, propertyValue ?? "value")
      return item
    }
    return null
  }, [value, propertyValue, options])

  return (
    <Autocomplete
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          InputLabelProps={{
            shrink: value ? true : notched ?? shrink
          }}
          error={error}
          placeholder={placeholder ?? `Chọn ${props.label}`}
          onFocus={() => setShrink(true)}
          sx={{ fontWeight: fontWeight ?? 400 }}
        />
      )}
      getOptionLabel={(option: any) => propertyLabel ? option?.[propertyLabel] : option?.label}
      disableClearable
      disablePortal
      popupIcon={popupIcon}
      renderOption={({ className, ...restProps }, option, { selected }) => {
        const label = propertyLabel ? option?.[propertyLabel] : option?.label
        return <AutoCompleteItem {...restProps} selected={selected} style={{ fontSize: fontSizeItem }}>{label}</AutoCompleteItem>
      }}
      onOpen={onOpen}
      onClose={onClose}
      noOptionsText={<NoDataItem>Không có dữ liệu</NoDataItem>}
      sx={{
        "& .MuiFormLabel-root": {
          visibility: "hidden"
        }
      }}
      openOnFocus
      size={size}
      disabled={disabled}
      onChange={(_, value) => {
        const valueSelected = propertyValue ? value[propertyValue] : value.value
        onChangeHandle(valueSelected)
      }}
      value={renderAutoCompleteValue}
    />
  )
}

export default memo(SelectWithSearching)

const AutoCompleteItem = styled.li<{ selected: boolean, fontSize?: string | number }>`
  color: ${props => props.selected ? Colors.primary : Colors.primary};
  font-weight: ${props => props.selected ? FontWeight.font_700 : FontWeight.font_400};
  padding: 12px 16px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.selected ? Colors.white : Colors.white};
  &:hover {
    background-color: #155ad014;
  }
`

const NoDataItem = styled.li`
  color: #637381;
  font-weight: ${FontWeight.font_400};
  padding: 6px 0;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${Colors.white};
  list-style-type: none;
`
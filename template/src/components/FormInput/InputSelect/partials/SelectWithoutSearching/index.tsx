import React, { FC, ReactElement, memo, useEffect, useState } from "react"
import { Box, MenuItem, Select, SxProps, Theme } from "@mui/material"
import { isEmpty } from "ramda"

interface SelectWithoutSearching {
  label: string
  options: any[]
  name: string
  iconComponent: any
  value: string | number | any
  notched: boolean
  shrink: boolean
  disabled?: boolean
  size?: any
  onClose: () => void
  onOpen: () => void
  onChangeHandle: (value: any) => void
  error: boolean
  placeholder?: string
  setShrink: (value: boolean) => void
  propertyLabel?: string
  propertyValue?: string
  spaceMenu?: boolean
  sx?: SxProps<Theme> | undefined
  convertValueToString: boolean
  fontWeight?: number | string
  fontSizeItem?: number | string
  hideIcon?: boolean
  loading?: boolean
}

const SelectWithoutSearching = (props: SelectWithoutSearching) => {
  const {
    label,
    name,
    iconComponent,
    value,
    notched,
    disabled,
    shrink,
    onOpen,
    onClose,
    spaceMenu,
    convertValueToString,
    onChangeHandle,
    fontWeight,
    options,
    propertyValue,
    propertyLabel,
    setShrink,
    fontSizeItem,
    hideIcon,
    loading,
  } = props

  const [customSelectProps, setCustomSelectProps] = useState({})

  useEffect(() => {
    if (hideIcon) {
      setCustomSelectProps({ ...customSelectProps, IconComponent: () => null })
    }
  }, [hideIcon])

  const RenderValue = (selected: any, text: string) => {
    if ((!value || value == "") && value !== 0) {
      if (notched || shrink) {
        return (
          <span
            style={{ fontWeight: fontWeight ?? 400 }}
          >
            {props.placeholder ?? "Chọn" + text}
          </span>
        )
      } else {
        return ""
      }
    } else {
      const filter = !isEmpty(options)
        ? props?.options?.find((o: any) => {
            const _value: any =
              propertyValue && propertyValue !== "" ? o[propertyValue] : o.value
            return _value == selected
          })
        : {}
      if (filter && !isEmpty(filter)) {
        return propertyLabel && propertyLabel !== ""
          ? filter[propertyLabel]
          : filter.label
      }
    }
  }

  return (
    <Select
      {...customSelectProps}
      labelId={name + "-select-outlined-label"}
      id={name + "-select-outlined"}
      IconComponent={iconComponent}
      label={label}
      disabled={disabled}
      displayEmpty={value ? true : notched ?? shrink}
      onOpen={onOpen}
      onClose={onClose}
      MenuProps={{
        style: {
          maxHeight: 400,
        },
        PaperProps: {
          style: spaceMenu
            ? {
                borderRadius: 16,
                border: "1px solid #EDF2F7",
                padding: "16px 12px",
              }
            : {},
        },
      }}
      sx={props.sx}
      value={
        !!value || value === 0
          ? convertValueToString
            ? value.toString()
            : value
          : ""
      }
      onChange={onChangeHandle}
      renderValue={(selected) => RenderValue(selected, ` ${props.label ?? ""}`)}
      onFocus={() => setShrink(true)}
      size={props.size}
      notched={value && value !== "" ? true : props.notched ?? shrink}
      error={props.error}
    >
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", minHeight: "40px" }}
        />
      ) : props?.options && props?.options.length > 0 ? (
        props?.options?.map((o: any, i: number) => {
          const _value =
            propertyValue && propertyValue !== "" ? o[propertyValue] : o.value
          const _label =
            propertyLabel && propertyLabel !== "" ? o[propertyLabel] : o.label
          return (
            <MenuItem
              key={i}
              value={_value}
              sx={{ fontSize: fontSizeItem }}
            >
              {_label}
            </MenuItem>
          )
        })
      ) : (
        <MenuItem disabled>Không có dữ liệu</MenuItem>
      )}
    </Select>
  )
}

export default memo(SelectWithoutSearching)

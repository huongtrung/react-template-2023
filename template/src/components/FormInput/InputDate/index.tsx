import React, { useCallback, useState } from "react"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { Box, InputAdornment, TextField } from "@mui/material"
import { useCheckFormContext } from "@/hooks/useCheckForm"
import DatetimeUtil from "@/utils/DateTimeUtil"
import { DATE_TIME_TYPE } from "@/constants/DatetimeConstants"

interface InputDateProps {
  onChange?: (...event: any[]) => void
  onChangeCallBack?: (value: any) => void
  hideIcon?: boolean
  maxDate?: unknown
  disabled?: boolean
  isDisableColorDate?: boolean
  isBlurIcon?: boolean
  isHiddenIconDate?: boolean
  fullWidth?: boolean
  dateFormat?: string
  label?: string
  placeholder?: string
  helperText?: string
  error?: boolean
  required?: boolean
  shrink?: boolean
  value?: unknown
}

const InputDate: React.FC<InputDateProps> = ({
  onChange,
  onChangeCallBack,
  hideIcon,
  maxDate,
  disabled,
  isBlurIcon,
  isDisableColorDate,
  isHiddenIconDate = false,
  fullWidth,
  dateFormat,
  label,
  placeholder,
  helperText,
  error,
  required,
  shrink,
  value,
  ...rest
}) => {
  const [isOpenDatePickerDialog, setIsOpenDatePickerDialog] = useState(false)
  const { setIsChangeValue } = useCheckFormContext()
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const handleOpenDatePickerDialog = useCallback(
    () => disabled || setIsOpenDatePickerDialog(true),
    [setIsOpenDatePickerDialog, disabled]
  )
  const handleCloseDatePickerDialog = useCallback(
    () => setIsOpenDatePickerDialog(false),
    [setIsOpenDatePickerDialog]
  )

  const onChangeHandle = (e: any) => {
    const dateFormatted = DatetimeUtil.formatDate(e, DATE_TIME_TYPE.TYPE_3)
    onChange && onChange(dateFormatted)
    onChangeCallBack && onChangeCallBack(dateFormatted)
    setIsChangeValue(true)
  }
  return (
    <Box mb={3}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          value={value}
          open={isOpenDatePickerDialog}
          onOpen={() => {
            setIsSelectOpen(true)
            handleOpenDatePickerDialog()
          }}
          onClose={() => {
            setIsSelectOpen(false)
            handleCloseDatePickerDialog()
          }}
          {...rest}
          // components={{
          //   OpenPickerIcon: Calendar,
          // }}
          maxDate={maxDate ? maxDate : undefined}
          disableOpenPicker={hideIcon}
          dayOfWeekFormatter={(day) => day}
          inputFormat={dateFormat ? dateFormat : "DD/MM/YYYY"}
          onChange={onChangeHandle}
          renderInput={(params: any) => (
            <TextField
              {...params}
              label={<span>{label}</span>}
              fullWidth={fullWidth}
              InputLabelProps={{
                sx: {
                  // opacity: error ? '0.5' : null, // Change the color to your desired color for error state
                  "&.MuiInputLabel-root": {
                    "&.Mui-error span": {
                      color: "#FF4842",
                      opacity: 0.5,
                      "&.MuiInputLabel-asterisk": {
                        opacity: 1,
                      },
                    },
                  },
                  backgroundColor: "white",
                  "&+.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#FF4842 !important",
                    },
                },
                shrink: shrink ? shrink : true,
              }}
              required={required}
              error={error}
              helperText={helperText}
              inputProps={{
                ...params.inputProps,
                readOnly: true,
                placeholder: placeholder ? placeholder : "Chọn",
              }}
              sx={{
                "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                  {
                    borderWidth: 1,
                    borderColor: "red",
                  },
                input: { cursor: "pointer" },
              }}
              onClick={handleOpenDatePickerDialog}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default InputDate

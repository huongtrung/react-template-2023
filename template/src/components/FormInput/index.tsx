import React, {
  HTMLInputTypeAttribute,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from "react-hook-form"
import { InputComponent, typeInputComponent } from "./helper"
import { SxProps, Theme } from "@mui/material"
import { useActiveFormContext } from "@/hooks/useFormActive"
import { useCheckFormContext } from "@/hooks/useCheckForm"

interface FormInputProps {
  type: string
  control: Control
  name: string
  defaultValue?: string
  formStyle?: any
  errors?: any
  clearErrors?: (name: string) => void
  disabled?: boolean
  isNotSetActive?: boolean
  rules?: any
  typeInput?: any
  options?: any[]
  placeholder?: string
  label?: string
  inputProps?: any
  fullWidth?: boolean
  required?: boolean
  dateFormat?: string
  ref?: any
  sx?: SxProps<Theme> | undefined
  labelPlacement?: "top" | "bottom" | "start" | "end"
  defaultChecked?: boolean
  hasBorderWrap?: boolean
  multiline?: boolean
  noBorder?: boolean
  rows?: number
  maxRows?: number
  errorMessage?: string
  helperText?: string
  onChangeValue?: (value: string | number) => void
  onBlurInputText?: (value: string) => void
  autoCapitalize?: string
  autoComplete?: string
  maxLength?: number
  inputType?: HTMLInputTypeAttribute
  onSelectValue?: (value: number | string) => void
  trimMiddleText?: boolean
  propertyLabel?: string
  propertyValue?: string
  hidden?: boolean
  hideIcon?: boolean
  showValueOnly?: boolean
  numberType?: string
  loading?: boolean
  convertValueToString?: boolean
  regex?: RegExp
}

const FormInput: React.FC<FormInputProps> = ({
  type = typeInputComponent.InputText,
  control,
  name,
  defaultValue = "",
  fullWidth,
  sx,
  clearErrors,
  disabled = false,
  rules,
  onChangeValue,
  onBlurInputText,
  isNotSetActive,
  errorMessage,
  ...inputProps
}) => {
  const valueRef = useRef(null)
  const { active } = useActiveFormContext()
  const { setIsChangeValue } = useCheckFormContext()
  const [previousValue, setPreviousValue] = useState("")
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    if (errorMessage && errorMessage !== "") {
      setHasError(true)
    } else {
      setHasError(false)
    }
  }, [errorMessage])

  const renderComponent = (params: {
    field: ControllerRenderProps<any, any>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<any>
  }) => {
    const { onChange, onBlur, value, name } = params.field
    if (value !== valueRef.current) {
      valueRef.current = value
    }

    const onValueChange = (value: string) => {
      onChange(value)
      onChangeValue && onChangeValue(value)
    }

    const onBlurInput = (value: string) => {
      if (previousValue !== value) {
        setIsChangeValue(true)
      }
      onBlurInputText && onBlurInputText(value)
    }

    const onValueSelect = (value: string) => {
      if (previousValue !== value) {
        setIsChangeValue(true)
      }
      onChange(value)
      onChangeValue && onChangeValue(value)
    }

    const Input = InputComponent[type]
    const controllerProps = Input?.onBlur
      ? {
          [Input?.onChange]: onValueChange,
          [Input?.value]: value,
          [Input?.onBlurInputText]: onBlurInput,
        }
      : {
          [Input?.onChange]: onValueSelect,
          [Input?.value]: value,
        }

    const _fullWidth: boolean =
      fullWidth === null || typeof fullWidth === "undefined" ? true : fullWidth

    const { ref, ...rest } = params.field

    const setDisable = () => {
      const isFormActive = isNotSetActive ? false : !active
      return isFormActive || disabled
    }

    return (
      <Input.Component
        {...rest}
        {...inputProps}
        {...controllerProps}
        fullWidth={_fullWidth}
        error={hasError}
        // ref={ref}
        helperText={hasError ? errorMessage : ""}
        onFocusInput={() => {
          clearErrors && clearErrors(name)
          setPreviousValue(value)
        }}
        disabled={setDisable()}
        sx={sx}
      />
    )
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={renderComponent}
      rules={rules}
    />
  )
}

export default FormInput

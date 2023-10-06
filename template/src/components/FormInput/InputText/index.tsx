/* eslint-disable no-prototype-builtins */
import { InputBaseComponentProps, TextField } from "@mui/material"
import React, { HTMLInputTypeAttribute } from "react"
import { typeTextInput } from "../helper"
import Utilities from "@/utils/Util"

interface InputTextProps {
  typeInput?: any
  maxLength?: number
  autoCapitalize?: string
  autoComplete?: string
  inputType?: HTMLInputTypeAttribute
  trimMiddleText?: boolean
  disable?: boolean
  shrink?: boolean
  label?: string
  value?: string
  inputProps?: InputBaseComponentProps
  regex?: RegExp
  onChange: (...event: any[]) => void
  onBlur?: (...event: any[]) => void
  onBlurInputText?: (value: string) => void
  onFocusInput: () => void
}

const typeMoney: any = { money: 15, money15: 15, money5: 5, moneyMillion: 15 }

const InputText: React.FC<InputTextProps> = ({
  typeInput = "",
  maxLength,
  autoCapitalize,
  autoComplete,
  inputType,
  trimMiddleText,
  disable,
  label,
  shrink,
  value,
  inputProps,
  regex,
  onChange,
  onBlur,
  onBlurInputText,
  onFocusInput,
  ...rest
}) => {
  let _inputProps: any = {}
  if (inputProps) {
    _inputProps = { ...inputProps }
  }

  if (maxLength) {
    _inputProps = { ..._inputProps, maxLength }
  }

  const isDecimalNumber = (str: any) =>
    /^\d{0,18}\.\d{0,1}$|^\d{0,20}$/.test(str)

  const onBlurHandle = (e: any) => {
    let value: any = e.target.value
    if (typeInput === typeTextInput.moneyMillion) {
      value = Utilities.replaceMoneyMillion(value)
    }

    if (typeInput === typeTextInput.trimMiddleText || trimMiddleText) {
      value = value?.replace(/\s+/g, " ")
      value = value.trim()
      if (onChange) {
        onChange(value)
      }
    }
    if (autoCapitalize && autoCapitalize === "characters") {
      value = value?.toLocaleUpperCase()
      if (onChange) {
        onChange(value)
      }
    }

    if (onBlur) {
      if (typeMoney.hasOwnProperty(typeInput)) {
        onBlur(Utilities.convertMoneyToNumber(value))
        onBlurInputText &&
          onBlurInputText(Utilities.convertMoneyToNumber(value))
      } else {
        onBlur(value)
        onBlurInputText && onBlurInputText(value)
      }
    }

    // onBlurInputText && onBlurInputText()
  }

  const onChangeHandle = (e: any) => {
    const value: any = e.target.value
    if (typeMoney.hasOwnProperty(typeInput)) {
      if (typeInput == typeTextInput.moneyMillion) {
        if (!value) {
          return onChange("")
        }
        if (regex && !regex.test(Utilities.convertMMToNumber(value))) {
          throw new Error("value not matches regex")
        }
        const numberOfMoney = Utilities.convertMMToNumber(value)
        if (!/^[0-9.]*$/.test(numberOfMoney)) {
          return
        }
        const len = numberOfMoney?.length
        if (len > typeMoney[typeInput]) {
          return
        }
        return onChange(numberOfMoney)
      } else {
        if (regex && !regex.test(Utilities.convertMoneyToNumber(value))) {
          throw new Error("value not matches regex")
        }
        const numberOfMoney = Utilities.convertMoneyToNumber(value)
        if (!/^[0-9.]*$/.test(numberOfMoney)) {
          return
        }
        const len = numberOfMoney?.length
        if (len > typeMoney[typeInput]) {
          return
        }
        return onChange(numberOfMoney)
      }
    } else if (typeInput === typeTextInput.decimal) {
      if (isDecimalNumber(value)) {
        onChange(value)
      }
    } else if (typeInput === typeTextInput.integer) {
      onChange(value.replace(/[^0-9]/g, ""))
    } else {
      onChange(value)
    }
  }

  const convertTextValue = (input: any) => {
    try {
      if (typeMoney.hasOwnProperty(typeInput)) {
        // if it's input money then can't paste the character
        if (!!input && input !== "null") {
          // return Utilities.convertNumberToMoney(convertMoneyDefault(input))
          if (typeInput == typeTextInput.moneyMillion) {
            return (
              Utilities.replaceMoneyMillion(
                Utilities.convertNumberToMM(input)
              ) ?? ""
            )
          } else {
            const value = convertMoneyDefault(input)
            return Utilities.convertNumberToMoney(value)
          }
        }
        return ""
      } else {
        const inputText = !!input && input !== "null" ? input : ""
        const inputString =
          typeof inputText === "string"
            ? inputText?.trimStart()
            : inputText.toString()
        return inputString
      }
    } catch (error) {
      console.log(error)
    }
  }

  const convertMoneyDefault = (input: any) => {
    if (input == -1) {
      return null
    }
    return input
  }

  return (
    <TextField
      {...rest}
      onBlur={onBlurHandle}
      type={inputType}
      inputProps={{
        ..._inputProps,
        autoComplete: autoComplete ? autoComplete : "off",
      }}
      label={<span>{label}</span>}
      value={value ? convertTextValue(value) : ""}
      onChange={onChangeHandle}
      InputLabelProps={{
        shrink: shrink ? shrink : true,
      }}
      sx={{marginBottom: 3}}
      onFocus={(e) => {
        if (disable) return false
        else {
          onFocusInput()
        }
      }}
    />
  )
}

export default InputText

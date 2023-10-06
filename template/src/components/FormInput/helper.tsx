import InputCheckbox from "./InputCheckbox"
import InputDate from "./InputDate"
import InputRadio from "./InputRadio"
import InputSelect from "./InputSelect"
import InputText from "./InputText"

export const typeInputComponent = {
  InputText: "input-text",
  InputNumber: "input-number",
  InputCheckbox: "Input-checkbox",
  InputSwitch: "Input-switch",
  InputRadio: "Input-radio",
  InputSelect: "Input-select",
  InputTextArea: "Input-textArea",
  InputDate: "Input-date",
  InputPriority: "input-priority",
  InputDob: "Input-dob",
}

export const InputComponent = {
  [typeInputComponent.InputText]: {
    Component: InputText,
    onChange: "onChangeValue",
    onBlurInputText: "onBlurInputText",
    value: "value",
    onBlur: "onBlur",
    label: "label",
  },
  [typeInputComponent.InputRadio]: {
    Component: InputRadio,
    onChange: "onChangeValue",
    value: "value",
    options: "options",
    disabled: "disabled",
  },
  [typeInputComponent.InputCheckbox]: {
    Component: InputCheckbox,
    onChange: "onChangeValue",
    value: "value",
    options: "options",
  },
  [typeInputComponent.InputSelect]: {
    Component: InputSelect,
    onChange: "onChangeValue",
    value: "value",
    options: "options",
    minWidth: "minWidth",
    placeholder: "placeholder",
    bg: "bg",
    boxWrap: "boxWrap",
    selectWidth: "selectWidth",
  },
  [typeInputComponent.InputDate]: {
    Component: InputDate,
    label: "label",
    placeholder: "placeholder",
    value: "value",
    onChange: "onChangeValue",
  },
}

export const typeTextInput = {
  text: "text",
  password: "password",
  money: "money",
  money15: "money15",
  money5: "money5",
  moneyMillion: "moneyMillion",
  date: "date",
  decimal: "decimal",
  remove_utf8: "remove-utf8",
  trimMiddleText: "trimMiddleText",
  integer: "integer",
}

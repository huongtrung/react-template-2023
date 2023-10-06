import * as yup from "yup"
import { TEST_FORM_FIELD_NAME } from "./fieldname"

const PLEASE_INPUT_MESSAGE = "Vui lòng bổ sung thông tin"

export const testSchema = yup.object({
  [TEST_FORM_FIELD_NAME.INPUT_TEXT]: yup
    .string()
    .required(PLEASE_INPUT_MESSAGE)
    .typeError(PLEASE_INPUT_MESSAGE),
  [TEST_FORM_FIELD_NAME.INPUT_SELECT]: yup
    .string()
    .required(PLEASE_INPUT_MESSAGE)
    .typeError(PLEASE_INPUT_MESSAGE),
  [TEST_FORM_FIELD_NAME.INPUT_DATE]: yup
    .string()
    .required(PLEASE_INPUT_MESSAGE)
    .typeError(PLEASE_INPUT_MESSAGE),
  [TEST_FORM_FIELD_NAME.INPUT_CHECKBOX]: yup
    .bool()
    .required(PLEASE_INPUT_MESSAGE)
    .typeError(PLEASE_INPUT_MESSAGE),
  [TEST_FORM_FIELD_NAME.INPUT_RADIO]: yup
    .string()
    .required(PLEASE_INPUT_MESSAGE)
    .typeError(PLEASE_INPUT_MESSAGE),
})

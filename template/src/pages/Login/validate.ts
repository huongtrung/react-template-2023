import * as yup from "yup"
import { LOGIN_FIELD_NAME } from "./fieldname"

const PLEASE_INPUT_MESSAGE = "Vui lòng bổ sung thông tin"

export const testSchema = yup.object({
  [LOGIN_FIELD_NAME.USER_NAME]: yup
    .string()
    .required(PLEASE_INPUT_MESSAGE)
    .typeError(PLEASE_INPUT_MESSAGE),
  [LOGIN_FIELD_NAME.PASSWORD]: yup
    .string()
    .required(PLEASE_INPUT_MESSAGE)
    .typeError(PLEASE_INPUT_MESSAGE),
})

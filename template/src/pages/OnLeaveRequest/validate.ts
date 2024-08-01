import * as yup from "yup"
import { FORM_FIELD_NAME } from "./fieldname"

const PLEASE_INPUT_MESSAGE = "Vui lòng bổ sung thông tin"

export const testSchema = yup.object({
  [FORM_FIELD_NAME.NAME]: yup
    .string()
    .required(PLEASE_INPUT_MESSAGE)
    .typeError(PLEASE_INPUT_MESSAGE),
})

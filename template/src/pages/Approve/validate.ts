import * as yup from "yup"
import { FORM_FIELD_NAME } from "./fieldname"

const PLEASE_INPUT_MESSAGE = "Vui lòng bổ sung thông tin"

export const testSchema = yup.object({
 [FORM_FIELD_NAME.METHOD]: yup
 .string()
 .required("Phê duyệt không được để trống")
 .typeError("Phê duyệt không được để trống"),
 [FORM_FIELD_NAME.REASON]: yup
    .string()
    .required("Lý do nghỉ không được để trống")
    .typeError("Lý do nghỉ không được để trống"),
})

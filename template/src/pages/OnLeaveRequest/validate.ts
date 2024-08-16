import * as yup from "yup"
import { FORM_FIELD_NAME } from "./fieldname"

export const testSchema = yup.object({
  [FORM_FIELD_NAME.REASON]: yup
    .string()
    .required("Lý do nghỉ không được để trống")
    .typeError("Lý do nghỉ không được để trống"),
  [FORM_FIELD_NAME.OFF_METHOD]: yup
    .string()
    .required('Hình thức nghỉ không được để trống')
    .typeError('Hình thức nghỉ không được để trống'),
  [FORM_FIELD_NAME.DAY_START]: yup.string().when(FORM_FIELD_NAME.OFF_METHOD, (f, s) => {
    const string: any = 'ON_LEAVE'
    return f == string ? s.required('Ngày bắt đầu không được để trống').typeError('Ngày bắt đầu không được để trống') : s.nullable()
  }),
  [FORM_FIELD_NAME.DAY_OFF]: yup.number().when(FORM_FIELD_NAME.OFF_METHOD, (f, s) => {
    const string: any = 'ON_LEAVE'
    return f == string ? s.required('Số ngày nghỉ không được để trống')
      .min(1, 'Số ngày nghỉ không được nhỏ hơn 1')
      .typeError('Số ngày nghỉ không được để trống') : s.nullable()
  }),
})

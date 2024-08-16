

import React, { useEffect } from "react"
import {
 Box,
 IconButton,
} from "@mui/material"
import FormInput from "@/components/FormInput";
import { FORM_FIELD_NAME } from "./fieldname";
import { typeInputComponent } from "@/components/FormInput/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { testSchema } from "./validate";
import { TestActions } from "@/reduxSaga/TestRedux";
import Dialog from '@mui/material/Dialog';
import { CustomButton } from "@/components";
import Backdrop from "@/components/Backdrop"
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close'

const APPROVE_METHOD = [
 { value: "OK", label: "Đồng ý" },
 { value: "REJECT", label: "Từ chối" },
]
interface Props {
 isOpen: boolean,
 close?: any
}

const ModalApprove: React.FC<Props> = ({
 isOpen,
 close = () => {}
}) => {
 const methods = useForm({
  mode: "onSubmit",
  resolver: yupResolver(testSchema),
 })
 const {
  control,
  getValues,
  setError,
  setValue,
  handleSubmit,
  reset,
  formState: { errors },
 } = methods

 return (
  <Dialog
   slots={{ backdrop: Backdrop }}
   open={isOpen}
   style={{padding : 20}}
  >
   <div
    style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
    <div>
     <h1 style={{ margin: 20, textAlign : 'center' }} onClick={() => console.log("flow: click")}>Phê duyệt đơn xin nghỉ</h1>
     <IconButton edge="end" onClick={() => {
      console.log('aaaaa')
      close()
     }}
      sx={{
       position: 'absolute',
       right: 18,
       top: 10,
      }}
     >
      <CloseIcon />
     </IconButton>
     <FormInput
      label='Phê duyệt'
      control={control}
      options={APPROVE_METHOD}
      name={FORM_FIELD_NAME.METHOD}
      type={typeInputComponent.InputSelect}
      errorMessage={errors[FORM_FIELD_NAME.METHOD]?.message}
     />
     <FormInput
      required
      label='Ý kiến'
      placeholder='Nhập ý kiến'
      control={control}
      name={FORM_FIELD_NAME.REASON}
      type={typeInputComponent.InputText}
      errorMessage={errors[FORM_FIELD_NAME.REASON]?.message}
     />
     <CustomButton
      variant="contained"
      sx={{ width: '100%' }}
      title='Gửi'
      onClick={handleSubmit(() => { })}
     />
    </div>
   </div>
  </Dialog>
 )
}

const BackdropStyled = styled(Backdrop)`
  z-index: -1;
`

export default ModalApprove
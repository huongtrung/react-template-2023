import React, { useEffect } from "react"
import FormInput from "@/components/FormInput"
import {
 Box,
 Button,
 Card,
 CardActions,
 CardContent,
 CardHeader,
} from "@mui/material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LOGIN_FIELD_NAME } from "./fieldname"
import { testSchema } from "./validate"
import { typeInputComponent, typeTextInput } from "@/components/FormInput/helper"
import { CustomButton } from "@/components"
import { isEmpty } from "ramda"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelector"
import { AuthActions } from "@/reduxSaga/Auth"
import { globalModal } from "@/components/Modals/GlobalModal"

const TFFN = LOGIN_FIELD_NAME

const Login = () => {
 const methods = useForm({
  mode: "onSubmit",
  resolver: yupResolver(testSchema),
 })

 const {
  control,
  getValues,
  setValue,
  handleSubmit,
  formState: { errors },
 } = methods

 const dispatch = useAppDispatch()

 const onSubmit = () => {
  const user = ['nhanvien', 'admin', 'tp', 'qltt', 'gdk']
  if (user.includes(getValues()[TFFN.USER_NAME])) {
   console.log("values", getValues())
   dispatch(AuthActions.loginSuccess({ isSignIn: true, userName: getValues()[TFFN.USER_NAME] }))
  } else {
   globalModal.open({
    title: 'Tên đăng nhập không tồn tại',
    children: undefined
   })
  }

 }

 const onError = () => {
  console.log({ errors })
 }

 return (
  <Box
   sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

   }}>
   <Card
    sx={{
     width: "50%",
     p: 5,
     m: 5,
     minHeight: '60vh',
    }}
   >
    <CardHeader title='Đăng nhập' />
    <CardContent>
     <FormInput
      label='Tên đăng nhập'
      placeholder='Nhập tên đăng nhập'
      control={control}
      name={TFFN.USER_NAME}
      type={typeInputComponent.InputText}
      errorMessage={errors[TFFN.USER_NAME]?.message}
     />
     <FormInput
      label='Mật khẩu'
      placeholder='Nhập mật khẩu'
      control={control}
      name={TFFN.PASSWORD}
      type={typeInputComponent.InputText}
      inputType={typeTextInput.password}
      errorMessage={errors[TFFN.PASSWORD]?.message}
     />
    </CardContent>
    <CardActions>
     <CustomButton
      variant="contained"
      sx={{ width: '100%' }}
      title='Đăng nhập'
      onClick={() => {
       console.log("log")
       handleSubmit(onSubmit, onError)()
      }}
     />
    </CardActions>
   </Card>
  </Box>
 )
}

export default Login

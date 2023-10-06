import React from "react"
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
import { TEST_FORM_FIELD_NAME } from "./fieldname"
import { testSchema } from "./validate"
import { typeInputComponent } from "@/components/FormInput/helper"
import { CustomButton } from "@/components"
import { isEmpty } from "ramda"

const TFFN = TEST_FORM_FIELD_NAME

const select_options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 3" },
]

const TestForm = () => {
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

  const onSubmit = () => {
    console.log("values", getValues())
  }

  const onError = () => {
    console.log({ errors })
  }
  return (
    <Box>
      <Card
        sx={{
          width: "50%",
          p: 5,
          m: 5,
        }}
      >
        <CardHeader title='Test Form' />
        <CardContent>
          <FormInput
            label='Input Text'
            placeholder='Type sth ...'
            control={control}
            name={TFFN.INPUT_TEXT}
            type={typeInputComponent.InputText}
            errorMessage={errors[TFFN.INPUT_TEXT]?.message}
          />
          <FormInput
            label='Input Select'
            placeholder='Type sth ...'
            control={control}
            name={TFFN.INPUT_SELECT}
            options={select_options}
            type={typeInputComponent.InputSelect}
            errorMessage={errors[TFFN.INPUT_SELECT]?.message}
          />
          <FormInput
            label='Input Date'
            placeholder='Type sth ...'
            control={control}
            name={TFFN.INPUT_DATE}
            type={typeInputComponent.InputDate}
            errorMessage={errors[TFFN.INPUT_DATE]?.message}
          />
          <FormInput
            label='Input Checkbox'
            control={control}
            name={TFFN.INPUT_CHECKBOX}
            type={typeInputComponent.InputCheckbox}
            errorMessage={errors[TFFN.INPUT_CHECKBOX]?.message}

          />
          <FormInput
            label='Input Radio'
            options={select_options}
            control={control}
            name={TFFN.INPUT_RADIO}
            type={typeInputComponent.InputRadio}
            errorMessage={errors[TFFN.INPUT_RADIO]?.message}
          />
        </CardContent>
        <CardActions>
          <CustomButton
            title='Submit'
            onClick={() => {
              console.log("log")
              handleSubmit(onSubmit, onError)()
            }}
          />
          <CustomButton
            title='Get value'
            onClick={() => {
              const values = getValues()
              if(!isEmpty(errors)) console.log({errors})
              console.log("log", values)
              
            }}
          />
        </CardActions>
      </Card>
    </Box>
  )
}

export default TestForm

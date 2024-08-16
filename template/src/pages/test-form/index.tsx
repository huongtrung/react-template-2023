import React, { useEffect, useRef } from "react"
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
import { Formio } from "formiojs"

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

  const containerRef = useRef(null);

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

  useEffect(() => {
    Formio.createForm(containerRef.current, {
      components: [
        {
          firstName: {
            title: 'First Name',
            key: 'firstName',
            icon: 'terminal',
            schema: {
                label: 'First Name',
                type: 'textfield',
                key: 'firstName',
                input: true
            }
        },
        lastName: {
            title: 'Last Name',
            key: 'lastName',
            icon: 'terminal',
            schema: {
              label: 'Last Name',
              type: 'textfield',
              key: 'lastName',
              input: true
            }
        },
        email: {
            title: 'Email',
            key: 'email',
            icon: 'at',
            schema: {
                label: 'Email',
                type: 'email',
                key: 'email',
                input: true
            }
        },
        phoneNumber: {
            title: 'Mobile Phone',
            key: 'mobilePhone',
            icon: 'phone-square',
            schema: {
                label: 'Mobile Phone',
                type: 'phoneNumber',
                key: 'mobilePhone',
                input: true
            }
        }
        }
      ]
    }).then(function (form) {
      form.on('submit', function (submission: any) {
        console.log(submission);
      });
    });
  }, [])

  return (
    <div style={{ flex: 1 }} ref={containerRef}></div>
  )
}

export default TestForm

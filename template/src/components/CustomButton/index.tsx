import React from 'react'
import { Button } from '@mui/material'
import { ButtonProps } from '@mui/material/Button'

interface CustomButtonProps extends ButtonProps {
  title: string
}

const CustomButton = (props: CustomButtonProps) => {
  return (
      <Button {...props}>{props.title}</Button>
  )
}

export default CustomButton
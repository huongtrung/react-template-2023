import React from 'react'
import { StyledText } from './styles'

interface CustomTextProps {
  type?: any;
  children: React.ReactNode,
  required?: boolean
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
   type,
   required
}) => {
  
  let cStyle = {}
  if (type) {
    cStyle = { ...type }
}
  return (
    <StyledText {...cStyle}>
        {children}<span style={{ color: 'red' }}>{required ? ' *' : ''}</span>
    </StyledText>
  )
}

export default CustomText

export * from "./configs";
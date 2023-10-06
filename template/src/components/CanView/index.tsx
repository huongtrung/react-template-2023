import React from "react"

interface CanViewProps {
  condition: boolean
  children: React.ReactNode
  fallbackComponent?: any
}

const CanView: React.FC<CanViewProps> = ({
  condition,
  children,
  fallbackComponent,
}) => {
  if (!condition) {
    if (fallbackComponent) {
      return fallbackComponent()
    } else {
      return null
    }
  }
  return <React.Fragment>{children}</React.Fragment>
}

export default CanView

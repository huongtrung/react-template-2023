import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

export type CheckFormType = {
  isChangeValue: boolean
  setIsChangeValue: Dispatch<SetStateAction<boolean>>
}

export const useCheckForm = (): CheckFormType => {
  const [isChangeValue, setIsChangeValue] = useState(false)

  return {
    isChangeValue,
    setIsChangeValue,
  }
}

export interface FormState {
  isChangeValue: boolean
  setIsChangeValue: (data: any) => void
}

export const CheckFormContext = createContext<FormState>({
  isChangeValue: false,
  setIsChangeValue: () => {},
})

export const useCheckFormContext = (): FormState => {
  const ctx = useContext(CheckFormContext)
  return ctx
}

const Provider = CheckFormContext.Provider
const Consumer = CheckFormContext.Consumer

export {
  Provider as CheckFormProvider,
  Consumer as CheckFormConsumer,
}

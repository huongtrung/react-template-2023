import { ROLE } from '@/constants/Constants'
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    isSignedIn: boolean
    role: string
    userName: string
}

const initialState: AuthState = {
    isSignedIn: false,
    role: '',
    userName: ''
}

const authReducer = createSlice({
    name: 'AuthRedux',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const { isSignIn, userName } = action.payload
            const user = userName?.toUpperCase().trim()
            console.log('user', user)
            if (user in ROLE) {
                state.role = user
            } else {
                state.role = 'STAFF'
            }
            state.userName = userName
            state.isSignedIn = isSignIn
        },
        logout: (state) => {
            state.userName = ''
            state.isSignedIn = false
            state.role = ''
        }
    }
})

export const AuthActions = authReducer.actions

export default authReducer.reducer
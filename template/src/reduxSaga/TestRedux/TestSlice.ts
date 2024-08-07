import { createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
    taskList: any,
    key : string,
    id : string
}

export const initialState: IInitialState = {
    taskList: [],
    key : '',
    id : ''
}

const testReducer = createSlice({
    name: 'testReducer',
    initialState,
    reducers: {
        testActionRequest: (state, action) => { },
        saveKeySuccess: (state, action) => {
            state.key = action.payload
        },
        getTaskListRequest: (state) => { },
        getTaskListSuccess: (state, action) => {
            state.taskList = action.payload
        },
        getTaskListFailed: (state, action) => {
            state.taskList = []
        },
        approveRequest: (state) => { },
        approveSuccess: (state, action) => {
        },
        approveFailed: (state, action) => {
        },
        startProcessRequest: (state) => { },
        startProcessSuccess: (state, action) => {
            state.id = action.payload
        },
        completeRequest: (state, action) => { },
    }
})

export const TestActions = testReducer.actions

export default testReducer.reducer
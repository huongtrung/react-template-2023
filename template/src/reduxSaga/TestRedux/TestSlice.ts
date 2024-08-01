import { createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
    taskList: any
}

export const initialState: IInitialState = {
    taskList: []
}

const testReducer = createSlice({
    name: 'testReducer',
    initialState,
    reducers: {
        testActionRequest: (state, action) => { },
        testActionSuccess: (state, action) => {
            console.log("test action Success")
        },
        getTaskListRequest: (state) => { },
        getTaskListSuccess: (state, action) => {
            state.taskList = action.payload
        },
        getTaskListFailed: (state, action) => {
            state.taskList = []
        },
    }
})

export const TestActions = testReducer.actions

export default testReducer.reducer
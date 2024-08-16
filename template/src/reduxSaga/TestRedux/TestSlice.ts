import { createSlice } from "@reduxjs/toolkit";

export interface IInitialState {
    taskList: any,
    key: string,
    id: string,
    processDefinitionId: string,
    assignList: any
}

export const initialState: IInitialState = {
    taskList: [],
    key: '',
    id: '',
    processDefinitionId: '',
    assignList: []
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
        startProcessRequest: (state,action) => { },
        startProcessSuccess: (state, action) => {
            state.id = action.payload
        },
        processDefinitionKeyRequest: (state, action) => { },
        processDefinitionKey2Request: (state, action) => { },
        processDefinitionKeySuccess: (state, action) => {
            state.processDefinitionId = action.payload
         },
        completeRequest: (state, action) => { },
        claimUser: (state, action) => { },
        getAssignListRequest: (state, action) => { },
        getAssignListSuccess: (state, action) => {
            state.assignList = action.payload
        },
        getAssignListFailed: (state, action) => {
            state.assignList = []
        },
        claimUserByManager: (state, action) => {},
    }
})

export const TestActions = testReducer.actions

export default testReducer.reducer
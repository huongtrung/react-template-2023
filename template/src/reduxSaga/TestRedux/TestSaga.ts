/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { TestActions } from './TestSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { globalLoading } from '@/components/GlobalLoading'
import Api from '@/utils/Api'
import APIConfig from '@/constants/APIConfig'

export function* watchTestSaga() {
    yield all([
        takeLatest(TestActions.testActionRequest.type, handleGetMyProfile),
        takeLatest(TestActions.getTaskListRequest.type, handleGetTaskList),
      ])
}

function* handleGetMyProfile(action: PayloadAction<any>) {
    yield put(TestActions.testActionSuccess({}))
}

function* handleGetTaskList(action: PayloadAction<any>) : any {
    try {
        globalLoading.show()
        const api = () => Api.fetch({
            url : APIConfig.API_URL,
            config : {method: 'GET'}
        })
        const response = yield call(api)
        console.log('response', response)
        globalLoading.hide()
       
    } catch (error) {
        globalLoading.hide()
        console.log('err', error)
    }
}
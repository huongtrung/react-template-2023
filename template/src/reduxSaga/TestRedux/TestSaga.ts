/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { TestActions } from './TestSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { globalLoading } from '@/components/GlobalLoading'
import Api from '@/utils/Api'
import APIConfig from '@/constants/APIConfig'

export function* watchTestSaga() {
    yield all([
        takeLatest(TestActions.getTaskListRequest.type, handleGetTaskList),
        takeLatest(TestActions.approveRequest.type, handleApproveRequest),
        takeLatest(TestActions.startProcessRequest.type, handleStartProcessRequest),
        takeLatest(TestActions.completeRequest.type, handleCompleteRequest),
    ])
}

function* handleGetTaskList(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const api = () => Api.fetch({
            url: APIConfig.API_URL + '/engine-rest/task',
            config: { method: 'GET' }
        })
        const response = yield call(api)
        console.log('response', response)
        if (response.data) {
            yield put(TestActions.getTaskListSuccess(response?.data))
        } else {
            yield put(TestActions.getTaskListFailed(response?.data))
        }
        globalLoading.hide()

    } catch (error) {
        globalLoading.hide()
        console.log('err', error)
    }
}

function* handleApproveRequest(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const api = () => Api.fetch({
            url: APIConfig.API_URL + '/task',
            config: { method: 'POST' }
        })
        const response = yield call(api)
        globalLoading.hide()

    } catch (error) {
        globalLoading.hide()
        console.log('err', error)
    }
}

function* handleStartProcessRequest(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const api = () => Api.fetch({
            url: APIConfig.API_URL + `/engine-rest/process-definition/key/${action.payload}/start`,
            config: { method: 'POST', data: {} }
        })
        const response = yield call(api)
        console.log('response', response)
        yield put(TestActions.startProcessSuccess(response?.data?.id))
        globalLoading.hide()

    } catch (error) {
        globalLoading.hide()
        console.log('err', error)
    }
}

function* handleCompleteRequest(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const { id, data } = action.payload
        const api = () => Api.fetch({
            url: APIConfig.API_URL + `/task/${id}/complete`,
            config: { method: 'POST', data }
        })
        const response = yield call(api)
        console.log('response', response)
        globalLoading.hide()
    } catch (error) {
        globalLoading.hide()
        console.log('err', error)
    }
}


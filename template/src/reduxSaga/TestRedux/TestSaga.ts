/* eslint-disable @typescript-eslint/no-explicit-any */
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { TestActions } from './TestSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { globalLoading } from '@/components/GlobalLoading'
import Api from '@/utils/Api'
import APIConfig from '@/constants/APIConfig'
import { globalModal } from '@/components/Modals/GlobalModal'

export function* watchTestSaga() {
    yield all([
        takeLatest(TestActions.getTaskListRequest.type, handleGetTaskList),
        takeLatest(TestActions.approveRequest.type, handleApproveRequest),
        takeLatest(TestActions.startProcessRequest.type, handleStartProcessRequest),
        takeLatest(TestActions.completeRequest.type, handleCompleteRequest),
        takeLatest(TestActions.claimUserByManager.type, handleCompleteManagerRequest),
        takeLatest(TestActions.processDefinitionKeyRequest.type, handleProcessDefinitionKeyRequest),
        takeLatest(TestActions.processDefinitionKey2Request.type, handleProcessDefinitionKey2Request),
        takeLatest(TestActions.claimUser.type, handleClaimRequest),
        takeLatest(TestActions.getAssignListRequest.type, handleGetAssignList),
    ])
}

function* handleGetAssignList(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const api = () => Api.fetch({
            url: APIConfig.API_URL + '/engine-rest/task?assignee=' + action.payload,
            config: { method: 'GET' }
        })
        const response = yield call(api)
        console.log('response', response)
        globalLoading.hide()
        if (response.data) {
            yield put(TestActions.getAssignListSuccess(response?.data))
        } else {
            yield put(TestActions.getAssignListFailed(response?.data))
        }

    } catch (error) {
        globalLoading.hide()
        console.log('err', error)
        globalModal.open({
            title: 'Lỗi hệ thống ! Hãy thử lại sau.',
            children: undefined
        })
    }
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
        globalLoading.hide()
        if (response.data) {
            yield put(TestActions.getTaskListSuccess(response?.data))
        } else {
            yield put(TestActions.getTaskListFailed(response?.data))
        }

    } catch (error) {
        globalLoading.hide()
        console.log('err', error)
        globalModal.open({
            title: 'Lỗi hệ thống ! Hãy thử lại sau.',
            children: undefined
        })
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
        console.log('response', response)
        globalLoading.hide()

    } catch (error) {
        globalLoading.hide()
        globalModal.open({
            title: 'Lỗi hệ thống ! Hãy thử lại sau.',
            children: undefined
        })
        console.log('err', error)
    }
}

function* handleStartProcessRequest(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const { key, callback } = action.payload
        const api = () => Api.fetch({
            url: APIConfig.API_URL + `/engine-rest/process-definition/key/${key}/start`,
            config: { method: 'POST', data: {} }
        })
        const response = yield call(api)
        console.log('response', response)
        yield put(TestActions.startProcessSuccess(response?.data?.id))
        globalLoading.hide()
        callback(response?.data?.id)
    } catch (error) {
        globalLoading.hide()
        globalModal.open({
            title: 'Lỗi hệ thống ! Hãy thử lại sau.',
            children: undefined
        })
        console.log('err', error)
    }
}

function* handleProcessDefinitionKeyRequest(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const { id, key, callback } = action.payload
        const api = () => Api.fetch({
            url: APIConfig.API_URL + `/engine-rest/task?processDefinitionKey=${key}`,
            config: { method: 'GET' }
        })
        const response = yield call(api)
        console.log('response', response)
        globalLoading.hide()
        if (response.data) {
            const result = response.data?.find((item: any) => item.processInstanceId == id)
            yield put(TestActions.processDefinitionKeySuccess(result?.id))
        } else {
            globalModal.open({
                title: 'Gửi đơn xin phép không thành công',
                children: undefined
            })
        }
    } catch (error) {
        globalLoading.hide()
        globalModal.open({
            title: 'Lỗi hệ thống ! Hãy thử lại sau.',
            children: undefined
        })
        console.log('err', error)
    }
}

function* handleProcessDefinitionKey2Request(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const { id, key, callback2 } = action.payload
        const api = () => Api.fetch({
            url: APIConfig.API_URL + `/engine-rest/task?processDefinitionKey=${key}&processInstanceId=${id}`,
            config: { method: 'GET' }
        })
        const response = yield call(api)
        console.log('response', response)
        globalLoading.hide()
        if (!!response.data?.[0]?.id) {
            callback2(response.data?.[0]?.id)
        } else {
            globalModal.open({
                title: 'Gửi đơn xin phép không thành công',
                children: undefined
            })
        }

    } catch (error) {
        globalLoading.hide()
        globalModal.open({
            title: 'Lỗi hệ thống ! Hãy thử lại sau.',
            children: undefined
        })
        console.log('err', error)
    }
}

function* handleCompleteRequest(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const { id, data, callback } = action.payload
        const api = () => Api.fetch({
            url: APIConfig.API_URL + `/engine-rest/task/${id}/complete`,
            config: { method: 'POST', data }
        })
        const response = yield call(api)
        console.log('response', response)
        globalLoading.hide()
        if (response.status == 204) {
            callback()
        } else {
            globalModal.open({
                title: 'Gửi đơn xin phép không thành công',
                children: undefined
            })
        }
    } catch (error) {
        globalLoading.hide()
        globalModal.open({
            title: 'Lỗi hệ thống ! Hãy thử lại sau.',
            children: undefined
        })
        console.log('err', error)
    }
}

function* handleCompleteManagerRequest(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const { id, data, callback } = action.payload
        const api = () => Api.fetch({
            url: APIConfig.API_URL + `/engine-rest/task/${id}/complete`,
            config: { method: 'POST', data }
        })
        const response = yield call(api)
        console.log('response', response)
        globalLoading.hide()
        if (response.status == 204) {
            globalModal.open({
                title: 'Duyệt đơn xin nghỉ thành công',
                okText: 'OK',
                children: null
            })
            callback()
        } else {
            globalModal.open({
                title: 'Duyệt đơn xin nghỉ không thành công',
                okText: 'OK',
                children: undefined
            })
        }
    } catch (error) {
        globalLoading.hide()
        globalModal.open({
            title: 'Lỗi hệ thống ! Hãy thử lại sau.',
            children: undefined
        })
        console.log('err', error)
    }
}

function* handleClaimRequest(action: PayloadAction<any>): any {
    try {
        globalLoading.show()
        const { id, data, callBack2 } = action.payload
        const api = () => Api.fetch({
            url: APIConfig.API_URL + `/engine-rest/task/${id}/claim`,
            config: { method: 'POST', data }
        })
        const response = yield call(api)
        console.log('response', response)
        globalLoading.hide()
        if (response.status == 200 || response.status == 204) {
            globalModal.open({
                title: 'Gửi đơn xin phép thành công',
                children: undefined
            })
        } else {
            globalModal.open({
                title: 'Gửi đơn xin phép không thành công',
                children: undefined
            })
        }

    } catch (error) {
        globalModal.open({
            title: 'Lỗi hệ thống ! Hãy thử lại sau.',
            children: undefined
        })
        globalLoading.hide()
        console.log('err', error)
    }
}


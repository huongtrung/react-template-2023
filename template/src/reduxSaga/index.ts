import { all, fork } from 'redux-saga/effects'
import { watchTestSaga } from './TestRedux'

export default function* reduxSaga() {
    yield all([
      fork(watchTestSaga)
    ])
  }
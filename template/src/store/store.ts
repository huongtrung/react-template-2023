import {
  MiddlewareArray,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import logger from "redux-logger"
import reduxSaga from "@/reduxSaga"
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware"
import { testReducer } from "@/reduxSaga/TestRedux"
import { authReducer } from "@/reduxSaga/Auth"

const reducers = {
  test: testReducer,
  auth: authReducer,
  // import and place reducer here
}

const rootReducers = combineReducers(reducers)

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// mount it on the Store
export const store = configureStore({
  reducer: rootReducers,
  middleware: new MiddlewareArray().concat(sagaMiddleware, logger)
})

// then run the saga
sagaMiddleware.run(reduxSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

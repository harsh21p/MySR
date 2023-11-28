import {SignUpContext} from './../../context/sign-up-context';
//import isAndroid from 'constants/platform';
import {Middleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducer';
import sagas from 'saga';
import createDebugger from 'redux-flipper';
import {configureStore, MiddlewareArray} from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware({context: SignUpContext});
const middlewares: Middleware[] = [sagaMiddleware];

if (__DEV__) {
  const reduxFlipperDebugger = createDebugger();
  middlewares.push(reduxFlipperDebugger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

//const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export {store, sagaMiddleware};

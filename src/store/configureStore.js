import { legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import modalsReducer from '../reducers/modals.reducer'
import entriesReducer from '../reducers/entries.reducer';

import createSagaMiddleware from '@redux-saga/core';
import { initSagas } from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const configureStore = ()=>{
    const store = createStore(combineReducers({
        entries: entriesReducer,
        modals: modalsReducer,
      }),
      composeWithDevTools(applyMiddleware(...middlewares))
      );
    initSagas(sagaMiddleware);
    return store;
}
export default configureStore;
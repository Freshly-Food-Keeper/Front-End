import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import user from './reducers/user'

const reducer = combineReducers({user})
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default store
export * from './reducers/user'

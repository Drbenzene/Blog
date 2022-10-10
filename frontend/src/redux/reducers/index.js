import postReducers from './postReducers'
import usersReducers from './usersReducers'
import { combineReducers } from 'redux'


export const rootReducer = combineReducers({
    posts: postReducers,
    users: usersReducers
})
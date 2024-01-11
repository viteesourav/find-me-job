import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'

// combining all the reducers into a single root reducer...
const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer;
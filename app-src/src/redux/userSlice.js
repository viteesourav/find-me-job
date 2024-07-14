import { createSlice } from '@reduxjs/toolkit';
import { users } from '../utils/data';

//initial userState..
const initialState = {
    user: JSON.parse(window?.localStorage.getItem('userInfo')) ??  {},//users[1],
}

const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        login: ((state, action) => {
            const userData = action.payload.user;
            state.user = userData;
            state.user && window.localStorage.setItem('userInfo', JSON.stringify(state.user));
        }),

        logout: ((state, action) => {
            state.user = null;
            window.localStorage.removeItem('userInfo'); //Clear the saved userInfo from localStorage..
            window.location.replace('/user-auth'); //re-direct to auth-page...
        })
    }
})

export default userSlice.reducer; //exporting the reducer for userInfo slice.
export const {login, logout} = userSlice.actions; //exporting the needed actions for the userInfo slice.
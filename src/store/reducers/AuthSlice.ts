import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState, store} from "../store";
import {IUser} from "../../models/IUser";

type AuthState = {
    user: IUser | null
    jwt: string | null
}


const slice = createSlice({
    name: 'auth',
    initialState: { user: null, jwt: null } as AuthState,
    reducers: {
        setCredentials: (
            state,
            { payload: { user, jwt } }: PayloadAction<AuthState>
        ) => {
            console.log("SETCRED", user, jwt);
            state.user = user;
            state.jwt = jwt;
        },
    },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user

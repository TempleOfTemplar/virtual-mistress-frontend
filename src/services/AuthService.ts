import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {RootState} from "../store/store";
import {IUser} from "../models/IUser";


export interface UserResponse {
    user: IUser;
    jwt: string
}

export interface LoginRequest {
    identifier: string
    password: string
}

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1337/api',
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.jwt;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/local',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        protected: builder.mutation<{ message: string }, void>({
            query: () => 'protected',
        }),
    }),
})

export const { useLoginMutation, useProtectedMutation } = api

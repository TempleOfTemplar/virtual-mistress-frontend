import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IToy} from "../models/IToy";
import {RootState} from "../store/store";

export const toysAPI = createApi({
    reducerPath: 'toysAPI',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:1337/api',
            prepareHeaders: (headers, { getState }) => {
                // By default, if we have a token in the store, let's use that for authenticated requests
                const token = (getState() as RootState).auth.jwt;
                if (token) {
                    headers.set('authorization', `Bearer ${token}`)
                }
                return headers
            },
        }
    ),
    endpoints: (build) => ({
        fetchAllToys: build.query<IToy[], null>({
            transformResponse: (baseQueryReturnValue)=> {
                return (baseQueryReturnValue as any).data;
            },
            query: () => '/toys'
        })
    })
});

export const {useFetchAllToysQuery} = toysAPI;
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICategory} from "../models/ICategory";
import {RootState} from "../store/store";

export const categoriesAPI = createApi({
    reducerPath: 'categoriesAPI',
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
        fetchAllCategories: build.query<ICategory[], null>({
            transformResponse: (baseQueryReturnValue)=> {
                return (baseQueryReturnValue as any).data;
            },
            query: () => '/categories'
        })
    })
});

export const {useFetchAllCategoriesQuery} = categoriesAPI;
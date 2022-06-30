import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ITask} from "../models/ITask";
import qs from "qs";
import {RootState} from "../store/store";
import {useAuthHeader} from "react-auth-kit";

export const tasksAPI = createApi({
    reducerPath: 'tasksAPI',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:1337/api',
            prepareHeaders: (headers, { getState }) => {
                // By default, if we have a token in the store, let's use that for authenticated requests
                const state = (getState() as RootState);
                console.log("state", state);
                const token = (getState() as RootState).auth.jwt;
                if (token) {
                    headers.set('authorization', `Bearer ${token}`)
                }
                return headers
            },
        }
    ),
    endpoints: (build) => ({
        fetchAllTasks: build.query<ITask[], { categories?: any[], toys?: any[] }>({
            transformResponse: (baseQueryReturnValue) => {
                return (baseQueryReturnValue as any).data;
            },
            query: (data) => {
                const filters: any = {};
                if(data.categories) {
                    filters.categories = {
                        id: {
                            $in: data.categories
                        }
                    }
                }
                if(data.toys) {
                    filters.toys = {
                        id: {
                            $in: data.toys
                        }
                    }
                }
                const query = qs.stringify({
                    filters
                }, {
                    encodeValuesOnly: true, // prettify url
                });
                return `/tasks?${query}`;
            }
        })
    })
});

export const {useFetchAllTasksQuery} = tasksAPI;
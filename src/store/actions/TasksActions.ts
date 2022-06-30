import {AppDispatch} from "../store";
import http from "../../http-common";
import {tasksSlice} from "../reducers/TasksSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITask} from "../../models/ITask";

// export const fetchTasks = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(tasksSlice.actions.tasksFetching());
//         const response = await http.get<ITask[]>("tasks");
//         dispatch(tasksSlice.actions.tasksFetchingSuccess(response.data));
//     } catch (error: any) {
//         dispatch(tasksSlice.actions.tasksFetchingError(error.message));
//     }
// }

export const fetchTasks = createAsyncThunk(
    'tasks/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await http.get<{ data: ITask[] }>("tasks");
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)
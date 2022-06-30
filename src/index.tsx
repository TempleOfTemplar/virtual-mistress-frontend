import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {store} from "./store/store";
import 'antd/dist/antd.css';
import {TasksList} from "./components/TasksList";
import Task from "./components/Task";
import LoginForm from "./components/LoginForm";
import RequireAuth from "./components/RequireAuth";
import {setCredentials} from "./store/reducers/AuthSlice";

if (localStorage.jwtToken) {
    // Set auth token header auth
    const user = localStorage.jwtToken;
    store.dispatch(setCredentials(JSON.parse(user)))
}


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App/>}>
                        </Route>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route
                            path="/tasks"
                            element={
                                <RequireAuth>
                                    <TasksList/>
                                </RequireAuth>
                            }
                        />
                        <Route path="tasks/:taskId" element={<Task/>}/>
                    </Routes>
                </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

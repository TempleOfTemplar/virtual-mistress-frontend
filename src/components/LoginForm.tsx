import {Button, Checkbox, Form, Input} from 'antd';
import React, {useState} from 'react';
import {useLoginMutation} from "../services/AuthService";
import {useNavigate} from "react-router-dom";
import {IUser} from "../models/IUser";
import {useDispatch} from "react-redux";
import {setCredentials} from "../store/reducers/AuthSlice";

interface ILoginResponse {
    jwt: string;
    user: IUser;
}

const LoginForm: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({identifier: '', password: ''})
    const [login, { isLoading }] = useLoginMutation()
    const onFinish = async (values: any) => {
        const data = await login(values).unwrap();
        localStorage.setItem("jwtToken", JSON.stringify(data));
        dispatch(setCredentials(data))
        navigate('/tasks');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="identifier"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input onChange={(e)=>setFormData({...formData, identifier: e.target.value})}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password onChange={(e)=>setFormData({...formData, password: e.target.value})}/>
            </Form.Item>

            <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
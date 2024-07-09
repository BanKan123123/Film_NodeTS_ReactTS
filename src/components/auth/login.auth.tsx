import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login: React.FC = () => {
    type FieldType = {
        username: string;
        password: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password } = values;

        await axios
            .post('http://localhost:4001/api/v1/users/login', { username, password }, { headers: { 'Content-Type': 'application/json' } })
            .then((res: any) => {
                if (res.data) {
                    if (res.data.data) {
                        localStorage.setItem('token', res.data.token);
                        toast.success('Login Success');
                    } else {
                        toast.error('Login Error');
                    }
                }
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.message);
                }
            });
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('err', errorInfo);
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
      };

    return (
        <>
            <h1>Login Working</h1>

            <ToastContainer />

            <Form name="basic" wrapperCol={{ span: 16 }} initialValues={{ remember: true }} autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item<FieldType> label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input type="password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;

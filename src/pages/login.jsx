import React from 'react';
import {Button, Form, Input, notification} from 'antd';
import {loginApi} from "../util/api.js";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../components/context/auth.context.jsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const {setAuth} = React.useContext(AuthContext);
    const onFinish = async (values) => {
        const {email, password} = values;
        const res = await loginApi( email, password);
        // debugger
        if(res && res.EC === 0) {
            // Save user data to local storage or context if needed
            localStorage.setItem('accessToken', res.accessToken);
            notification.success({
                message: 'Login Successful',
                description: 'You can now log in.',
            });
            // Set auth context
            setAuth({
                isAuthenticated: true,
                user: {
                    name: res?.user?.name ?? "", // Assuming the response contains user name
                    email: res?.user?.email ?? "", // Assuming the response contains user email
                }, // Assuming the response contains user data
            });
            // Redirect to home page after successful registration
            navigate('/');
        }
        else {
            notification.error({
                message: 'Login Failed',
                description: res?.EM ?? 'Error',
            })
        }
        console.log('>> Success:', values);
    };
    return (
        <div style={{margin: 50}}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}

                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginPage;
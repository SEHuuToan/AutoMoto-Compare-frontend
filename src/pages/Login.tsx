import React from "react";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Layout, Image, Card, message } from 'antd';
import { Content } from "antd/es/layout/layout";
import imgLoginPage from "../assets/loginPage.svg";
import { axiosLogin } from "../utils/axiosUtils";

type loginFieldType = {
    userName?: string;
    password?: string;
    remember?: boolean;
};
type forgotPasswordType = {
    email?: string;
    newPassword?: string;
    confirmPassword?: string;
}
const onFinish: FormProps<loginFieldType>['onFinish'] = async (values) => {
    try {
        const { userName, password } = values;
        const response = await axiosLogin('auth/log-in', { userName, password});
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        message.success("Login successful");
        window.location.href = '/';
    } catch (error) {
        console.error('Login failed:', error);
        message.error("Login failed. Please check your credentials.");
    }
};

const onFinishFailed: FormProps<loginFieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
    const switchToRegister = () => {
       
    }
    return (
        <Layout className="flex flex-row items-center justify-center justify-items-center bg-gray-100 px-6 h-screen w-screen">
           <div className="flex justify-center items-center bg-gray-100">
                <div className="hidden sm:block w-[75%]">
                    <Image 
                        preview={false}
                        className=""
                        src={imgLoginPage}
                    />  
                </div>
           </div>
           <Content className="h-[70%] flex flex-col justify-center">
                <Card bordered className="flex flex-col items-center justify-center h-full">
                    <span className="font-sans font-medium text-2xl">
                        Welcome to <span className="font-bold font-sans text-blue-600"> AutoMoTo Compare </span>
                    </span>
                    <Form   
                        className="flex flex-col flex-grow justify-center w-[100%] h-[100%]"
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >   
                        <Form.Item<loginFieldType>
                            label="User Name"
                            name="userName"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input className="w-[100%]"/>
                        </Form.Item>

                        <Form.Item<loginFieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password className="w-[100%]"/>
                        </Form.Item>

                        <div className="flex items-center justify-between h-10 pt-4">
                            <Form.Item<loginFieldType> className="flex content-center items-center" name="remember" valuePropName="checked" label={null}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                      
                            <Form.Item>
                                <Button onClick={switchToRegister} type="link">Forgot password</Button>
                            </Form.Item>
                        </div>

                        <Form.Item label={null}>
                            <Button type="primary" className="font-medium text-lg" htmlType="submit" block>
                                Login
                            </Button>
                        </Form.Item>
                        <div className="flex items-center justify-start h-10 gap-2">
                            <Form.Item>Don't have an account?</Form.Item>
                            <Form.Item>
                                <Button className="p-0" type="link">Register now</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Card>
           </Content>
        </Layout>
    )
}
export default Login
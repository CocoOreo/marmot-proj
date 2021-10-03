import { Button, Divider, Form, Input } from "antd"
import { useAuth } from "context/auth-context"
import React from "react"
import { KeyOutlined, UserOutlined } from '@ant-design/icons';

export const LoginScreen = () => {
    const { login } = useAuth()
    const handleSubmit = (values: { username: string, password: string }) => {
        // ev.preventDefault()
        // const username = (ev.currentTarget.elements[0] as HTMLInputElement).value
        // const password = (ev.currentTarget.elements[1] as HTMLInputElement).value
        login(values)
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input type={"text"} placeholder={"Username"}
                    prefix={<UserOutlined />}
                    allowClear={true}
                ></Input>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input.Password placeholder={"Password"} prefix={<KeyOutlined />} allowClear={true}></Input.Password>
            </Form.Item>
            <Divider />
            <Form.Item>
                <Button style={{ width: "85%" }} htmlType='submit' type="primary">Log In</Button>
            </Form.Item>
        </Form>
    )
}
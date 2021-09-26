import { UserOutlined, KeyOutlined } from "@ant-design/icons"
import { Form, Input, Divider, Button } from "antd"
import { useAuth } from "context/auth-context"
import React from "react"

export const RegisterScreen = () => {
    const { register } = useAuth()
    const handleSubmit = (values: { username: string, password: string, cpassword: string }) => {
        // original input callback method
        // ev.preventDefault()
        // const username = (ev.currentTarget.elements[0] as HTMLInputElement).value
        // const password = (ev.currentTarget.elements[1] as HTMLInputElement).value
        const { username, password, cpassword } = values
        if (password === cpassword) {
            register({ username, password })
        } else {
            console.log('Confirm Error')
        }
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name="username">
                <Input type={"text"} placeholder={"Username"} prefix={<UserOutlined />} allowClear={true}></Input>
            </Form.Item>
            <Form.Item name="password">
                <Input.Password placeholder={"Password"} prefix={<KeyOutlined />} allowClear={true}></Input.Password>
            </Form.Item>
            <Form.Item name="cpassword">
                <Input.Password placeholder={"Confirm Password"} prefix={<KeyOutlined />} allowClear={true}></Input.Password>
            </Form.Item>
            <Divider />
            <Form.Item>
                <Button type="primary" htmlType={'submit'}>Register Now</Button>
            </Form.Item>
        </Form>
    )
}
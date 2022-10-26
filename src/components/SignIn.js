import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
const SignIn = () => {
  const navigate = useNavigate()
  const onFinish = async values => {
    console.log('Received values of form: ', values)
    try {
      const userLogin = {
        username: values.username,
        password: values.password
      }
      const res = await axios.post('https://www.task-manager.api.mvn-training.com/auth/login', userLogin)
      console.log(res.data)
      localStorage.setItem('token', res.data.data.accessToken)
      localStorage.setItem('username', res.data.data.username)
      localStorage.setItem('userId', res.data.data.id)
      navigate('/tasks')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="form">
      <h3 className="heading">Sign In</h3>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <span>If you dont have an account click
          <NavLink
            style={{ color: "blue" }}
            to="/sign-up"
          > here
          </NavLink>
        </span>
        <div className="display-center">
          <Button
            style={{ width: "120px", height: "40px", borderRadius: "5px", fontSize: "18px" }}
            className="form-btn"
            type='primary'
            htmlType="submit">
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default SignIn
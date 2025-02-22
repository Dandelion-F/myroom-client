import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Notification } from '@douyinfe/semi-ui';
import { IconUnlock, IconUser, IconSafe } from '@douyinfe/semi-icons';
import Welcome from '../../components/Welcome';
import { asyncRegister } from '../../store/slice/registerSlice';
import './index.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { redirectTo } = useSelector((state) => {
    return {
      redirectTo: state.registerData.redirectTo,
    };
  });

  // 注册成功后返回重定向的路由（重定向到login）
  const navigate = useNavigate();
  if (redirectTo) {
    navigate(redirectTo);
    Notification.success({
      title: '注册成功,请登陆',
      duration: 3,
      position: 'top',
    });
  }

  function handleChange(value, e) {
    let key = e.target.name;
    if (key === 'username') {
      setUsername(value);
    } else if (key === 'password') {
      setPassword(value);
    } else {
      setPasswordConfirm(value);
    }
  }

  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    let user = {
      username,
      password,
      passwordConfirm,
    };
    dispatch(asyncRegister(user));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="register_content">
        <Welcome />
        <br />
        <Input
          placeholder="请输入用户名"
          prefix={<IconUser />}
          name="username"
          onChange={handleChange}
        ></Input>
        <br />
        <br />
        <Input
          mode="password"
          placeholder="请输入密码"
          prefix={<IconUnlock />}
          name="password"
          onChange={handleChange}
        ></Input>
        <br />
        <br />
        <Input
          mode="password"
          placeholder="请再次确认密码"
          prefix={<IconSafe />}
          name="passwordConfirm"
          onChange={handleChange}
        ></Input>
        <br />
        <br />
        <Button
          theme="solid"
          type="primary"
          style={{ marginRight: 0 }}
          block
          htmlType="submit"
        >
          注册
        </Button>
      </div>
    </form>
  );
}

export default Register;

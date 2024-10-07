import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      user => user.email === form.email && user.password === form.password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      navigate('/contacts');
    } else {
      alert('Email ou senha incorretos');
    }
  };

  return (
    <form>
      <TextField label="Email" name="email" onChange={handleInputChange} />
      <TextField type="password" label="Senha" name="password" onChange={handleInputChange} />
      <Button onClick={handleLogin}>Entrar</Button>
    </form>
  );
};

export default Login;

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
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
      onLoginSuccess(); // Atualiza o estado de autenticação no App
      navigate('/contacts'); // Redireciona para a página de contatos
    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <TextField
        label="Email"
        name="email"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        type="password"
        label="Senha"
        name="password"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Entrar
      </Button>
    </form>
  );
};

export default Login;




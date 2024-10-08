import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage(''); // Resetando erro ao digitar
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
      const emailExists = users.some(user => user.email === form.email);
      setErrorMessage(emailExists ? 'Senha incorreta. Tente novamente.' : 'Email não encontrado. Deseja se cadastrar?');
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <TextField 
        label="Email" 
        name="email" 
        onChange={handleInputChange} 
        fullWidth 
        margin="normal"
        required
      />
      <TextField 
        type="password" 
        label="Senha" 
        name="password" 
        onChange={handleInputChange} 
        fullWidth 
        margin="normal"
        required
      />
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
          <br />
          {errorMessage.includes('Deseja se cadastrar?') && (
            <Button onClick={() => navigate('/signup')} style={{ marginTop: '10px' }}>
              Fazer Cadastro
            </Button>
          )}
        </div>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Entrar
      </Button>
    </form>
  );
};

export default Login;






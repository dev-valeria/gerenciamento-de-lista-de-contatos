import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { validate } from 'gerador-validador-cpf'; 
import { useNavigate } from 'react-router-dom'; 

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', cpf: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Resetando erro ao digitar
  };

  const handleSignUp = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const emailExists = users.some(user => user.email === form.email);
    if (emailExists) {
      setError('Este e-mail já está cadastrado.');
      return;
    }

    if (!validate(form.cpf)) {
      setError('CPF inválido.');
      return;
    }

    // Adicionando validações adicionais
    if (!form.name || !form.password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Usuário cadastrado com sucesso!');
    
    navigate('/login');
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <TextField
        label="Nome"
        name="name"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
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
      <TextField
        label="CPF"
        name="cpf"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Cadastrar
      </Button>
    </form>
  );
};

export default SignUp;



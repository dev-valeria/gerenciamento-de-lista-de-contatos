import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { validate } from 'gerador-validador-cpf'; // Importa corretamente a função de validação
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', cpf: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verifica se o e-mail já está cadastrado
    const emailExists = users.some(user => user.email === form.email);
    if (emailExists) {
      setError('Este e-mail já está cadastrado.');
      return;
    }

    // Valida o CPF
    if (!validate(form.cpf)) {
      setError('CPF inválido.');
      return;
    }

    // Adiciona o novo usuário
    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Usuário cadastrado com sucesso!');
    
    // Redireciona para a página de login após o cadastro
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
      />
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
      <TextField
        label="CPF"
        name="cpf"
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Cadastrar
      </Button>
    </form>
  );
};

export default SignUp;


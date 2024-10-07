import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    // Verificar se o email já existe no LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === form.email);
    
    if (existingUser) {
      alert('E-mail já cadastrado!');
      return;
    }

    // Salvar usuário no LocalStorage
    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário cadastrado com sucesso!');
  };

  return (
    <form>
      <TextField label="Nome" name="name" onChange={handleInputChange} />
      <TextField label="Email" name="email" onChange={handleInputChange} />
      <TextField type="password" label="Senha" name="password" onChange={handleInputChange} />
      <Button onClick={handleSignUp}>Cadastrar</Button>
    </form>
  );
};

export default SignUp;

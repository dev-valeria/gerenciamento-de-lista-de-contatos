import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { cpf } from 'cpf-cnpj-validator';
import { searchAddress } from '../services/addressService'; // Importa a função de busca de endereço

const AddContact = ({ onAddContact }) => {
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    phone: '',
    address: {
      uf: '',
      city: '',
      street: '',
      cep: '',
      complement: '',
      lat: '',
      lng: ''
    }
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const addressField = name.split('.')[1];
      setForm({ ...form, address: { ...form.address, [addressField]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!form.name) {
      formErrors.name = 'Nome é obrigatório';
    }

    if (!cpf.isValid(form.cpf)) {
      formErrors.cpf = 'CPF inválido';
    }

    if (!form.phone) {
      formErrors.phone = 'Telefone é obrigatório';
    }

    if (!form.address.uf || !form.address.city || !form.address.street || !form.address.cep) {
      formErrors.address = 'Endereço completo é obrigatório';
    }

    return formErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Limpar erros
    setErrors({});

    // Armazenar o contato no LocalStorage (simulando uma base de dados local)
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push({ ...form, id: contacts.length + 1 });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Feedback e reset do formulário
    alert('Contato cadastrado com sucesso!');
    setForm({
      name: '',
      cpf: '',
      phone: '',
      address: {
        uf: '',
        city: '',
        street: '',
        cep: '',
        complement: '',
        lat: '',
        lng: ''
      }
    });

    if (onAddContact) onAddContact();
  };

  const handleAddressSearch = async () => {
    const { uf, city, street } = form.address;

    try {
      const results = await searchAddress(uf, city, street);
      if (results.length > 0) {
        const firstResult = results[0];
        setForm({
          ...form,
          address: {
            ...form.address,
            street: firstResult.logradouro,
            cep: firstResult.cep,
            lat: firstResult.lat, // Simulação de latitude
            lng: firstResult.lng  // Simulação de longitude
          }
        });
      } else {
        alert('Nenhum endereço encontrado.');
      }
    } catch (error) {
      alert('Erro na busca do endereço.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        label="Nome"
        name="name"
        value={form.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="CPF"
        name="cpf"
        value={form.cpf}
        onChange={handleInputChange}
        error={!!errors.cpf}
        helperText={errors.cpf}
      />
      <TextField
        label="Telefone"
        name="phone"
        value={form.phone}
        onChange={handleInputChange}
        error={!!errors.phone}
        helperText={errors.phone}
      />
      <TextField
        label="UF"
        name="address.uf"
        value={form.address.uf}
        onChange={handleInputChange}
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        label="Cidade"
        name="address.city"
        value={form.address.city}
        onChange={handleInputChange}
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        label="Rua"
        name="address.street"
        value={form.address.street}
        onChange={handleInputChange}
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        label="CEP"
        name="address.cep"
        value={form.address.cep}
        onChange={handleInputChange}
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        label="Complemento"
        name="address.complement"
        value={form.address.complement}
        onChange={handleInputChange}
      />
      <Button type="button" onClick={handleAddressSearch}>
        Buscar Endereço
      </Button>
      <Button type="submit">Cadastrar Contato</Button>
    </form>
  );
};

export default AddContact;



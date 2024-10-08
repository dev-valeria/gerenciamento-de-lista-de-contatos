import React, { useState } from 'react';
import { cpf } from 'cpf-cnpj-validator';

const AddContact = ({ onAddContact }) => {
  const [contact, setContact] = useState({
    name: '',
    cpf: '',
    phone: '',
    address: {
      cep: '',
      street: '',
      complement: '',
      city: '',
      state: '',
      lat: '',
      lng: ''
    }
  });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setContact(prevContact => ({
        ...prevContact,
        address: {
          ...prevContact.address,
          [addressField]: value
        }
      }));
    } else {
      setContact(prevContact => ({
        ...prevContact,
        [name]: value
      }));
    }
  };

  const fetchAddressByCep = async (cep) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setFeedback('CEP inválido.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setFeedback('CEP não encontrado.');
        setContact(prevContact => ({
          ...prevContact,
          address: {
            ...prevContact.address,
            street: '',
            city: '',
            state: ''
          }
        }));
      } else {
        setContact(prevContact => ({
          ...prevContact,
          address: {
            ...prevContact.address,
            street: data.logradouro,
            city: data.localidade,
            state: data.uf
          }
        }));
        setFeedback('');
      }
    } catch (error) {
      setFeedback('Erro ao buscar o CEP.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação do CPF
    if (!cpf.isValid(contact.cpf)) {
      setFeedback('CPF inválido. Por favor, insira um CPF válido.');
      return;
    }

    // Enviar o novo contato para o componente pai
    onAddContact(contact);

    // Resetar o formulário
    setContact({
      name: '',
      cpf: '',
      phone: '',
      address: {
        cep: '',
        street: '',
        complement: '',
        city: '',
        state: '',
        lat: '',
        lng: ''
      }
    });
  };

  return (
    <div>
      <h2>Adicionar Contato</h2>
      {feedback && <p>{feedback}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={contact.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={contact.cpf}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={contact.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.cep"
          placeholder="CEP"
          value={contact.address.cep}
          onChange={(e) => {
            handleChange(e);
            fetchAddressByCep(e.target.value);
          }}
          required
        />
        <input
          type="text"
          name="address.street"
          placeholder="Rua"
          value={contact.address.street}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.complement"
          placeholder="Complemento"
          value={contact.address.complement}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.city"
          placeholder="Cidade"
          value={contact.address.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.state"
          placeholder="Estado"
          value={contact.address.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.lat"
          placeholder="Latitude"
          value={contact.address.lat}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.lng"
          placeholder="Longitude"
          value={contact.address.lng}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Contato</button>
      </form>
    </div>
  );
};

export default AddContact;






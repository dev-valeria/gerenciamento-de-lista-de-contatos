// src/pages/ContactList.js
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import ContactItem from '../components/ContactItem';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const allContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const userContacts = allContacts.filter(contact => contact.userId === loggedInUser.email);
    setContacts(userContacts);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.includes(filter) || contact.cpf.includes(filter)
  );

  return (
    <div>
      <TextField label="Buscar por Nome ou CPF" onChange={handleFilterChange} />
      <div>
        {filteredContacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactList;

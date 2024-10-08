import React, { useState } from 'react';
import AddContact from './AddContact';
import Map from '../components/Map';

const ContactList = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) || []);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    // Centralizar o mapa no contato clicado
  };

  return (
    <div>
      <AddContact onAddContact={handleAddContact} />
      <Map contacts={contacts} onContactClick={handleContactClick} />
      {selectedContact && (
        <div>
          <h2>Contato Selecionado:</h2>
          <p>{selectedContact.name}</p>
          <p>{selectedContact.address.street}, {selectedContact.address.city} - {selectedContact.address.uf}</p>
        </div>
      )}
    </div>
  );
};

export default ContactList;

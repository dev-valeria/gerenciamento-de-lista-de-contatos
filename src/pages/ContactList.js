import React, { useState, useEffect } from 'react';
import AddContact from './AddContact';
import Map from '../components/Map';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []); 

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
    localStorage.setItem('contacts', JSON.stringify([...contacts, newContact]));
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
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
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.cpf}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;



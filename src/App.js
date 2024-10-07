import React, { useState } from 'react';
import AddContact from './pages/AddContact';

function App() {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = () => {
    const updatedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(updatedContacts);
  };

  return (
    <div>
      <h1>Gerenciador de Contatos</h1>
      <AddContact onAddContact={handleAddContact} />
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>{contact.name} - {contact.cpf}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;


import React, { useState } from 'react';
import AddContact from './pages/AddContact';
import Map from './components/Map'; // Certifique-se de importar o Map corretamente

function App() {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = () => {
    const updatedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(updatedContacts);
  };

  const center = { lat: -23.5505, lng: -46.6333 }; // Coordenadas do centro (São Paulo, por exemplo)

  return (
    <div>
      <h1>Gerenciador de Contatos</h1>
      <AddContact onAddContact={handleAddContact} />
      <Map
        center={center}
        markersData={contacts.map(contact => ({
          position: {
            lat: parseFloat(contact.address?.lat) || center.lat,
            lng: parseFloat(contact.address?.lng) || center.lng,
          },
        }))}
      />
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} - {contact.cpf}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;





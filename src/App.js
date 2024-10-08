import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddContact from './pages/AddContact';
import Map from './components/Map';
import Login from './pages/Login';
import SignUp from './pages/SignUp'; // Importe a página de cadastro

function App() {
  const [contacts, setContacts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleAddContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const center = { lat: -23.5505, lng: -46.6333 }; // Coordenadas do centro (São Paulo, por exemplo)

  return (
    <Router>
      <div>
        <h1>Gerenciador de Contatos</h1>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<SignUp />} /> {/* Rota para a página de cadastro */}
          <Route 
            path="/contacts" 
            element={isAuthenticated ? (
              <>
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
              </>
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;






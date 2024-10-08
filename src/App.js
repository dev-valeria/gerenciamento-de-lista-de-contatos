import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddContact from './pages/AddContact';
import Map from './components/Map';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setCurrentUser(loggedInUser);
    setIsAuthenticated(!!loggedInUser);
  }, []);

  const handleAddContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleDeleteAccount = () => {
    if (!currentUser) {
      alert("Nenhum usuário está logado.");
      return; // Retorna se não houver usuário logado
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(user => user.email !== currentUser.email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Limpa os dados do usuário logado
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const center = { lat: -23.5505, lng: -46.6333 };

  return (
    <Router>
      <div>
        <h1>Gerenciador de Contatos</h1>
        <Routes>
          <Route 
            path="/login" 
            element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} 
          />
          <Route 
            path="/signup" 
            element={<SignUp />} 
          />
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
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleDeleteAccount}>Excluir Conta</button>
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








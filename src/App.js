import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator'; 
import AddContact from './pages/AddContact';
import Map from './components/Map';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ContactList from './pages/ContactList'; 
import './App.css'; // Importar o CSS personalizado

function App() {
  const [contacts, setContacts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setCurrentUser(loggedInUser);
    setIsAuthenticated(!!loggedInUser);
  }, []);

  const handleAddContact = (newContact) => {
    if (!cpf.isValid(newContact.cpf)) {
      setFeedback("CPF inválido. Por favor, insira um CPF válido.");
      return;
    }

    const duplicateContact = contacts.find(contact => contact.cpf === newContact.cpf);
    if (duplicateContact) {
      setFeedback("Este CPF já está cadastrado.");
      return;
    }

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setFeedback("Contato adicionado com sucesso!");
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    alert("Logout realizado com sucesso.");
  };

  const handleDeleteAccount = () => {
    if (!currentUser) {
      alert("Nenhum usuário está logado.");
      return;
    }

    const enteredPassword = prompt("Digite sua senha para excluir a conta:");

    if (enteredPassword !== currentUser.password) {
      alert("Senha incorreta. A conta não foi excluída.");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(user => user.email !== currentUser.email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const updatedContacts = contacts.filter(contact => contact.userEmail !== currentUser.email);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));

    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    alert("Conta excluída com sucesso.");
  };

  const center = { lat: -23.5505, lng: -46.6333 };

  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center">Gerenciador de Contatos</h1>
        {feedback && <div className="alert alert-warning">{feedback}</div>}
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
                <Map center={center} markersData={contacts.map(contact => ({
                  position: {
                    lat: parseFloat(contact.address?.lat) || center.lat,
                    lng: parseFloat(contact.address?.lng) || center.lng,
                  },
                }))} />
                
                <ContactList contacts={contacts} />

                <div className="d-flex justify-content-between mt-4">
                  <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                  <button className="btn btn-danger" onClick={handleDeleteAccount}>Excluir Conta</button>
                </div>
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






















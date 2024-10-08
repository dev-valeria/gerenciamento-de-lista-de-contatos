import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator'; // Importando corretamente
import AddContact from './pages/AddContact';
import Map from './components/Map';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [feedback, setFeedback] = useState(""); // Estado para mensagens de feedback
  const [filter, setFilter] = useState(''); // Estado para o filtro
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para a ordenação
  const [passwordInput, setPasswordInput] = useState(""); // Estado para a senha do usuário

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

  // Validação da senha antes de excluir a conta
  const handleDeleteAccount = () => {
    if (!currentUser) {
      alert("Nenhum usuário está logado.");
      return;
    }

    const enteredPassword = prompt("Digite sua senha para excluir a conta:"); // Solicita a senha do usuário

    if (enteredPassword !== currentUser.password) {
      alert("Senha incorreta. A conta não foi excluída.");
      return;
    }

    // Se a senha estiver correta, proceder com a exclusão
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.filter(user => user.email !== currentUser.email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Remove os contatos associados ao usuário
    const updatedContacts = contacts.filter(contact => contact.userEmail !== currentUser.email);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));

    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    alert("Conta excluída com sucesso.");
  };

  // Filtro de contatos por nome ou CPF
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()) || 
    contact.cpf.includes(filter)
  );

  // Função de ordenação
  const sortedContacts = filteredContacts.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name); // Ordena por nome crescente
    } else {
      return b.name.localeCompare(a.name); // Ordena por nome decrescente
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const center = { lat: -23.5505, lng: -46.6333 };

  return (
    <Router>
      <div>
        <h1>Gerenciador de Contatos</h1>
        {feedback && <p>{feedback}</p>} {/* Exibindo mensagens de feedback */}
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

                {/* Campo de busca para filtrar por CPF ou nome */}
                <input
                  type="text"
                  placeholder="Filtrar por CPF ou Nome"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />

                {/* Botão para alternar entre crescente e decrescente */}
                <button onClick={toggleSortOrder}>
                  Ordenar {sortOrder === 'asc' ? 'Decrescente' : 'Crescente'}
                </button>

                {/* Lista de contatos filtrada e ordenada */}
                <ul>
                  {sortedContacts.map(contact => (
                    <li key={contact.id}>
                      {contact.name} - {contact.cpf} - {contact.phone} - {contact.address?.cep}
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




















import React, { useState } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import Map from '../components/Map'; 

function ContactList({ contacts, onAddContact }) {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedContact, setSelectedContact] = useState(null); // Estado para contato selecionado

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredContacts = contacts
    .filter(contact => 
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.cpf.includes(filter)
    )
    .sort((a, b) => {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  const handleContactClick = (contact) => {
    setSelectedContact(contact); // Atualiza o contato selecionado ao clicar
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gerenciador de Contatos
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Filtrar por nome ou CPF"
        value={filter}
        onChange={handleFilterChange}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSortOrderChange}
        style={{ marginBottom: '20px' }}
      >
        Ordenar {sortOrder === 'asc' ? 'Decrescente' : 'Crescente'}
      </Button>
      <List>
        {filteredContacts.map(contact => (
          <ListItem key={contact.cpf} button onClick={() => handleContactClick(contact)}>
            <ListItemText primary={contact.name} secondary={contact.cpf} />
          </ListItem>
        ))}
      </List>

      {selectedContact && (
        <Map 
          center={{ lat: selectedContact.address.lat, lng: selectedContact.address.lng }} 
          markersData={[{ position: { lat: selectedContact.address.lat, lng: selectedContact.address.lng } }]} 
        />
      )}
    </Paper>
  );
}

export default ContactList;







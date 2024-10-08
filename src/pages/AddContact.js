import React, { useState } from 'react';

function AddContact({ onAddContact, contact }) {
  const [name, setName] = useState(contact?.name || "");
  const [cpf, setCpf] = useState(contact?.cpf || "");
  const [phone, setPhone] = useState(contact?.phone || "");
  const [address, setAddress] = useState(contact?.address || { street: "", city: "", state: "", cep: "", lat: "", lng: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onAddContact) {
      const newContact = { name, cpf, phone, address };
      onAddContact(newContact);
    } else {
      console.error("Função onAddContact não foi passada!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Telefone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Endereço:</label>
        <input
          type="text"
          placeholder="Rua"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Cidade"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Estado"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="CEP"
          value={address.cep}
          onChange={(e) => setAddress({ ...address, cep: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Posição Geográfica:</label>
        <input
          type="text"
          placeholder="Latitude"
          value={address.lat}
          onChange={(e) => setAddress({ ...address, lat: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Longitude"
          value={address.lng}
          onChange={(e) => setAddress({ ...address, lng: e.target.value })}
          required
        />
      </div>
      <button type="submit">Salvar Contato</button>
    </form>
  );
}

export default AddContact;



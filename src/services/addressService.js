import axios from 'axios';

// Simulação de API de busca de endereços
export const searchAddress = async (uf, city, street) => {
  const response = await axios.get(`https://viacep.com.br/ws/${uf}/${city}/${street}/json/`);
  return response.data;
};

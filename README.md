# Gerenciamento de Lista de Contatos

Este projeto é um aplicativo de gerenciamento de contatos que permite adicionar, listar e filtrar contatos. O aplicativo utiliza a API do Google Maps para fornecer recursos geográficos, como a exibição de mapas.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Material-UI**: Biblioteca de componentes React que implementa o Material Design.
- **Google Maps JavaScript API**: API para exibir mapas interativos e funcionalidades relacionadas.

## Estrutura do Projeto

/contact-manager ├── /public │ ├── index.html │ └── favicon.ico ├── /src │ ├── /components │ │ ├── ContactList.js │ │ └── GoogleMap.js │ ├── /pages │ │ ├── AddContact.js │ │ └── ContactDetails.js │ ├── App.js │ ├── index.js │ ├── App.css │ └── index.css ├── package.json └── README.md


## Instalação

Para instalar e executar o projeto, siga os passos abaixo:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/dev-valeria/gerenciamento-de-lista-de-contatos.git
   
2. **Navegue até o diretório do projeto:**
   cd gerenciamento-de-lista-de-contatos

3. Instale as dependências:
   npm install

4. **Crie um arquivo .env na raiz do projeto e adicione sua chave da API do Google Maps:**
   REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   
5. **Inicie o aplicativo:**
   npm start
6. **Acesse o aplicativo no seu navegador em http://localhost:3000.**
   
   

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
   
    ```bash
   cd gerenciamento-de-lista-de-contatos
     ```

4. **Instale as dependências:**

  ```bash
   npm install
 ```

6. **Crie um arquivo .env na raiz do projeto e adicione sua chave da API do Google Maps:**

 ```bash
   REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
 ```
   
7. **Inicie o aplicativo:**

 ```bash
   npm start
 ```

8. **Acesse o aplicativo no seu navegador em**

 ```bash
http://localhost:3000
 ```
   
   

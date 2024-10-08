# Gerenciamento de Lista de Contatos

Este projeto é um aplicativo de gerenciamento de contatos que permite adicionar, listar e filtrar contatos. O aplicativo utiliza a API do Google Maps para fornecer recursos geográficos, como a exibição de mapas.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Material-UI**: Biblioteca de componentes React que implementa o Material Design.
- **Google Maps JavaScript API**: API para exibir mapas interativos e funcionalidades relacionadas.

## Pré-requisitos

- Ter conhecimento em linguagem JavaScript ES6+ e ReactJs.
- Saber como funcionam APIs REST/RESTFul.
- Saber utilizar LocalStorage ou SharedPreferences ou Sqlite.
- Conhecimento em versionamento de código com GIT.


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
## Funcionalidades

- **Adicionar Contato**: Permite adicionar novos contatos com nome e CPF.
- **Listar Contatos**: Exibe uma lista de contatos cadastrados.
- **Filtrar Contatos**: Permite filtrar a lista de contatos por nome ou CPF.
- **Ordenar Contatos**: Permite alternar a ordem de exibição dos contatos (crescente/decrescente).
- **Integração com Google Maps**: Exibe um mapa interativo para cada contato adicionado.
- **Gerenciar sua lista de contatos**: Permite editar e excluir contatos.
- **Realizar pesquisa de endereço**: Ajuda no cadastro de contatos.
- **Excluir a sua própria conta**: Funcionalidade para gerenciamento de contas.

## Contato
**Para dúvidas ou sugestões, entre em contato:**

**Nome:** Valéria Melo
**Email:** seu-email@example.com
   

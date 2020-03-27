


Navegador tem motor (engine) pra intepretar JS
Chrome utiliza V8 engine


NodeJs - É o motor do chrome desacoplado para que 
    podemos interpretar JS fora do navegador


► Instalar NodeJs e NPM usando o Chocolatey (https://nodejs.org/en/download/package-manager/#windows)




Back-End

    - Regrar de Negócio;
    - Conexão com banco de dados;
    - Envio de e-mail;
    - Comunicação com WebServices;
    - Autenticação de Usuário;
    - Criptografia e Segurança.


Front-End

    - Tem apenas a interface visual;
    - Consome as informações de alguma API.

## NodeJs

### Iniciando Projeto 

Executar:

    npm init -y

Arquivo package.json:

    • Armazena informações crusias do projeto, como Nome, Versão,  Arquivo Principal, Dependências etc.

### Express 

• Para lidarmos com as rotas da aplicação.

Instalação

    npm install express

### Criando o index.js

• O arquivo `index.js` é o principal da aplicação.

    - Criar arquivo index.js na raiz do projeto backend.

Importando `express`:

    const express = require('express');

Iniciando a aplicação:

    // Instanciacao da Aplicacao
    const app = express();

    // Criando primeira rota
    app.get('/', (request, response) => {
        return response.json({
            evento: 'Semana Omnistack 11.0',
            aluno: 'Augusto Cruz'
        });
    });

    // Aplicacao escuta na porta 3333
    app.listen(3333);


### Executando o projeto

Executar:

    node index.js


### Rotas (URL)

#### Recurso (Depois da barra)

É o que está se querendo acessar, geralmente corresponde a uma entidade do banco:

    app.get('/profile');
    app.get('/users');

#### Métodos HTTP

`GET`: Buscar/Listar uma informação do back-end
`POST`: Criar uma nova informação no back-end
`PUT`: Alterar uma informação no back-end
`DELETE`: Deletar uma informação no back-end

#### Tipos de Parâmetros

`Query Params`: Parâmetros nomeados enviados na rota após "?" (Usados para: Filtros, Paginação, Ordenação)

Ex:

    // Recurso ? Query Param

    /users?name=Augusto

Para acessar:

    app.get('/users', (request, response) => {
        const params = request.query;
        const nameParams = request.query.name;
    });

`Route Params`: Parâmetros utilizados para identificar recursos.

Ex:

    // Recurso / Route Param

    /users/:id -> /users/1

Para acessar: 

    app.post('/users/:id', (request, response) => {
        const params = request.params;
        const idParams = request.params.id;
    });

`Request Body`: Corpo da requisição, utilizado para criar (POST) ou alterar (PUT) recursos.

Ex requisição:

    POST
    {
        "name": "Augusto Cruz",
        "idade": 21
    }

Para acessar:

    app.post('/users', (request, response) => {
        const body = request.body;
        const name = request.body.name;
    });

### Nodemon

Usamos o nodemon para que não precisemos reiniciar o servidor do node a cada alteração de código, o nodemon realiza este restart instantâneamente.

Instalação

    npm install nodemon -D

    (-D -> Instala o Nodemon como uma devDependencie)

Implementação:

Para usar o nodemon devemos adicionar o script `start` no arquivo `package.json`:

    "scripts": {
        "start": "nodemon index.js"
    }

Para rodar:

    npm start

### Configurando o Banco de Dados SQLite

Para realizar consultas no banco de dados usaremos o KNEX.JS, para que possamos realizar as consultas através de Query Builder usando JS.

Ex:

    SEM Query Builder:

        SELECT * FROM users

    COM Query Builder:

        table('users').select('*')

Instalação do KNEX:

    npm install knex

Instalação do DRIVER SQLite:

    npm install sqlite3

Configurando o banco de dados:

    // Ira criar um arquivo de configuracao do KNEX
    npx knex init

#### Entidades

    • ONG
    • Caso (incident)

#### Funcionalidades

    • Login de ONG
    • Logout de ONG
    • Cadastro de ONG
    • Cadastrar novos Casos
    • Deletar Casos
    • Listar todos os Casos
    • Listar Casos específicos de uma ONG
    
#### Migration com Knex.js

Criando primeira migration:

1) Adicionar pasta migrations dentro de src;
    
2) Adicionar configuracao do diretorio no arquivo knexfile.js: 

    migrations: {
        directory: './src/database/migrations'
    }

3) Migration para a entidade ONG:

    npx knex migrate:make create_ongs

4) Editar arquivo de migration criada:

    exports.up = function (knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        })
    };

    exports.down = function (knex) {
        return knex.schema.dropTable('ongs');
    };

5) Aplicar migration:

    npx knex migrate:latest

6) Migration para a entidade INCIDENTS (CASOS):

    npx knex migrate:make create_incidents

7) Editar arquivo de migration criada:

    exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        // Relacionamento com a ONG
        table.string('ong_id').notNullable();

        // FK da ONG
        table.foreign('ong_id').references('id').inTable('ongs');
        });
    };

    exports.down = function (knex) {
        return knex.schema.dropTable('incidents');
    };


8) Aplicar migration:

    npx knex migrate:latest



### Cadastro de Nova ONG


### Paginação



### CORS

Instalação:

    npm install cors








&nbsp;
&nbsp;
&nbsp;


## ReactJs

### Entendendo o React

► Abordagem Tradicional

Cliente (Browser) faz Requisição para o Back-End > Back-End retorna todo conteudo HTML, CSS e JS > Browser renderiza o conteudo retornado pelo Back-End.

É limitado pois não se pode ter vários Front-End diferentes, nem mesmo serviços externos e também não se pode ter um app mobile utilizando esse Back-End.

► Abordagem SPA (Single Page Aplications)

React roda no lado do cliente e contém todo o HTML, CSS e JS.

Cliente (Browser) faz Requisição para o Back-End > Back-End retorna uma resposta em JSON > Browser exibe as informações na tela.

Pode-se ter vários Front-Ends.
Back-End não tem responsabilidade pela apresentação dos dados.

### Iniciando Projeto 

npm - Executa um pacote externo sem a necessidade de instala-lo de forma global.

Executar:

    npx create-react-app frontend

create-react-app - Já configura todo o projeto ReactJs

### Executando o projeto

Executar:

    npm start

### Estrutura do Projeto

index.html

Arquivo principal, é carregado primeiramente, só depois que o index.html está renderizado na tela o react preenche a div root com o restante do código.


index.js

Renderiza o App.js

App.js





### Componentes

É uma função que retorna html.

Sempre iniciam com letra maiscula.

### JSX (JavaScript XML (Sintaxe HTML))

HTML integrado dentro do JS.

### Propriedades (Atributos)

São como atributos do html, porém passados para componentes ao invés de tags.

HTML - <h1 id="title">Hello Word!</h1>

id é um atributo de h1


    <Header title="Semana OmniStack" />

    Para acessar:
    
        export default function Header(props) {
            return (
                <header>
                    <h1>{props.title}</h1>
                </header>
            );
        }


    <Header>
    Teste Augusto
    </Header>

    Para acessar:

        export default function Header(props) {
            return (
                <header>
                    <h1>{props.children}</h1>
                </header>
            );
        }


São passados como parametros da função, o melhor a se fazer é desestruturar o props e receber apenas o que se deseja:

    export default function Header({ children }) {
        return (
            <header>
                <h1>{children}</h1>
            </header>
        );
    }


{} - Indicam que queremos usar uma variavel.


### Estado

Informação que é mantida pelo componente.

Toda vez que o estado de algum componente é alterado o componente é renderizado para conseguir pegar essa nova informação.


### Imutabilidade

Por uma questão de performance não podemos alterar o estado de uma variavel de forma direta, devemos sobrepor esse estado.

Ex:

    counter++; // Errado




  // let counter = useState(0);

  // useState -> Retorna um Array [valor, funcaoDeAtualizacao]

  // Desestruturando para conseguirmos acessar a funcaoDeAtualizacao:

  let [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }
    
### Emmet

Setting JSON:

 "emmet.syntaxProfiles": {
        "javascript": "jsx"
    },
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    }



### Criando Página de Login

Para cada página deve se criar uma pasta, para master o componente e seu estilo proximo.


Criar pasta pages.
Criar pasta Logon.
Criar arquivos index.js e styles.css.

### Usando Feather Icons

    npm install react-icons

No Logon/index.js

    import { FiLogIn } from 'react-icons/fi'

Usando:

    <FiLogIn size={16} color="#E02141" />



### Rotas

    npm install react-router-dom



### Axios

É um cliente HTTP responsavél por fazer as chamadas ao back-end.

    npm install axios




&nbsp;
&nbsp;
&nbsp;

## React Native

### Entendendo o React Native

► Abordagem Tradicional

Na abordagem tradicional precisamos criar uma aplicação para cada SO, tornando um trabalho bem repetitivo.

► Abordagem do React Native

No React Native todo código é escrito em JavaScript, os SO's como IOS e Android interpretam (Diferente do Xamarim onde o código é convertido para a linguagem nativa) esse código e geram uma interface totalmente nativa.

### Expo (Melhor para Aplicações Menores e Iniciantes)

FrameWork para React Native, conjunto de bibliotecas para utilizar as funcionalidades nativas do celular.

#### Porque Utilizar o Expo?

Sem o Expo precisamos do Android Studio para obter o SDK para o desenvolvimento em Android e do Xcode para obter o SDK para o desenvolvimento em IOS.

#### Utilizando o Expo

Com o Expo se preocupamos apenas em escrever o código em JS e o Expo executa o código dentro do seu próprio aplicativo já todo configurado e com todas as API's nativas.
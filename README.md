# DebtPlay - Aplicação para gerenciamento de dívidas

# <h2>Projeto</h2>

O Debt Play é uma aplicação com objetivo de auxiliar o gerenciamento de dívidas e devedores.
Através da aplicação, o usuário poderá relacionar dívidas com cadastros de clientes disponíveis na API JSONPlaceHolder.

# Features

- O Usuário poderá realizar o cadastro na aplicação.
- O Usuário poderá fazer login na aplicação.
- O Usuário poderá cadastrar novas dívidas, informando qual cliente está relacionado a ela e demais informações como valor, motivo e data.
- O Usuário poderá listar todas as dívidas cadastradas na aplicação.
- O Usuário poderá listar todas as dívidas associadas a um determinado cliente.
- O Usuário poderá obter detalhes de uma dívida.
- O Usuário poderá alterar uma dívida.
- O Usuário poderá deletar uma dívida.
- O Usuário poderá deletar todas as dívidas de um cliente.

# Screens
<h2> Tela de Cadastro de Usuário </h2>
<img src="/.github/signup.PNG" />
<img src="/.github/Cadastro.gif" />

<h2> Tela de Login </h2>
<img src="/.github/login.PNG" />
<img src="/.github/Login.gif" />

<h2> Dashboard/Home </h2>
<img src="/.github/dashboard.PNG" />

<h2> Cadastro/Adição de Dívida </h2>
<img src="/.github/AddDebt.PNG" />

<h2> Edição/Alteração de Dívida </h2>
<img src="/.github/UpdateDebt.PNG" />

<h2> Listagem das Dívidas por Cliente </h2>
<img src="/.github/ListDebt.PNG" />
<img src="/.github/ListDebt.gif" />

# 💻 Instalação, execução e desenvolvimento
Faça um clone desse repositorio.

<h2>Pré-requisitos</h2>
<ul>
<li><a href="https://nodejs.org/en/">Node.js</a></li>
<li><a href="https://yarnpkg.com/">Yarn</a> ou <a href="https://www.npmjs.com/https://www.npmjs.com/">NPM</a></li>
<li><a href="https://pt-br.reactjs.org/">React</a></li>
<li><a href="https://expressjs.com/pt-br/">Express</a></li>
</ul>

<h2>Backend</h2>
<ul>
<li>A partir da raiz do projeto, entre na pasta rodando cd backend;</li>
<li>Rode yarn para instalar suas dependências;</li>
<li>Caso não tenha criado o banco de dados, rode npx knex migrate:latest;</li>
</ul>

<h2>Frontend</h2> 
OBS: Antes de executar, lembre-se de iniciar o backend da aplicação.

<ul>
<li>A partir da raiz do projeto, entre na pasta do frontend rodando cd frontend;</li>
<li>Rode yarn para instalar as dependências;</li>
<li>Rode yarn start para iniciar o client web;</li>
</ul>

# ✏️ Próximas releases
- [ ] Aplicação de testes (unitários, integração)
- [ ] Utilização de conteiners (Docker)
- [ ] Aplicação mobile

# 🤔 Como contribuir
<ul>
<li>Faça um fork desse repositório;</li>
<li>Cria uma branch com a sua feature: git checkout -b minha-feature;</li>
<li>Faça commit das suas alterações: git commit -m 'feat: Minha nova feature';</li>
<li>Faça push para a sua branch: git push origin minha-feature;</li>
</ul>

# Tecnologias
<ul>
<li>Backend: Foi desenvolvida uma API RESTful utilizando Node.js, Express, Cors. A API possui autenticação JWT utilizando JsonWebToke. Além disso, a API possui integração com banco de dados SQLite utilizando Knex.</li>
<li>Frontend: O frontend foi desenvolvido utilizando o ReactJS</li>
</ul>

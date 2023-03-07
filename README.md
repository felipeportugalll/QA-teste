# QA-Teste

Este repositório é um teste automatizado que usa as bibliotecas Jest, Puppeteer e dotenv.  
O teste foi criado para:  
1 - Acessar a página do Google para verificar se a conexão com a internet está funcionando  
2 - Acessar a página do GitHub  
3 - Acessar a página de login do GitHub  
4 - Preencher o formulário de login com as informações do arquivo .env  
5 - Apertar o botão de login
6 - Verificar se o usuário foi autenticado corretamente  
7 - Verificar URL após autenticação no GitHub  
8 - Verificar se o nome do usuário autenticado aparece corretamente na página de perfil  
9 - Navegar até a aba de repositórios do usuário  
10 - Acessar um repositório aleatório do usuário  
11 - Navegar até a aba Pull requests  
12 - Deslogar   
13 - Verificar que foi possível deslogar  

## Pré-requisitos 

- Node.js e NPM instalados na máquina
- Conta válida do GitHub

## Instalação

1 - Clone o repositório em sua máquina:
git clone https://github.com/felipeportugalll/QA-teste

2 - Navegue até a pasta do projeto:
cd seu-repositorio

3 - Instale as dependências do projeto:
npm install

4 - Crie um arquivo .env com as suas informações de login do GitHub:
EMAIL=seu-email-do-github
PASSWORD=sua-senha-do-github
NAME=seu-nome-de-usuario-do-github

## Como executar o teste

Para executar o teste, basta rodar o comando:
npm test

<div align="center">
   <h1>Challenge Ruptiva</h1>
</div>

<h6 align="center">
🥋 Hard work and Code 
</h6>

<p align="center">
    <a href="#introduction">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#tecnologies">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#install">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#tests">Testes</a>
</p>

<br>

<h3 id="introduction"> 🏁 Introdução </h3>
<p>O desafio proposto foi criar um formulário com integração ao firebase.</p>
<hr />
<h4 id="introduction">🛣 Roadmap </h4>
Primeiramente analisei todos os itens que deveriam ser integrados na aplicação, criei um to-do list com os mais importantes e comecei a codar, o primeiro grande desafio foi a mascara no input, já que estou utilizando um component separado do padrão foi um pouco complicado no futuro pois teria que fazer a verificação de business e individual, logo após foi a listagem, como o firebase mantem uma conexão em tempo real, puxar a listagem de dentro do banco fica complicado, então, decidi manter sem aplicar o refresh control.

<h3 id="tecnologies">  🚀 Tecnologias </h3>

- [React Native]("https://reactnative.dev/")
- [Styled-Components]("https://styled-components.com/")
- [Jest]("https://jestjs.io/")
- [Firebase]("https://firebase.google.com/?hl=pt-br")


<h3 id="install"> 📲 Instalação </h3>

1. clone o repositório usando `git clone`
2. entre na pasta [mobile](mobile)
3. instale utilizando `npm i` ou `yarn`
4. execute no seu terminal `react-native run android` ou `react-native run ios`
<br>

❗ Se você utiliza **Expo** execute `expo start`

❗ Para que o back-end funcione é necessário entrar em `./mobile/src/services/connection.ts` e colar sua chave da api gerada pelo firebase.

<h3 id="tests"> ⚙ Testes </h3>

Para iniciar os testes basta executar o comando `npm run test` ou `yarn test` no seu terminal.

<br>

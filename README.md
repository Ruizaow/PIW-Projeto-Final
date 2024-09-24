# Site de Filmes

Um site feito para registrar, avaliar e criar listas de filmes vistos pelo usuário.

## Membros da equipe

- João Alves Rodrigues Neto, 536107, Design Digital
- Rui Fernandes Wiebbeling, 521434, Design Digital

## Papéis ou tipos de usuário da aplicação

- Usuário não registrado
- Usuário registrado
- Administrador

## Entidades ou tabelas do sistema

- Usuário
- Filme
- Papel
- Amigos

## Principais funcionalidades da aplicação
Usuário não registrado poderá ver os filmes, as listas de filmes e listas de amigos feitos por usuários registrados.
Usuário registrado pode adicionar outros usuários registrados como amigo e criar uma lista própria de filmes.

O adminstrador do site pode:
- adicionar e remover usuários, além de editar suas informações: nome, nome de usuário, email, senha, papel de usuário e foto de perfil;
- adicionar e remover os filmes disponíveis no site, além de editar suas informações: título, data de lançamento, sinopse e pôster.

## Tecnologia e frameworks ultilizados
### Frontend:
- VueJs v3.0, Vue-Router, Pinia e Axios
### Backend
- Express, TypeORM e Jwt

## Operaçãoes implementadas para cada entidade da aplicação
<table>
  <tr>
    <td>Entidades</td>
    <td>Criação</td>
    <td>Leitura</td>
    <td>Atualização</td>
    <td>Remoção</td>
  </tr>
  <tr>
    <td>Usuário</td>
    <td>X</td>
    <td>X</td>
    <td>X</td>
    <td>X</td>
  </tr>
  <tr>
    <td>Filmes</td>
    <td>X</td>
    <td>X</td>
    <td>X</td>
    <td>X</td>
  </tr>
  <tr>
    <td>Lista de Filmes</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Lista de Amigos</td>
    <td>X</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

## Rotas da API REST ultilizadas
<table>
  <tr>
    <td>Método HTTP</td>
    <td>URL</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/login</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/register</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/user/{id}/profile</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/user/{id}/friends</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/user/{id}/films</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/films</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/films/{id}</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/films/entry</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/films/entry/{id}</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/films/{id}</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/users</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/users/{id}</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/users</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/users/{id}</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/users/{id}</td>
  </tr>



</table>


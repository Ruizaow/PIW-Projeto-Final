## Clone o projeto e em seguida execute os seguintes comandos  ##
```
npm install
npm run dev
```

**Para acessar os recursos de listar, criar, atualizar e deletar usuários, primeiramente execute o método POST "/login" com as seguintes informações JSON de usuário no 'BODY':**
```
{
    "email": "emailteste@email.com",
    "password": "teste123"
 },
```
**copie a chave TOKEN de resposta, e, no recurso que se deseja acessar, vá em 'HEADERS' e insira em 'Authorization' a linha: "Bearer chave_Token"**

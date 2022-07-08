# advanced-node

## Descrição do Projeto

Esta api é um projeto de estudo onde foi aplicado o DDD, Clean Architecture, teste unitarios e teste de integração.

A api recebe um token de autenticação do facebook, o pega alguns dados de usuario na api do facebook, cadastra os dados de usuario em um banco postgresql e retorna um token de uso interno gerado pela api advanced-node.

</br>

## Diagrama do sistema

![dependencies](https://user-images.githubusercontent.com/26278442/177904473-8f43f4c0-9faa-4287-bbf7-e47048c35510.png)

</br>

## Como rodar o projeto

</br>

### Clone este repositório

```sh
$ git clone <https://github.com/gabrielsimongianotti/advanced-node>
```

</br>

### Acesse a pasta do projeto no terminal/cmd

```sh
cd advanced-node
```

</br>

### Instale as dependências

```sh
npm install
```

</br>

### Execute a aplicação em modo de desenvolvimento

```sh
npm run dev
```

</br>

### codigo curl

```sh
curl --request POST \
 --url http://localhost:8081/api/login/facebook \
 --header 'Content-Type: application/json' \
 --data '{
"token": "EAAJQC7IZAIjMBAJTHUUe5oQ1vv6gPRmzRqY8KsYw3PDdtnoZAEk8wSlZC5PVQOZCvKu1yRBAErFgrazCsSZCYje4Y7LBZA8vrMMgwHtWvYkYxcie5ciyiQeNocWdCPVu1PlXl3qeslgx5kZBZC6V88IanE70ZC95uZA3HDrsdt71ZBVcs794p3AGnzavnAMoiQmy5bvxqtHFR341URul76ZCNIxW"
}'
```

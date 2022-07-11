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
git clone https://github.com/gabrielsimongianotti/advanced-node
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
"token": "EAAH873uuuPIBAPOO8HZAw5ZACPi5JrSM4JsBMoEvIlsWhjZB99tsPqWLs8RM8blMWxLAuKHHAnZAXmZBYdYazxZCFscM8p65nfr5Hlu1EdolWiHHCbPEwjKCSwjupkQnnPMgs5hCMZCRuNqff9UMFqgdHVCr8k35SZAv4QIEiaiDtGvlo1wIXJrwRh7ReQzSxuZCDmXW5hFwkoypMc6uxp6ZAk"
}'
```

</br>

## Testes

os teste pegam 100% da aplicação

</br>

### Testes unitarios

```sh
npm run test
```
</br>

### Relatorio do coverage

```sh
npm run test:coverage
```
</br>

### Testes integração

```sh
npm run test:fb-api
```

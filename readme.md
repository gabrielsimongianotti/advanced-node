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


https://user-images.githubusercontent.com/26278442/178192540-a86eee1b-6cbb-4842-bb94-7530eb0df217.mp4


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
"token": "EAAH873uuuPIBAMHnOvtN1ZC85p8TIsgWT6ncAq6yvGr1rO0BdYJTgeRnefgzdpPFWbe1qfiKg5rHNmbsZBPVEVN9P4sxQbstmrScOYpVJItUZBHmZAmsZBaClDCa3wpJreYgNmoAub8fr78ZAZBsXvZBLQAQZClN9FhJVRaE8vrmqkQSyRRtCVmrLZCITOLoeFZBds8dW1ui4QekLY2COE5Y8HW"
}'
```

</br>

## Testes

os teste pegam 100% da aplicação

</br>
<img width="1432" alt="Captura de Tela 2022-07-11 às 01 30 08" src="https://user-images.githubusercontent.com/26278442/178191108-08cb70f1-31fc-47ea-b095-ccc357850642.png">

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

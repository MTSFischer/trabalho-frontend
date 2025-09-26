# Trabalho React Native – Consumo da Fake Store API

Aplicativo mobile construído com Expo e React Native em JavaScript para atender aos requisitos do trabalho de Front-end Mobile. O app realiza autenticação com a Fake Store API, lista produtos com filtro por categoria, apresenta detalhes de cada item e disponibiliza uma tela com as informações do grupo.

## Tecnologias utilizadas

- [Expo](https://expo.dev/) (SDK 54)
- React Native
- React Navigation (stack navigation)
- Axios para requisições HTTP
- JavaScript com Hooks (`useState`, `useEffect`)

## Pré-requisitos

- Node.js 18 ou superior
- Expo CLI (opcional) – é possível usar `npx expo`

## Como executar o projeto

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o projeto com Expo:

   ```bash
   npm start
   ```

   O Expo CLI exibirá um QR Code no terminal. Abra o aplicativo **Expo Go** em um dispositivo físico ou utilize um emulador (Android Studio ou iOS Simulator) para visualizar o app.

## Credenciais para login

A autenticação utiliza usuários reais da Fake Store API. Para consultar a lista de logins disponíveis execute:

```bash
curl https://fakestoreapi.com/users | jq '.[].username'
```

Cada objeto possui os campos `username` e `password`. Utilize esses valores diretamente na tela de login do aplicativo.

> Caso o comando acima não esteja disponível, acesse manualmente o endpoint [https://fakestoreapi.com/users](https://fakestoreapi.com/users) em qualquer navegador para visualizar as credenciais.

## Funcionalidades atendidas

- Tela de Login com autenticação via `POST /auth/login`.
- Stack Navigation com header personalizado na Home (botões de Logout e Informações).
- Listagem de produtos consumindo `GET /products` com ActivityIndicator enquanto carrega.
- Filtro por categoria (electronics, jewelery, men's clothing, women's clothing) com opção de limpar filtro.
- Tela de detalhes consumindo `GET /products/{id}` com carregamento e tratamento de erros.
- Tela de informações do grupo acessível pelo botão do header.

## Informações do grupo

Atualize o arquivo [`src/screens/GroupInfoScreen.js`](./src/screens/GroupInfoScreen.js) substituindo os placeholders pelos nomes completos e RAs dos integrantes antes de finalizar a entrega.

| Integrante | RA |
| ---------- | --- |
| Integrante 1 | RA0000000 |
| Integrante 2 | RA0000000 |

## Scripts disponíveis

- `npm start` – inicia o Metro bundler do Expo.
- `npm run android` – inicia o projeto no emulador Android configurado.
- `npm run ios` – inicia o projeto no simulador iOS (macOS).
- `npm run web` – abre a versão web experimental do Expo.

## Licença

Projeto desenvolvido apenas para fins acadêmicos.

# UniEvent (Expo Snack Ready)

Este projeto foi ajustado para funcionar de forma simples no **[Expo Snack](https://snack.expo.dev/)**.

## Como usar no Snack

1. Abra o https://snack.expo.dev/
2. Crie um novo Snack.
3. Copie os arquivos deste projeto (principalmente `App.js` e `src/`).
4. Garanta que as dependências do `package.json` estejam adicionadas no painel `Dependencies` do Snack.

## Ajustes realizados para compatibilidade

- `package.json` usando `main: node_modules/expo/AppEntry.js` (entry padrão do Expo/Snack).
- `app.json` simplificado, sem referência a arquivos locais de `assets/` (evita erro quando esses arquivos não estão no Snack).

## Execução local

```bash
npm install
npm run start
```

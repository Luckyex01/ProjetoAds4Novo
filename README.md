# ProjetoAds4Novo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./License)
[![Made with Expo](https://img.shields.io/badge/Made%20with-Expo-3ddc84.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D4.0-blue.svg)](https://www.typescriptlang.org/)

> Aplicativo móvel desenvolvido com **Expo + React Native + TypeScript** — protótipo/atividade do curso de Análise e Desenvolvimento de Sistemas (ADS).

---

## Índice

* [Visão geral](#visão-geral)
* [O que tem aqui](#o-que-tem-aqui)
* [Tecnologias](#tecnologias)
* [Funcionalidades](#funcionalidades)
* [Estrutura do projeto](#estrutura-do-projeto)
* [Requisitos](#requisitos)
* [Instalação e execução](#instalação-e-execução)
* [Scripts úteis](#scripts-úteis)
* [Reset do starter (opcional)](#reset-do-starter-opcional)
* [Como contribuir](#como-contribuir)
* [Como checar forks / provar autoria](#como-checar-forks--provar-autoria)
* [Boas práticas recomendadas](#boas-práticas-recomendadas)
* [Recursos e referências](#recursos-e-referências)
* [Licença](#licença)
* [Contato](#contato)

---

## Visão geral

O **ProjetoAds4Novo** é um aplicativo criado com `create-expo-app` (Expo) e organizado usando file-based routing na pasta `app`. O objetivo é servir como projeto estudantil que demonstra organização de código, componentes reutilizáveis e integração de assets (imagens, fontes).

---

## O que tem aqui

* Estrutura padrão Expo (pasta `app`, `components`, `assets`, etc.)
* Código escrito em **TypeScript**
* Exemplos de telas, navegação e componentes reutilizáveis
* Scripts para iniciar e desenvolver com Expo

> Atualize a seção **Funcionalidades** abaixo para refletir o estado atual do seu app.

---

## Tecnologias

* Expo (React Native)
* React / React Native
* TypeScript
* React Navigation (se usado)
* Outras libs conforme `package.json`

---

## Funcionalidades

(Edite para descrever o que seu app realmente faz — aqui vão exemplos:)

* Tela de boas-vindas / splash
* Autenticação (login / logout) — *se houver*
* Navegação entre telas (stack / tabs)
* Listas e detalhes de itens
* Formulários com validação
* Componentes reutilizáveis (cards, botões, inputs)

---

## Estrutura do projeto (exemplo)

```
/app
  /screens
  /components
/assets
/constants
/hooks
/scripts
package.json
README.md
License
```

Adapte conforme a estrutura real do seu projeto.

---

## Requisitos

* Node.js (versão recomendada: LTS, >=16)
* npm ou yarn
* Expo CLI (opcional; você também pode usar `npx expo`)

---

## Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/Luckyex01/ProjetoAds4Novo.git
cd ProjetoAds4Novo
```

2. Instale dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o Expo:

```bash
npx expo start
# ou
npm run start
# ou
yarn start
```

No terminal do Expo você verá opções para abrir em:

* Development build
* Emulador Android
* Simulador iOS (macOS)
* Expo Go (celular)

---

## Scripts úteis (exemplos)

(Verifique seu `package.json` e ajuste conforme os scripts reais)

```bash
npm run start      # inicia Metro/Expo
npm run android    # expo start --android
npm run ios        # expo start --ios
npm run web        # expo start --web
npm run reset-project # move o starter para app-example e cria app em branco (se existir)
npm run lint       # rodar lint (se configurado)
npm run test       # rodar testes (se houver)
```

---

## Reset do starter (opcional)

Se o projeto veio com o código starter e você quer mover o starter para `app-example` e começar com um `app` em branco, use:

```bash
npm run reset-project
```

(Se esse script não existir, essa linha serve como instrução; verifique se há `scripts/reset-project.js` no repo.)

---

## Como contribuir

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b feature/minha-mudanca`
3. Faça commits claros e descritivos: `git commit -m "feat: adicionar X"`
4. Abra um Pull Request com descrição do que foi alterado

Se pretende aceitar contribuições públicas, adicione `CONTRIBUTING.md` e `CODE_OF_CONDUCT.md` ao repositório.

---

## Como checar forks / provar autoria

O GitHub registra quando alguém faz fork do seu repositório com o vínculo público “Forked from Luckyex01/ProjetoAds4Novo”. Para comparar e provar autoria:

### Via terminal (exemplo)

```bash
# clone seu repositório e o fork
git clone https://github.com/Luckyex01/ProjetoAds4Novo.git original
git clone https://github.com/NomeDoPerfilQueFezOFork/ProjetoAds4Novo.git fork

# comparar
cd original
git remote add fork https://github.com/NomeDoPerfilQueFezOFork/ProjetoAds4Novo.git
git fetch fork
git diff main..fork/main        # substituir 'main' se sua branch principal tiver outro nome
git log --oneline --graph --decorate --all
```

### Via GitHub Web

Use a página **Compare** do GitHub entre `Luckyex01/ProjetoAds4Novo...NomeDoPerfilQueFezOFork/ProjetoAds4Novo` para ver commits e diffs visualmente.

---

## Boas práticas recomendadas

* Adicione `"license": "MIT"` no `package.json`.
* Mantenha `README.md` atualizado com as funcionalidades reais.
* Adicione badge de CI se usar GitHub Actions.
* Adicione `CONTRIBUTING.md` e `CODE_OF_CONDUCT.md` se aceitar contribuições externas.
* Se o projeto crescer, considere um CLA (opcional).

---

## Recursos e referências

* Expo docs — [https://docs.expo.dev](https://docs.expo.dev)
* Open Source Guides — Licenças e melhores práticas
* ChooseALicense — comparação MIT / Apache / GPL

---

## Licença

Este projeto está licenciado sob a **MIT License** — consulte o arquivo `License` na raiz do repositório para o texto completo.

**Nota:** Certifique-se de ter `"license": "MIT"` no seu `package.json` para declarar explicitamente a licença no projeto.

---

## Contato

* Autor: `Luckyex01`
* GitHub: [https://github.com/Luckyex01](https://github.com/Luckyex01)
* Email: luckgaab2004@gmail.com

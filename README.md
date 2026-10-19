# Geo-Explorer

Projeto de portfólio desenvolvido para o desafio **IBM Bob + DIO**. O Geo-Explorer é uma ferramenta de linha de comando que permite explorar trilhas de aprendizagem fictícias, receber desafios de código e gerar certificados educacionais fictícios.

## Recursos

- Consulta de trilhas por tecnologia;
- Geração de desafios em três níveis;
- Emissão de certificado fictício no terminal;
- Servidor MCP baseado em JSON Lines para integração com outras ferramentas;
- Testes automatizados nativos do Node.js.

## Pré-requisito

Instale o [Node.js](https://nodejs.org/) 18 ou superior. O projeto não usa pacotes externos.

## Como executar

No terminal, entre na pasta do projeto e use os comandos abaixo:

```bash
node src/cli.js listar
node src/cli.js trilha javascript
node src/cli.js desafio python intermediario
node src/cli.js certificado "Ana Silva" javascript
```

Para nomes com mais de uma palavra e tecnologias compostas, também é possível separar os campos com `--`:

```bash
node src/cli.js certificado Ana Silva -- cloud computing
```

Tecnologias disponíveis: `javascript`, `python` e `cloud` (ou `cloud computing`). Níveis: `iniciante`, `intermediario` e `avancado`.

## Testes

```bash
npm test
```

## Servidor MCP

O servidor disponibiliza as ferramentas `consultar_trilha`, `gerar_desafio` e `gerar_certificado` pelo protocolo JSON-RPC em JSON Lines:

```bash
npm run mcp
```

## Melhorias realizadas

Além do fluxo principal, incluí busca tolerante a maiúsculas e acentos, mensagens de erro, formatação legível no terminal, testes nativos e uma implementação de servidor MCP sem dependências externas.

## Aprendizados

Durante o desafio, pratiquei organização de um projeto Node.js, modelagem de dados em JSON, criação de uma CLI, testes automatizados e a ideia de expor recursos por meio de um servidor MCP.

> Os certificados gerados são fictícios e possuem finalidade exclusivamente educacional.

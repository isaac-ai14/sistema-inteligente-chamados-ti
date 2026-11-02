# STI — Sistema Inteligente de Chamados de TI

Sistema de gerenciamento de chamados de suporte técnico que utiliza inteligência artificial local para classificar solicitações automaticamente e enviar alertas sobre ocorrências de alta prioridade.

## Sobre o projeto

O STI foi desenvolvido como um projeto pessoal para explorar a integração entre APIs REST, bancos de dados relacionais, automação de workflows e inteligência artificial.

A proposta é reduzir a necessidade de classificação manual de chamados e facilitar a identificação de problemas que exigem atenção imediata.

## Como funciona

1. Um chamado é enviado ao sistema por meio de um Webhook do n8n.
2. O n8n encaminha o título e a descrição para um modelo de IA local executado pelo Ollama.
3. A IA identifica a categoria e a prioridade do chamado.
4. O chamado é registrado em um banco de dados MySQL por meio de uma API REST desenvolvida em Node.js e Express.
5. Caso a prioridade seja **Alta** ou **Crítica**, o n8n envia uma notificação automática pelo Telegram.

Chamados de prioridade **Baixa** ou **Média** são armazenados normalmente, sem gerar notificações.

## Tecnologias utilizadas

- **Node.js e Express:** desenvolvimento da API REST.
- **MySQL:** armazenamento dos chamados.
- **n8n:** automação e integração dos serviços.
- **Ollama (Llama 3.2:3b):** classificação de chamados com IA local.
- **Telegram Bot API:** envio de notificações automáticas.
- **JavaScript:** implementação da API e processamento dos dados.

## Classificação dos chamados

O sistema utiliza quatro categorias:

- Hardware
- Software
- Rede
- Acesso

E quatro níveis de prioridade:

- Baixa
- Média
- Alta
- Crítica

A classificação é realizada automaticamente com base no título e na descrição enviados.

## Funcionalidades

- Recebimento de chamados via Webhook.
- Classificação automática utilizando IA.
- Validação das categorias e prioridades retornadas.
- Armazenamento dos chamados em MySQL.
- API REST com operações GET, POST, PUT e DELETE.
- Notificações no Telegram para chamados de alta prioridade.

## Estrutura do projeto

```text
├── database/
│   └── estrutura.sql
├── n8n/
│   └── workflow-sti.json
├── src/
│   ├── app.js
│   ├── config/
│   │   └── database.js
│   └── routes/
│       └── chamados.js
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## Status do projeto

**Versão 1.0 — MVP funcional**

O back-end, a integração com IA, o armazenamento e as notificações estão implementados e foram testados localmente.

**Próximas melhorias planejadas:**
- Desenvolvimento de uma interface web.
- Dashboard para visualização e gerenciamento dos chamados.
- Autenticação e controle de acesso.
- Melhorias no tratamento de erros e na validação das classificações.

## Observações

O projeto funciona atualmente em ambiente local e depende da execução dos serviços Node.js, MySQL, n8n e Ollama.

As credenciais e configurações privadas não estão incluídas no repositório.

## 🎥 Demonstração do projeto

Gravei uma demonstração prática do STI, mostrando o fluxo
completo de abertura e classificação automática de chamados.

No vídeo, apresento a integração entre n8n, Ollama,
API REST com Node.js, MySQL e Telegram.

▶️ [Assista à demonstração no YouTube](https://youtu.be/QZgpF_Jzy1w)
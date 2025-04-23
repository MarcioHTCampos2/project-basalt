Projeto inspirado no Obsidian, feito com React e Vite. Permite escrever e visualizar notas em Markdown, com uma interface simples e funcional.

Funcionalidades implementadas:

- Sidebar com lista de funcionalidades (backlog)
- Editor de texto com suporte a Markdown
- Visualização em tempo real do conteúdo escrito
- Suporte a links no estilo [[nome-da-nota]]
- Estilização escura similar ao Obsidian

Estrutura de pastas atual:

- src/
  - components/
    - Sidebar.jsx
  - pages/
    - NotePage.jsx
  - utils/
    - linkParser.js
  - App.jsx
  - main.jsx
  - index.css

Tecnologias usadas:

- React
- Vite
- Tailwind CSS (ainda nao consegui/isabela)
- React Markdown (react-markdown)

Para rodar o projeto:

1. Clone o repositório
2. Rode npm install
3. Rode npm run dev

Se der erro com o react-markdown, instale com:

npm install react-markdown

Próximos passos:

- Criar sistema de rotas
- Criar múltiplas notas
- Organizar em pastas
- Salvar dados localmente
- Criar versão desktop com Electron
# CLAUDE.md

As instruções do projeto ficam em `AGENTS.md`, compartilhado com outros agentes (Codex, Gemini/Antigravity, Cursor). Edite aquele arquivo — não duplique conteúdo aqui.

@AGENTS.md

## Específico do Claude Code

- Para entender a API pública antes de mudar algo, leia `docs/dynamic-form.md` e `projects/dynamic-form/src/public-api.ts`.
- Validação após mudanças na lib: `npm run build:lib` (não há specs nem target de lint configurados).
- Para conferir o comportamento visual, use o app demo (`npm start`) e o formulário em `projects/demo/src/app/test-form/`.

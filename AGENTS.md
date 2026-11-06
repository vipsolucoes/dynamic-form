# AGENTS.md

Guia para agentes de IA (Claude Code, Codex, Gemini/Antigravity, Cursor etc.) que trabalham neste repositório.
Fonte de verdade da API pública: `docs/dynamic-form.md`. Visão geral para usuários: `README.md`.

## Projeto

`@vipsolucoes/dynamic-form` — biblioteca Angular para gerar formulários reativos dinâmicos a partir de um array de `iFormConfig`, renderizando componentes PrimeNG.

- Angular 21 / PrimeNG 21 no workspace; a lib publica `peerDependencies` para Angular e PrimeNG `^19 || ^20 || ^21`. **Não use APIs que não existam no Angular 19 / PrimeNG 19.**
- TypeScript ~5.9, testes com Vitest (`@angular/build:unit-test`), empacotamento com ng-packagr.
- Idioma do projeto: **português do Brasil** (docs, comentários, mensagens de console, CHANGELOG, commits). Identificadores de código em inglês.

## Estrutura

```
projects/
  dynamic-form/                  # a biblioteca (publicada no npm)
    package.json                 # versão publicada + peerDependencies
    README.md                    # README que vai para o npm
    src/public-api.ts            # superfície pública — tudo que é exportado
    src/lib/
      components/dynamic-form/   # DynamicFormComponent (vp-dynamic-form) — orquestrador
      components/form-field-error/ # DynamicFormErrorComponent (vp-form-field-error)
      fields/                    # um componente standalone por controlType
      directives/                # TextTransformDirective
      interfaces/                # iFormConfig, iFieldOption, DynamicFormErrorMessages
      providers/                 # provideDynamicFormConfig
      services/                  # FieldRegistryService
      i18n/primeng-ptbr.ts       # PRIMENG_PTBR
  demo/                          # app de demonstração/teste manual
    src/app/test-form/           # formulário com exemplos de todos os campos
docs/dynamic-form.md             # documentação completa da API
CHANGELOG.md                     # Keep a Changelog + SemVer, em pt-BR
```

## Comandos

```bash
npm start            # ng serve — sobe o app demo
npm run build:lib    # build de produção da lib -> dist/dynamic-form
npm run test:lib     # testes da lib (Vitest)
npm test             # testes do workspace
npm run release      # build:lib + npm publish (NÃO execute sem pedido explícito)
```

Observações:
- `npm run lint:lib` existe no `package.json`, mas **não há target `lint` no `angular.json`** — o comando falha. Não o use como validação.
- Validação mínima de qualquer mudança: `npm run build:lib` e `npm run test:lib` passando.
- Publicação no npm é feita pelo GitHub Actions (`.github/workflows/publish.yml`) ao criar uma release.

## Arquitetura

1. `DynamicFormComponent` recebe `config = input.required<iFormConfig[]>()`, constrói o `FormGroup` **uma única vez** em `ngOnInit` (`buildForm` → `setupFieldDependencies` → emite `formReady`).
2. O template itera a `config` e renderiza cada campo via `ngComponentOutlet` com inputs `{ form, field }`.
3. `getFieldComponent(controlType)` consulta primeiro o `FieldRegistryService` (campos customizados) e depois o mapa `fieldComponents`.
4. `DynamicFormErrorComponent` exibe a mensagem de erro do controle; mensagens customizáveis via `DYNAMIC_FORM_ERROR_MESSAGES` / `provideDynamicFormConfig`.
5. Não há botão de submit interno — o componente pai controla a submissão (`@ViewChild` → `form`).

Mapa `controlType` → componente (`dynamic-form.component.ts`):

| controlType | Componente |
|---|---|
| `text`, `email` | `InputTextFieldComponent` |
| `password` | `PasswordFieldComponent` |
| `number` | `NumberInputFieldComponent` (`numberConfig`) |
| `select` | `SelectFieldComponent` (`optionLabel`/`optionValue`/`optionMapper`) |
| `datepicker` | `DatePickerFieldComponent` (`dateViewType`, `dateFormat`) |
| `textarea` | `TextareaFieldComponent` |
| `toggleswitch` | `ToggleSwitchFieldComponent` (`toggleTrueValue`/`toggleFalseValue`) |
| `input-button` | `InputButtonFieldComponent` (`buttonConfig`, `buttonCallback`) |
| `select-button` | `SelectButtonFieldComponent` (`buttonConfig`, `buttonCallback`, opções do select, `optionAppendTo`) |
| `radiobutton` | `RadioButtonFieldComponent` (`radioLayout`) |
| `divider` | `DividerFieldComponent` (`dividerConfig`) — **não cria FormControl** |

Regras de comportamento já estabelecidas (não quebre):
- Valor padrão: `toggleswitch` → `false`; `radiobutton` → `null`; demais → `''`.
- `disabled: true` cria o controle com `new FormControl({ value, disabled: true })`. O estado disabled é gerenciado **só pelo FormControl** — nunca faça binding `[disabled]` no template.
- `enabledWhen: '<key>'` só aceita referência a um `toggleswitch`; o campo começa desabilitado se o toggle estiver inativo; ao desativar o toggle, o valor é limpo (`getResetValueForFieldType`) e o campo desabilitado. Referências inválidas geram `console.warn` (não lançam erro).
- `disabled` explícito tem prioridade sobre `enabledWhen`.
- `visible: false` não renderiza o campo, mas o controle continua no `FormGroup`.
- Keys com ponto (`'endereco.rua'`) geram saída flat. Atenção: `FormGroup.get('a.b')` divide o caminho por ponto — para acessar esses controles use `form.get(['a.b'])` (array) ou `form.controls['a.b']`.

## Convenções de código

- Componentes **standalone**, `ChangeDetectionStrategy.OnPush`, prefixo de seletor `vp-` (lib) / `app-` (demo).
- Use APIs de signals: `input()`, `input.required()`, `output()`, `computed()`; `inject()` em vez de injeção por construtor no código novo.
- Control flow moderno nos templates (`@if`, `@for`), não `*ngIf`/`*ngFor`.
- Subscriptions com `takeUntilDestroyed(this.destroyRef)`.
- Campos com label usam `p-iftalabel` (exceções: `toggleswitch` usa label inline à direita; `radiobutton` usa label simples acima do grupo).
- Prettier: `printWidth: 100`, `singleQuote: true`, parser `angular` para HTML. Respeite `.editorconfig`.
- Comentários JSDoc em pt-BR nas propriedades de `iFormConfig`.

## Checklist ao adicionar/alterar funcionalidade

Ao criar um novo `controlType` ou nova propriedade em `iFormConfig`:

1. Interface em `src/lib/interfaces/form-config.interface.ts` (com JSDoc em pt-BR).
2. Componente em `src/lib/fields/` (standalone, OnPush, inputs `form` e `field`).
3. Registro no mapa `fieldComponents` e, se necessário, ajuste em `buildForm` (valor padrão) e `getResetValueForFieldType`.
4. Export em `src/public-api.ts`.
5. Exemplo no app demo (`projects/demo/src/app/test-form/`).
6. Documentação em `docs/dynamic-form.md` (interface, descrição da propriedade, seção de exemplos) e, se for recurso relevante, em `README.md` **e** `projects/dynamic-form/README.md` (este é o que vai para o npm — mantenha os dois coerentes).
7. Entrada no `CHANGELOG.md` (seções `Adicionado` / `Alterado` / `Corrigido` / `Documentação`).
8. `npm run build:lib` passando.

Mudanças devem ser **retrocompatíveis**: propriedades novas sempre opcionais, com default que preserve o comportamento atual.

## Versionamento e release

- SemVer. A versão fica em `projects/dynamic-form/package.json` (o `package.json` da raiz é `0.0.0` e privado).
- Ao versionar: atualize `projects/dynamic-form/package.json` + nova seção `## [vX.Y.Z] - AAAA-MM-DD` no `CHANGELOG.md`.
- Mensagens de commit em pt-BR, no padrão do histórico (ex.: `Atualiza para versão 1.0.10, adicionando ...`).
- Branch principal: `master`. Não faça commit, push, publish ou release sem pedido explícito.

## Não faça

- Não edite `dist/`, `.angular/` nem `node_modules/`.
- Não reconstrua o `FormGroup` em reação a mudanças da `config` (decisão de design: construção única em `ngOnInit`).
- Não acople regras de negócio ao `DynamicFormComponent`; extensões vão em novos componentes de campo ou no `FieldRegistryService` (OCP).
- Não adicione dependências de runtime à lib além de `tslib`; Angular/PrimeNG são peer dependencies.

# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [v1.0.9] - 2026-01-17

### Adicionado

- **Campo Number Aprimorado**: O campo `number` foi completamente refatorado e expandido com suporte a:
  - **Números decimais e monetários**: Modo `decimal` e `currency` através da propriedade `numberConfig.mode`
  - **Formatação monetária**: Suporte completo para moedas (BRL, USD, EUR, etc.) com código ISO 4217
  - **Prefixo e sufixo**: Textos customizados antes/depois do valor (ex: `'R$'`, `'%'`, `' kg'`, `' m²'`)
  - **Validações min/max**: Suporte a valores mínimos e máximos através de `numberConfig.min` e `numberConfig.max`
  - **Botões de incremento/decremento**: Botões +/- para ajustar valores com `showButtons: true`
  - **Botão limpar**: Opção para exibir botão de limpar valor com `showClear: true`
  - **Localização**: Formatação específica por região através de `locale` (pt-BR, en-US, de-DE, etc.)
  - **Controle de casas decimais**: `minFractionDigits` e `maxFractionDigits` para precisão customizada
  - **Separadores de milhar**: Controle de agrupamento de números com `useGrouping`
  - **Step customizado**: Incremento/decremento personalizado para botões
  - **Layout de botões**: Opções `stacked`, `horizontal` ou `vertical` para botões de incremento
  - **Tamanhos e variantes**: Suporte a `size` (small/large) e `variant` (outlined/filled)
  - **Modo readonly**: Campo somente leitura para valores calculados ou não editáveis
- **Propriedade `numberConfig`**: Nova propriedade opcional na interface `iFormConfig` para configurar todas as opções do campo number
- **Mensagens de erro min/max**: Suporte a mensagens de erro customizadas para validações `min` e `max` através de `provideDynamicFormConfig`

### Alterado

- **Compatibilidade retroativa**: Campos `number` sem `numberConfig` mantêm comportamento padrão (números inteiros)
- **Validação visual**: Campo number agora exibe estado inválido visualmente quando há erros de validação

### Documentação

- Adicionada seção completa sobre campos Number na documentação principal
- Adicionados 10 exemplos práticos de uso do campo number (currency, porcentagem, peso, temperatura, etc.)
- Atualizada interface `iFormConfig` na documentação com todas as propriedades de `numberConfig`
- Criado arquivo de exemplos em `docs/examples/number-input-examples.ts`

## [v1.0.8] - 2026-01-15

### Alterado

- Campo `select` agora suporta receber **dados brutos** em `options` (ex: retorno direto de API), além do formato padrão `{ label, value }`:
  - `options?: iFieldOption[] | unknown[]`
- Novas propriedades para `select` na interface `iFormConfig`:
  - `optionLabel` e `optionValue` para extrair label/value diretamente dos objetos (sem `map()` no service)
  - `optionMapper` para cenários de transformação/label composto (mantido como está por enquanto)
- Renomeadas propriedades do `select`:
  - `filter` → `optionFilter`
  - `showClear` → `optionShowClear`
- Removida a propriedade `loading` do `select` (o controle de carregamento permanece sendo responsabilidade do componente pai).

### Documentação

- Atualizada a documentação para refletir o uso de `optionLabel`/`optionValue`/`optionMapper`, a tipagem de `options` e os novos nomes `optionFilter`/`optionShowClear`.

### Demo

- Adicionado exemplo com `select` consumindo dados de API sem mapeamento manual (usando `optionLabel`/`optionValue`) e também exemplo com `optionMapper`.

## [v1.0.7] - 2026-01-14

### Adicionado

- Novo campo do tipo `RadioButton` (`radiobutton`) com suporte a:
  - Layout configurável horizontal ou vertical através da propriedade `radioLayout` (default: `'vertical'`)
  - Label simples acima do grupo de opções (seguindo padrão UX recomendado)
  - Validação visual com estado inválido
  - Integração completa com formulários reativos
  - Suporte a todas as propriedades comuns (`disabled`, `visible`, `enabledWhen`, `validators`, etc.)
- Componente `RadioButtonFieldComponent` utilizando `p-radiobutton` do PrimeNG
- Propriedade `radioLayout?: 'horizontal' | 'vertical'` na interface `iFormConfig`
- Exemplo 19: Formulário com Campos de RadioButton demonstrando:
  - Radio buttons em layout vertical e horizontal
  - Validação obrigatória
  - Valores pré-selecionados
  - Diferentes casos de uso (gênero, prioridade, status, tipo de conta, estado civil)

### Documentação

- Seção completa sobre campos de RadioButton na documentação
- Exemplos de uso com diferentes layouts
- Documentação da propriedade `radioLayout`

## [v1.0.6] - 2026-01-14

### Adicionado

- Novo campo do tipo `Diviser` com opções relacionadas
- Suporte para o campo não ser renderizado usando o parâmetro `visible`
- Exemplo 18: Formulário com Estado e Cidade (Select Dinâmico) demonstrando:
  - Carregamento de estados de arquivo JSON
  - Carregamento dinâmico de cidades via API IBGE quando um estado é selecionado
  - Atualização de opções de select usando imutabilidade para garantir change detection com OnPush
  - Serviço `EstadoCidadeService` para gerenciar busca de estados e cidades

### Documentação

- Exemplo completo de campos select interdependentes com carregamento assíncrono

## [v1.0.5] - 2025-01-14

### Adicionado

- Diretiva `TextTransform` para transformar texto em uppercase ou lowercase

## [v1.0.4] - 2025-01-13

### Adicionado

- Campo `InputButtonField` do tipo `input-button` com possibilidade de capturar o click do botão via callback

## [v1.0.3] - 2025-01-08

### Corrigido

- Removido warning do Angular sobre uso de `[disabled]` com formulários reativos. O estado `disabled` agora é gerenciado exclusivamente pelo `FormControl`, conforme recomendação do Angular. O comportamento funcional permanece idêntico.

## [v1.0.2] - 2025-01-08

### Adicionado

- Tradução completa das mensagens do PrimeNG através da classe `PRIMENG_PTBR`
- Corrige formato padrão para datas

## [v1.0.1] - 2025-01-07

### Adicionado

- Versão inicial da biblioteca
- Componente `DynamicFormComponent` para criação de formulários dinâmicos
- Componente `DynamicFormErrorComponent` para exibição de mensagens de erro
- Componentes de campo: Text, Email, Password, Number, Select, Datepicker, Textarea, ToggleSwitch
- Suporte a validação via `ValidatorFn[]`
- Propriedade `enabledWhen` para campos condicionais
- Propriedade `disabled` para desabilitar campos
- Sistema de registro de campos customizados (`FieldRegistryService`)
- Mensagens de erro customizáveis via `provideDynamicFormConfig`
- Suporte a objetos aninhados via notação de ponto
- Layout customizado via `styleClass`
- ChangeDetectionStrategy.OnPush em todos os componentes
- Output `formReady` para notificar quando o formulário está pronto

### Documentação

- Documentação completa em `docs/dynamic-form.md`
- README.md com quick start e exemplos básicos

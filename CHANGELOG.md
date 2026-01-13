# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

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

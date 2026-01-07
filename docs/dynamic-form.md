# Documentação do Componente `DynamicFormComponent`

[![npm version](https://img.shields.io/npm/v/@vipsolucoes/dynamic-form.svg)](https://www.npmjs.com/package/@vipsolucoes/dynamic-form)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Instalação

```bash
npm install @vipsolucoes/dynamic-form primeng
```

**Requisitos:**
- Angular 19+ ou 20+ ou 21+
- PrimeNG 19+ ou 20+ ou 21+

## Visão Geral

O `DynamicFormComponent` é um componente Angular standalone projetado para gerar formulários reativos de forma dinâmica. Ele abstrai a complexidade da renderização de diferentes tipos de campos de formulário e gerenciamento de validações, permitindo a construção de formulários flexíveis a partir de uma configuração baseada em um array de objetos `iFormConfig`.

Este componente é um exemplo da aplicação de princípios de design como Open/Closed Principle (OCP), Single Responsibility Principle (SRP) e Don't Repeat Yourself (DRY), resultando em uma solução altamente escalável, de fácil manutenção e performática para formulários dinâmicos.

## Arquitetura

A arquitetura do sistema de formulário dinâmico é modular e desacoplada, centrada em torno de três tipos principais de componentes:

1.  **`DynamicFormComponent` (Orquestrador Principal)**: Responsável por gerenciar o `FormGroup` reativo, receber a configuração do formulário e orquestrar a renderização dinâmica dos campos individuais. Não se preocupa com os detalhes de cada campo.
2.  **Componentes de Campo Específicos (e.g., `InputTextFieldComponent`, `PasswordFieldComponent`, `DatePickerFieldComponent`)**: Componentes standalone, cada um responsável por renderizar um tipo específico de controle de formulário (ex: `input` de texto, `p-password`, `p-select`, `p-datepicker`). Eles recebem o `FormGroup` e a configuração do campo como inputs.
3.  **`DynamicFormErrorComponent` (Componente de Erro Centralizado)**: Um componente standalone dedicado a exibir mensagens de validação para um controle de formulário, seguindo o princípio DRY.

### Princípios de Design Aplicados:

*   **Open/Closed Principle (OCP)**: O `DynamicFormComponent` está aberto para extensão (novos tipos de campo podem ser adicionados) mas fechado para modificação. Para adicionar um novo tipo de campo, basta criar um novo componente de campo e registrá-lo usando o `FieldRegistryService`, sem alterar o código-fonte do `DynamicFormComponent`.
*   **Single Responsibility Principle (SRP)**: Cada componente tem uma única responsabilidade bem definida:
    *   `DynamicFormComponent`: Orquestração do formulário.
    *   Componentes de Campo: Renderização e interação com um tipo específico de campo.
    *   `DynamicFormErrorComponent`: Exibição de mensagens de erro.
*   **Don't Repeat Yourself (DRY)**: A lógica de exibição de erros é encapsulada e reutilizada no `DynamicFormErrorComponent`, evitando a duplicação de código no template principal.
*   **Performance**: A construção do `FormGroup` ocorre apenas uma vez durante a inicialização do componente (`ngOnInit`), evitando reconstruções desnecessárias que causariam perda de estado e ineficiência. Todos os componentes utilizam `ChangeDetectionStrategy.OnPush` para otimização de performance.
*   **IftaLabel**: Utiliza `p-iftalabel` do PrimeNG para labels "infield top aligned", proporcionando uma melhor experiência visual e UX moderna.

## Componentes

### 1. `DynamicFormComponent`

**Seletor**: `vp-dynamic-form`
**Tipo**: Standalone Component

#### Entradas (`input`)

*   `config`: `input.required<iFormConfig[]>()`
    *   Um array de objetos que define a estrutura e o comportamento de cada campo no formulário.
    *   Pode incluir keys com notação de ponto (ex: `'endereco.rua'`) para suportar objetos aninhados.

#### Saídas (`output`)

*   `formReady`: `output<FormGroup>()`
    *   Emitido quando o formulário é construído e está pronto para uso.

#### Propriedades

*   `form`: `FormGroup`
    *   A instância do `FormGroup` que gerencia os controles do formulário.
*   `fieldComponents`: `{ [key: string]: Type<any> }`
    *   Um mapa que associa `controlType` (string) da `iFormConfig` a uma classe de componente Angular (`Type<any>`). Essencial para a renderização dinâmica.
    *   Exemplo:
        ```typescript
        readonly fieldComponents: { [key: string]: Type<any> } = {
          text: InputTextFieldComponent,
          email: InputTextFieldComponent,
          password: PasswordFieldComponent,
          number: NumberInputFieldComponent,
          select: SelectFieldComponent,
          datepicker: DatePickerFieldComponent,
          textarea: TextareaFieldComponent,
          toggleswitch: ToggleSwitchFieldComponent,
        };
        ```

#### Métodos

*   `ngOnInit(): void`
    *   Hook do ciclo de vida onde o formulário é construído uma única vez com base na `config` inicial.
*   `private buildForm(config: iFormConfig[]): void`
    *   Itera sobre a `config` fornecida, cria uma instância `FormControl` para cada campo e a adiciona ao `FormGroup`.
    *   Atribui diretamente as funções de validação (`ValidatorFn[]`) fornecidas na `iFormConfig` ao `FormControl`.
    *   Quando `field.disabled` é `true`, cria o `FormControl` como desabilitado usando `new FormControl({ value, disabled: true })`.
*   `getControl(key: string): AbstractControl`
    *   Método auxiliar para acessar uma instância de `AbstractControl` do `FormGroup` usando sua `key`.
    *   Suporta keys simples (ex: `'nome'`) e keys com notação de ponto (ex: `'endereco.rua'`).
*   `getFieldComponent(controlType: string): Type<any> | undefined`
    *   Obtém o componente a ser renderizado para um tipo de campo. Primeiro verifica no registro customizado (`FieldRegistryService`), depois nos componentes padrão.
*   `private setupFieldDependencies(config: iFormConfig[]): void`
    *   Configura dependências entre campos usando a propriedade `enabledWhen`. Quando um campo tem `enabledWhen` definido, ele é habilitado/desabilitado automaticamente baseado no estado do toggleSwitch referenciado. Quando o toggle é desativado, o campo dependente é limpo antes de ser desabilitado.
*   `private getResetValueForFieldType(controlType: string): any`
    *   Retorna o valor padrão de reset para cada tipo de campo. Usado quando um campo dependente é desabilitado e precisa ser limpo. Campos de texto retornam string vazia `''`, enquanto campos numéricos, select e datepicker retornam `null`.

### 2. Componentes de Campo Específicos

Exemplos: `InputTextFieldComponent`, `PasswordFieldComponent`, `NumberInputFieldComponent`, `SelectFieldComponent`, `DatePickerFieldComponent`, `TextareaFieldComponent`, `ToggleSwitchFieldComponent`.

**Características Comuns**:
*   **Tipo**: Standalone Component com `ChangeDetectionStrategy.OnPush`
*   **Entradas (`input`)**:
    *   `form`: `input.required<FormGroup>()`
        *   O `FormGroup` pai ao qual o controle pertence.
    *   `field`: `input.required<iFormConfig>()`
        *   A configuração específica para este campo.
*   **Responsabilidade**: Renderizar o elemento HTML de formulário apropriado (geralmente um componente PrimeNG) e vinculá-lo ao `FormGroup` através de `formControlName`. Eles também aplicam `id`, `placeholder` e `disabled` com base na `field` configuration.
*   **PrimeNG**: Cada componente de campo importa e utiliza os módulos PrimeNG relevantes para o seu tipo (e.g., `InputTextModule`, `PasswordModule`, `InputNumberModule`, `SelectModule`, `DatePickerModule`, `TextareaModule`, `ToggleSwitch`).
*   **IftaLabel**: A maioria dos componentes de campo utiliza `p-iftalabel` do PrimeNG para renderizar labels no estilo "infield top aligned", proporcionando uma melhor experiência visual. **Exceção**: `ToggleSwitchFieldComponent` utiliza label inline ao lado do componente, seguindo o padrão UX recomendado para toggles.

#### `DatePickerFieldComponent`

Componente especializado para campos de data com suporte a diferentes tipos de visualização.

**Características Especiais**:
*   **Formato Automático**: Utiliza um `computed signal` para calcular automaticamente o formato da data baseado no `dateViewType`:
    *   `dateViewType: 'date'` → formato padrão `'dd/mm/yyyy'` (ou `dateFormat` customizado se fornecido)
    *   `dateViewType: 'month'` → formato automático `'mm/yy'`
    *   `dateViewType: 'year'` → formato automático `'yy'`
*   **Propriedades Específicas**: Utiliza `dateFormat` e `dateViewType` da `iFormConfig` para configurar o comportamento do datepicker.
*   **Valores**: Aceita objetos `Date` do JavaScript como valores iniciais.

#### `ToggleSwitchFieldComponent`

Componente especializado para campos de toggle switch (liga/desliga).

**Características Especiais**:
*   **Label Inline**: Utiliza uma label HTML padrão (`<label for>`) posicionada à direita do toggle switch, ao invés de `p-iftalabel`. Isso segue o padrão UX recomendado para componentes de toggle.
*   **Valores Customizados**: Suporta valores customizados através de `toggleTrueValue` e `toggleFalseValue` da `iFormConfig`.
*   **Valor Padrão**: O valor padrão para campos de toggle switch é `false` (não string vazia).
*   **Validação Visual**: Exibe estado inválido através da propriedade `invalid` do `p-toggleswitch` quando o campo está inválido e foi tocado/modificado.

### 3. `DynamicFormErrorComponent`

**Seletor**: `vp-form-field-error`
**Tipo**: Standalone Component

#### Entradas (`input`)

*   `control`: `input.required<AbstractControl>()`
    *   O `FormControl` ou `FormGroup` (ou qualquer `AbstractControl`) para o qual as mensagens de erro devem ser exibidas.

#### Propriedades

*   `errorMessage`: `getter: string | null`
    *   Um getter que retorna a mensagem de erro mais relevante para o `control` fornecido, ou `null` se não houver erros ou se o controle não tiver sido tocado/modificado.
    *   Utiliza detecção de mudanças do Angular para atualizar automaticamente quando o estado do controle muda.
    *   Suporta mensagens customizadas via `DYNAMIC_FORM_ERROR_MESSAGES` InjectionToken.

## Fluxo de Dados

### Interface `iFormConfig`

Define a estrutura de dados para configurar um campo de formulário dinâmico.

```typescript
import { iFormConfig, iFieldOption } from '@vipsolucoes/dynamic-form';

export interface iFieldOption {
  label: string;
  value: any;
}

export interface iFormConfig {
  key: string;
  controlType: 'text' | 'password' | 'email' | 'number' | 'select' | 'datepicker' | 'textarea' | 'toggleswitch';
  label: string;
  value?: any;
  placeholder?: string;
  hint?: string;
  disabled?: boolean; // Indica se o campo deve estar desabilitado. Default: false.
  enabledWhen?: string; // Chave (key) do campo toggleSwitch que controla a habilitação deste campo.
  styleClass?: string;
  options?: iFieldOption[];
  validators?: ValidatorFn[]; // Array de ValidatorFn diretamente
  dateFormat?: string; // Para controlType: 'datepicker'
  dateViewType?: 'date' | 'month' | 'year'; // Para controlType: 'datepicker'
  textareaAutoResize?: boolean; // Para controlType: 'textarea'
  textareaRows?: number; // Para controlType: 'textarea'
  textareaCols?: number; // Para controlType: 'textarea'
  toggleTrueValue?: any; // Para controlType: 'toggleswitch'
  toggleFalseValue?: any; // Para controlType: 'toggleswitch'
}
```

*   `key`: Identificador único para o `FormControl`.
*   `controlType`: Determina qual componente de campo será renderizado e qual tipo de input HTML será usado (ex: `'text'`, `'password'`, `'select'`, `'datepicker'`).
*   `label`: Texto do rótulo para o campo.
*   `value?`: Valor inicial opcional do campo. Para `datepicker`, use objetos `Date` do JavaScript (ex: `new Date('2024-01-15')`).
*   `placeholder?`: Texto de placeholder opcional.
*   `hint?`: Texto de dica opcional exibido abaixo do campo.
*   `disabled?`: Indica se o campo deve estar desabilitado. Quando `true`, o campo não pode ser editado e o `FormControl` é criado como desabilitado. Default: `false`. Aplicável a todos os tipos de campo.
*   `enabledWhen?`: Chave (key) do campo toggleSwitch que controla a habilitação deste campo. Quando o toggle referenciado estiver ativado (true), este campo será habilitado. Quando desativado (false), este campo será desabilitado e seu valor será limpo automaticamente. Aplicável a todos os tipos de campo exceto `toggleswitch`. O campo referenciado deve existir no formulário e ser do tipo `toggleswitch`.
*   `styleClass?`: Classes CSS adicionais para o wrapper do campo. Útil para criar layouts customizados (ex: `'grid-col-6'` para campos lado a lado em um grid de 12 colunas).
*   `options?`: Necessário para `controlType: 'select'`, fornecendo as opções do dropdown.
*   `validators?`: Um array de funções `ValidatorFn` do Angular Forms, aplicadas diretamente ao `FormControl`.
*   `dateFormat?`: Formato de data customizado para `controlType: 'datepicker'`. Default: `'dd/mm/yyyy'` quando `dateViewType` é `'date'`. Para `'month'` e `'year'`, o formato é calculado automaticamente (`'mm/yy'` e `'yy'` respectivamente).
*   `dateViewType?`: Tipo de visualização do datepicker. Opções: `'date'` (data completa), `'month'` (mês/ano), `'year'` (ano). Default: `'date'`. O formato é ajustado automaticamente baseado neste valor.
*   `textareaAutoResize?`: Habilita redimensionamento automático do textarea. Default: `false`. Aplicável apenas para `controlType: 'textarea'`.
*   `textareaRows?`: Número de linhas do textarea. Default: `1` quando `controlType` é `'textarea'`. Aplicável apenas para `controlType: 'textarea'`.
*   `textareaCols?`: Número de colunas do textarea. Opcional, sem default. Aplicável apenas para `controlType: 'textarea'`.
*   `toggleTrueValue?`: Valor quando o toggle switch está ativado. Default: `true`. Aplicável apenas para `controlType: 'toggleswitch'`.
*   `toggleFalseValue?`: Valor quando o toggle switch está desativado. Default: `false`. Aplicável apenas para `controlType: 'toggleswitch'`.

### De Configuração a Formulário Renderizado

1.  O componente pai fornece um array de `iFormConfig[]` para o `DynamicFormComponent`.
2.  No `ngOnInit`, o `DynamicFormComponent` itera sobre este array:
    *   Para cada `iFormConfig`, ele cria um `FormControl` com o `value` inicial e os `validators` fornecidos.
    *   Se `field.disabled` for `true`, o `FormControl` é criado como desabilitado usando `new FormControl({ value, disabled: true })`.
    *   O `FormControl` é adicionado ao `FormGroup` principal com a `key` especificada.
3.  No template do `DynamicFormComponent`, um `@for` itera sobre a mesma `config`:
    *   Para cada `field`, o `controlType` é usado para lookup no método `getFieldComponent()` que verifica primeiro o registro customizado e depois os componentes padrão.
    *   `ngComponentOutlet` renderiza dinamicamente o componente de campo correspondente, passando o `FormGroup` principal e a configuração específica do campo (`field`) como inputs.
    *   Cada componente de campo aplica a propriedade `disabled` ao componente PrimeNG correspondente através do binding `[disabled]="field().disabled ?? false"`.
    *   O `DynamicFormErrorComponent` é incluído para cada campo, recebendo o `FormControl` associado para exibir erros.

## Implementações Chave

### Renderização Dinâmica de Campos com `NgComponentOutlet`

A capacidade de renderizar dinamicamente diferentes componentes de campo é a pedra angular da flexibilidade deste formulário. O `NgComponentOutlet` é utilizado para esta finalidade.

```html
<!-- dynamic-form.component.html -->
<ng-container
  [ngComponentOutlet]="getFieldComponent(field.controlType)"
  [ngComponentOutletInputs]="{ form: form, field: field }"
/>
```

Isso permite que o `DynamicFormComponent` permaneça genérico, delegando a responsabilidade de renderização a componentes especializados, o que facilita a adição de novos tipos de campo sem modificar o orquestrador principal.

### Registro de Campos Customizados

O `FieldRegistryService` permite registrar novos tipos de campos dinamicamente:

```typescript
import { FieldRegistryService } from '@vipsolucoes/dynamic-form';

// No seu componente ou serviço
constructor(private fieldRegistry: FieldRegistryService) {}

ngOnInit() {
  // Registrar um campo customizado
  this.fieldRegistry.registerField('custom', MyCustomFieldComponent);
}
```

### Tratamento Centralizado de Erros

O `DynamicFormErrorComponent` centraliza a lógica de exibição e as mensagens de erro, tornando o tratamento de validação consistente e fácil de manter.

```html
<!-- dynamic-form.component.html -->
<vp-form-field-error [control]="getControl(field.key)" />
```

O getter `errorMessage` dentro do `DynamicFormErrorComponent` é avaliado a cada ciclo de detecção de mudanças do Angular, exibindo a mensagem apropriada quando o estado do `control` muda (erros, `touched`, `dirty`).

### Mensagens de Erro Customizadas

Você pode customizar as mensagens de erro usando o provider `provideDynamicFormConfig`:

```typescript
import { provideDynamicFormConfig } from '@vipsolucoes/dynamic-form';

bootstrapApplication(AppComponent, {
  providers: [
    provideDynamicFormConfig({
      required: 'Este campo é obrigatório.',
      email: 'Por favor, insira um e-mail válido.',
      minlength: (length) => `Mínimo de ${length} caracteres.`,
      maxlength: (length) => `Máximo de ${length} caracteres.`,
    }),
  ],
});
```

### Gerenciamento de Validação

A aceitação direta de `ValidatorFn[]` na `iFormConfig` simplifica o processo de validação. Isso coloca a responsabilidade de fornecer validadores concretos no ponto de configuração do formulário, em vez de exigir que o `DynamicFormComponent` interprete regras de validação.

## Uso

### Uso Básico

Para utilizar o `DynamicFormComponent`:

1.  **Importe o componente**:
    ```typescript
    import { DynamicFormComponent, iFormConfig } from '@vipsolucoes/dynamic-form';
    ```

2.  **Defina a Configuração do Formulário**: Crie um array de objetos `iFormConfig` que descrevem os campos desejados.
    ```typescript
    import { Validators } from '@angular/forms';
    import { iFormConfig } from '@vipsolucoes/dynamic-form';

    export const myFormConfig: iFormConfig[] = [
      {
        key: 'username',
        controlType: 'text',
        label: 'Nome de Usuário',
        placeholder: 'Digite seu nome de usuário',
        validators: [Validators.required, Validators.minLength(3)],
      },
      {
        key: 'email',
        controlType: 'email',
        label: 'Email',
        placeholder: 'seu@email.com',
        validators: [Validators.required, Validators.email],
      },
      {
        key: 'password',
        controlType: 'password',
        label: 'Senha',
        validators: [Validators.required, Validators.minLength(6)],
      },
      {
        key: 'userType',
        controlType: 'select',
        label: 'Tipo de Usuário',
        options: [{ label: 'Administrador', value: 'admin' }, { label: 'Comum', value: 'user' }],
        value: 'user',
        validators: [Validators.required],
      },
      {
        key: 'birthDate',
        controlType: 'datepicker',
        label: 'Data de Nascimento',
        validators: [Validators.required],
        placeholder: 'Selecione a data',
        dateViewType: 'date',
      },
      {
        key: 'description',
        controlType: 'textarea',
        label: 'Descrição',
        placeholder: 'Digite a descrição...',
        textareaRows: 5,
        textareaAutoResize: true,
        validators: [Validators.required],
      },
      {
        key: 'active',
        controlType: 'toggleswitch',
        label: 'Ativo',
        validators: [Validators.required],
        hint: 'Marque para ativar o registro',
      },
    ];
    ```

3.  **Use o Componente no Template**: Passe a configuração para o input `config` do `vp-dynamic-form`.
    ```html
    <!-- Em um componente pai -->
    <vp-dynamic-form [config]="myFormConfig" />
    ```

### Controle de Submissão pelo Componente Pai

O componente **não possui botão de submit interno**. O controle de submissão deve ser feito pelo componente pai usando `@ViewChild`:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '@vipsolucoes/dynamic-form';

@Component({
  selector: 'app-example',
  template: `
    <vp-dynamic-form #myForm [config]="formConfig" />
    <button (click)="onSubmit()">Enviar</button>
  `
})
export class ExampleComponent {
  @ViewChild('myForm') myForm!: DynamicFormComponent;
  
  formConfig = signal<iFormConfig[]>([/* ... */]);

  onSubmit(): void {
    if (this.myForm.form.valid) {
      console.log('Dados:', this.myForm.form.value);
      // Enviar dados ao backend, etc.
    } else {
      this.myForm.form.markAllAsTouched();
    }
  }
}
```

### Layout Customizado com `styleClass`

Use a propriedade `styleClass` para criar layouts customizados. O exemplo abaixo demonstra um grid de 12 colunas:

```typescript
const layoutConfig: iFormConfig[] = [
  {
    key: 'firstName',
    controlType: 'text',
    label: 'Primeiro Nome',
    validators: [Validators.required],
    styleClass: 'grid-col-6', // Ocupa 6 colunas (50%)
  },
  {
    key: 'lastName',
    controlType: 'text',
    label: 'Sobrenome',
    validators: [Validators.required],
    styleClass: 'grid-col-6', // Ocupa 6 colunas (50%)
  },
  {
    key: 'email',
    controlType: 'email',
    label: 'Email',
    validators: [Validators.required, Validators.email],
    styleClass: 'grid-col-12', // Ocupa 12 colunas (100%)
  },
];
```

No componente pai, você precisa aplicar o layout CSS apropriado:

```scss
::ng-deep vp-dynamic-form {
  .dynamic-form-container {
    display: grid !important;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
  }

  .form-field-wrapper.grid-col-6 {
    grid-column: span 6;
  }

  .form-field-wrapper.grid-col-12 {
    grid-column: span 12;
  }
}
```

### Objetos Aninhados com Notação de Ponto

Para trabalhar com objetos aninhados (ex: `Pessoa` com `Endereco`), use notação de ponto nas keys:

```typescript
const nestedConfig: iFormConfig[] = [
  {
    key: 'nome',
    controlType: 'text',
    label: 'Nome Completo',
    validators: [Validators.required],
  },
  {
    key: 'endereco.rua',
    controlType: 'text',
    label: 'Rua',
    validators: [Validators.required],
  },
  {
    key: 'endereco.cidade',
    controlType: 'text',
    label: 'Cidade',
    validators: [Validators.required],
  },
  {
    key: 'endereco.estado',
    controlType: 'select',
    label: 'Estado',
    options: [
      { label: 'São Paulo', value: 'SP' },
      { label: 'Rio de Janeiro', value: 'RJ' },
    ],
    validators: [Validators.required],
  },
];
```

O formulário retornará dados em formato **flat**:

```typescript
// Output do formulário (flat)
{
  nome: 'João',
  'endereco.rua': 'Av. Brasil',
  'endereco.cidade': 'São Paulo',
  'endereco.estado': 'SP'
}
```

Para transformar em objeto aninhado, use uma função utilitária:

```typescript
private flatToNested(flatObj: Record<string, any>): any {
  const result: any = {};

  for (const [key, value] of Object.entries(flatObj)) {
    if (key.includes('.')) {
      const keys = key.split('.');
      let current = result;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
    } else {
      result[key] = value;
    }
  }

  return result;
}

// Uso
const flatData = this.myForm.form.value;
const nestedData = this.flatToNested(flatData);
// Resultado: { nome: 'João', endereco: { rua: 'Av. Brasil', cidade: 'São Paulo', estado: 'SP' } }
```

### Campos de Data (Datepicker)

O componente suporta campos de data através do `controlType: 'datepicker'`, utilizando o componente `DatePickerFieldComponent` que renderiza o `p-datepicker` do PrimeNG.

#### Tipos de Visualização

O datepicker suporta três tipos de visualização através da propriedade `dateViewType`:

1. **Data Completa (`'date'`)**: Exibe calendário completo para seleção de dia, mês e ano.
   - Formato padrão: `'dd/mm/yyyy'`
   - Pode ser customizado via `dateFormat`

2. **Mês/Ano (`'month'`)**: Exibe apenas seleção de mês e ano.
   - Formato automático: `'mm/yy'`
   - Útil para vencimentos de cartão, contratos, etc.

3. **Ano (`'year'`)**: Exibe apenas seleção de ano.
   - Formato automático: `'yy'`
   - Útil para anos de formatura, fundação, etc.

#### Exemplo de Uso Básico

```typescript
const dateFormConfig: iFormConfig[] = [
  {
    key: 'birthDate',
    controlType: 'datepicker',
    label: 'Data de Nascimento',
    validators: [Validators.required],
    placeholder: 'Selecione a data',
    dateViewType: 'date',
    hint: 'Formato: dd/mm/yyyy',
  },
  {
    key: 'cardExpiry',
    controlType: 'datepicker',
    label: 'Vencimento do Cartão',
    validators: [Validators.required],
    placeholder: 'MM/AA',
    dateViewType: 'month',
    hint: 'Mês e ano de vencimento',
  },
  {
    key: 'graduationYear',
    controlType: 'datepicker',
    label: 'Ano de Formatura',
    validators: [Validators.required],
    placeholder: 'Selecione o ano',
    dateViewType: 'year',
    hint: 'Ano em que se formou',
  },
];
```

#### Campo de Data Pré-preenchido

Para campos de data com valor inicial, use objetos `Date`:

```typescript
{
  key: 'registrationDate',
  controlType: 'datepicker',
  label: 'Data de Cadastro',
  value: new Date('2024-01-15'),
  validators: [Validators.required],
  placeholder: 'Data de cadastro',
  dateViewType: 'date',
}
```

#### Formato Automático

O formato da data é calculado automaticamente pelo `DatePickerFieldComponent` usando um `computed signal`:

- Quando `dateViewType === 'month'` → formato `'mm/yy'` (independente de `dateFormat`)
- Quando `dateViewType === 'year'` → formato `'yy'` (independente de `dateFormat`)
- Quando `dateViewType === 'date'` → usa `dateFormat` fornecido ou padrão `'dd/mm/yyyy'`

Isso garante que o formato sempre corresponda ao tipo de visualização selecionado, melhorando a experiência do usuário.

### Campos de Textarea

O componente suporta campos de textarea através do `controlType: 'textarea'`, utilizando o componente `TextareaFieldComponent` que renderiza o `pTextarea` do PrimeNG.

#### Propriedades Específicas

O textarea suporta três propriedades específicas:

1. **`textareaRows`**: Define o número de linhas visíveis do textarea. Default: `1` quando `controlType` é `'textarea'`.
2. **`textareaCols`**: Define o número de colunas do textarea. Opcional, sem default. Quando não informado, o textarea usa largura 100% via CSS.
3. **`textareaAutoResize`**: Habilita redimensionamento automático conforme o usuário digita. Default: `false`.

#### Exemplo de Uso Básico

```typescript
const textareaFormConfig: iFormConfig[] = [
  {
    key: 'description',
    controlType: 'textarea',
    label: 'Descrição',
    validators: [Validators.required],
    placeholder: 'Digite a descrição...',
    textareaRows: 5,
    textareaAutoResize: true,
    hint: 'Descreva detalhadamente',
  },
  {
    key: 'comments',
    controlType: 'textarea',
    label: 'Comentários',
    placeholder: 'Adicione seus comentários...',
    textareaRows: 3,
    textareaCols: 50,
    validators: [Validators.maxLength(500)],
  },
];
```

#### Textarea com Redimensionamento Automático

Quando `textareaAutoResize` é `true`, o textarea cresce automaticamente conforme o conteúdo é digitado:

```typescript
{
  key: 'notes',
  controlType: 'textarea',
  label: 'Notas',
  placeholder: 'Digite suas notas...',
  textareaRows: 3,
  textareaAutoResize: true,
}
```

### Dependência entre ToggleSwitch e Campos (`enabledWhen`)

O componente suporta criar dependências dinâmicas entre campos usando a propriedade `enabledWhen`. Esta funcionalidade permite que campos sejam habilitados/desabilitados automaticamente baseado no estado de um toggleSwitch específico.

#### Como Funciona

Quando um campo possui a propriedade `enabledWhen` definida com a `key` de um toggleSwitch:

1. **Toggle Ativado**: O campo dependente é habilitado automaticamente, permitindo que o usuário interaja com ele.
2. **Toggle Desativado**: O campo dependente é desabilitado e seu valor é limpo automaticamente:
   - Campos de texto (`text`, `email`, `password`, `textarea`) são limpos para string vazia `''`
   - Campos numéricos (`number`), select e datepicker são limpos para `null`

#### Validações de Segurança

O componente valida automaticamente:
- Se o campo referenciado em `enabledWhen` existe no formulário
- Se o campo referenciado é do tipo `toggleswitch`
- Emite warnings no console se alguma validação falhar

#### Exemplo de Uso

```typescript
const dependencyFormConfig: iFormConfig[] = [
  {
    key: 'notificacoes',
    label: 'Ativar Notificações',
    controlType: 'toggleswitch',
    value: false,
    hint: 'Ative para configurar as notificações',
  },
  {
    key: 'emailNotificacao',
    label: 'Email para Notificações',
    controlType: 'email',
    enabledWhen: 'notificacoes', // Campo habilitado quando toggle 'notificacoes' = true
    validators: [Validators.email],
    placeholder: 'email@exemplo.com',
    hint: 'Este campo só fica habilitado quando "Ativar Notificações" estiver ativo',
  },
  {
    key: 'telefoneNotificacao',
    label: 'Telefone para Notificações',
    controlType: 'text',
    enabledWhen: 'notificacoes',
    validators: [Validators.minLength(10)],
    placeholder: '(00) 00000-0000',
    hint: 'Este campo só fica habilitado quando "Ativar Notificações" estiver ativo',
  },
  {
    key: 'aceitarTermos',
    label: 'Aceitar Termos e Condições',
    controlType: 'toggleswitch',
    value: false,
    hint: 'Você precisa aceitar os termos para continuar',
  },
  {
    key: 'dataAceite',
    label: 'Data de Aceite',
    controlType: 'datepicker',
    enabledWhen: 'aceitarTermos',
    validators: [Validators.required],
    placeholder: 'Selecione a data',
    dateViewType: 'date',
    hint: 'Este campo só fica habilitado quando "Aceitar Termos" estiver ativo',
  },
];
```

#### Comportamento

*   Quando o toggle referenciado é ativado, o campo dependente é habilitado automaticamente através de uma subscription reativa no `valueChanges` do toggle.
*   Quando o toggle é desativado, o campo dependente é limpo (resetado para seu valor padrão) e depois desabilitado.
*   O estado inicial do campo dependente é determinado pelo estado inicial do toggle: se o toggle já estiver ativo na inicialização, o campo começa habilitado.
*   As subscriptions são gerenciadas automaticamente usando `takeUntilDestroyed`, garantindo que não haja vazamentos de memória.
*   A propriedade `enabledWhen` pode ser combinada com `disabled`: se `disabled: true` for definido explicitamente, o campo permanecerá desabilitado independente do estado do toggle.

#### Casos de Uso

Esta funcionalidade é útil para:
- Formulários condicionais onde campos só devem aparecer quando uma opção está ativada
- Configurações opcionais que só são necessárias quando uma funcionalidade está habilitada
- Formulários de aceite de termos onde campos adicionais só ficam disponíveis após aceitar
- Configurações de notificações onde campos de contato só são necessários quando notificações estão ativas

### Campos Desabilitados

Todos os tipos de campo suportam a propriedade `disabled` para desabilitar campos que não devem ser editados. Quando `disabled: true`, o campo é renderizado como desabilitado e o `FormControl` é criado como desabilitado, impedindo que o usuário interaja com o campo.

#### Exemplo de Uso

```typescript
const disabledFormConfig: iFormConfig[] = [
  {
    key: 'name',
    label: 'Nome Completo',
    controlType: 'text',
    value: 'João Silva',
    disabled: true,
    validators: [Validators.required],
    placeholder: 'Digite seu nome',
    hint: 'Este campo está desabilitado e não pode ser editado',
  },
  {
    key: 'email',
    label: 'Email',
    controlType: 'email',
    value: 'joao.silva@example.com',
    disabled: true,
    validators: [Validators.required, Validators.email],
    placeholder: 'seu@email.com',
    hint: 'Email desabilitado',
  },
  {
    key: 'plan',
    label: 'Plano',
    controlType: 'select',
    value: 'pro',
    disabled: true,
    options: [
      { label: 'Básico', value: 'basic' },
      { label: 'Profissional', value: 'pro' },
      { label: 'Empresarial', value: 'enterprise' },
    ],
    validators: [Validators.required],
    hint: 'Plano desabilitado',
  },
  {
    key: 'active',
    label: 'Ativo',
    controlType: 'toggleswitch',
    value: true,
    disabled: true,
    hint: 'Toggle switch desabilitado',
  },
];
```

#### Comportamento

*   Quando `disabled: true`, o `FormControl` é criado usando `new FormControl({ value, disabled: true })`, garantindo que o campo esteja desabilitado tanto no nível do formulário reativo quanto na interface do usuário.
*   Campos desabilitados não podem ser editados pelo usuário e não participam da validação do formulário (campos desabilitados são excluídos de `form.value` por padrão do Angular).
*   A propriedade `disabled` é aplicada diretamente aos componentes PrimeNG através do binding `[disabled]`, garantindo que o estado visual do componente reflita o estado desabilitado.
*   Útil para campos de visualização apenas, campos pré-preenchidos que não devem ser alterados, ou campos que dependem de condições específicas para serem habilitados.

### Campos de Toggle Switch

O componente suporta campos de toggle switch através do `controlType: 'toggleswitch'`, utilizando o componente `ToggleSwitchFieldComponent` que renderiza o `p-toggleswitch` do PrimeNG.

**Características Especiais**:
*   **Label Inline**: Diferente dos outros campos que usam `p-iftalabel`, o toggle switch utiliza uma label inline posicionada à direita do componente, seguindo o padrão UX recomendado para toggles.
*   **Valores Customizados**: Permite definir valores customizados para os estados ativado e desativado através das propriedades `toggleTrueValue` e `toggleFalseValue`.
*   **Valor Padrão**: O valor padrão para campos de toggle switch é `false` (não `''` como nos outros campos).

#### Propriedades Específicas

O toggle switch suporta duas propriedades específicas:

1. **`toggleTrueValue`**: Valor quando o toggle switch está ativado. Default: `true`. Útil quando você precisa de valores específicos como `'S'`, `'N'`, `1`, `0`, ou strings customizadas.
2. **`toggleFalseValue`**: Valor quando o toggle switch está desativado. Default: `false`.

#### Exemplo de Uso Básico

```typescript
const toggleFormConfig: iFormConfig[] = [
  {
    key: 'active',
    controlType: 'toggleswitch',
    label: 'Ativo',
    validators: [Validators.required],
    hint: 'Marque para ativar o registro',
  },
  {
    key: 'notifications',
    controlType: 'toggleswitch',
    label: 'Receber Notificações',
    value: true, // Pré-selecionado como ativado
    hint: 'Receba notificações por email',
  },
];
```

#### Toggle Switch com Valores Customizados

Para casos onde você precisa de valores específicos (ex: integração com APIs que esperam `'S'`/`'N'` ou `1`/`0`):

```typescript
{
  key: 'status',
  controlType: 'toggleswitch',
  label: 'Status',
  toggleTrueValue: 'S',
  toggleFalseValue: 'N',
  value: 'N',
  validators: [Validators.required],
  hint: 'S = Sim, N = Não',
}
```

#### Toggle Switch em Layouts com Grid

O toggle switch também suporta layouts customizados via `styleClass`:

```typescript
const layoutConfig: iFormConfig[] = [
  {
    key: 'active',
    controlType: 'toggleswitch',
    label: 'Ativo',
    styleClass: 'grid-col-6',
  },
  {
    key: 'featured',
    controlType: 'toggleswitch',
    label: 'Destaque',
    styleClass: 'grid-col-6',
  },
];
```

## Melhorias Implementadas

As seguintes melhorias foram implementadas na versão atual:

*   **IftaLabel**: Substituição do `p-floatLabel` por `p-iftalabel` para melhor visualização e UX moderna.
*   **Controle de Submissão Externo**: Remoção do botão de submit interno, permitindo que o componente pai controle totalmente a submissão via `@ViewChild`.
*   **Suporte a Objetos Aninhados**: Suporte para keys com notação de ponto (ex: `'endereco.rua'`) para trabalhar com estruturas de dados complexas.
*   **Layout Customizado**: Suporte para classes CSS customizadas via `styleClass` para criar layouts flexíveis (ex: grid de 12 colunas).
*   **Simplificação do Código**: Remoção de `effect` em favor de `OnInit` para código mais simples e previsível.
*   **Otimização de Mensagens de Erro**: Uso de getter em vez de `computed` para melhor performance e código mais simples.
*   **Campo de Data (Datepicker)**: Adicionado suporte para campos de data com três tipos de visualização (date, month, year) e formato automático baseado no tipo selecionado.
*   **Campo de Textarea**: Adicionado suporte para campos de textarea com opções de configuração de linhas (`textareaRows`), colunas (`textareaCols`) e redimensionamento automático (`textareaAutoResize`).
*   **Campo de Toggle Switch**: Adicionado suporte para campos de toggle switch com label inline, valores customizados (`toggleTrueValue` e `toggleFalseValue`) e integração com formulários reativos.
*   **Propriedade Disabled**: Adicionado suporte para desabilitar campos através da propriedade `disabled` na `iFormConfig`. Quando `disabled: true`, o campo não pode ser editado e o `FormControl` é criado como desabilitado. Aplicável a todos os tipos de campo (text, email, password, number, select, datepicker, textarea, toggleswitch).
*   **Dependência entre ToggleSwitch e Campos (`enabledWhen`)**: Adicionado suporte para criar dependências dinâmicas entre campos usando a propriedade `enabledWhen`. Quando um campo referencia a `key` de um toggleSwitch através de `enabledWhen`, ele é habilitado automaticamente quando o toggle está ativado e desabilitado (com limpeza automática do valor) quando o toggle está desativado. Isso permite criar formulários condicionais onde campos só ficam disponíveis quando uma opção está ativada.
*   **ChangeDetectionStrategy.OnPush**: Todos os componentes utilizam `OnPush` para otimização de performance.
*   **FieldRegistryService**: Sistema de registro de campos customizados para extensibilidade.
*   **Mensagens de Erro Customizáveis**: Suporte a mensagens de erro customizadas via `provideDynamicFormConfig`.

## Pontos para Melhoria Futura

Apesar da robustez da implementação atual, as seguintes áreas podem ser consideradas para futuras melhorias:

*   **Validação Assíncrona**: Atualmente, apenas validadores síncronos são suportados via `ValidatorFn[]`. A integração de validadores assíncronos (`AsyncValidatorFn[]`) exigiria um mecanismo para passar essas funções e gerenciá-las nos `FormControl`s.
*   **Tipagem mais Estrita para `iFormConfig.options`**: Para o `controlType: 'select'`, a propriedade `options` é um array de `iFieldOption`. Poderíamos explorar maneiras de tornar isso mais rigoroso ou específico para outros tipos de campos que possam ter opções (ex: checkboxes, radio buttons).
*   **Extensibilidade de Validadores Customizados**: Embora `ValidatorFn[]` funcione, para validadores muito complexos ou reutilizáveis em toda a aplicação, um serviço de fábrica de validadores poderia ser benéfico.
*   **Gerenciamento de Estado para Campos Complexos**: Para campos que exigem interação mais complexa (ex: upload de arquivos, componentes de data com múltiplos inputs), a comunicação entre o `DynamicFormComponent` e os componentes de campo filhos pode precisar ser mais sofisticada (ex: usando `@Output`s nos componentes de campo para emitir eventos de mudança ou interações).
*   **Suporte Nativo a FormGroups Aninhados**: Atualmente, objetos aninhados são suportados via notação de ponto. Uma implementação futura poderia suportar `controlType: 'group'` para criar `FormGroups` aninhados nativamente, facilitando a validação e o acesso aos dados.
*   **Desacoplamento de PrimeNG**: Embora a integração com PrimeNG seja um requisito, para máxima flexibilidade, uma abstração maior sobre os componentes de UI poderia permitir a troca de bibliotecas de componentes sem alterar os componentes de campo (ex: usando uma interface para os campos de UI). No entanto, isso adicionaria uma camada de complexidade significativa.

## Changelog

Veja o [CHANGELOG.md](../CHANGELOG.md) para informações sobre versões e mudanças.

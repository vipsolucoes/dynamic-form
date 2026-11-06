# @vipsolucoes/dynamic-form

Biblioteca Angular para criação de formulários dinâmicos baseados em configuração, construída com PrimeNG e Reactive Forms.

## 📦 Instalação

```bash
npm install @vipsolucoes/dynamic-form
```

### Dependências

Esta biblioteca requer as seguintes dependências peer:

- `@angular/core`: ^19.0.0 || ^20.0.0 || ^21.0.0
- `@angular/common`: ^19.0.0 || ^20.0.0 || ^21.0.0
- `@angular/forms`: ^19.0.0 || ^20.0.0 || ^21.0.0
- `primeng`: ^19.0.0 || ^20.0.0 || ^21.0.0

## 🚀 Uso Básico

### 1. Importe o módulo no seu componente

```typescript
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormComponent, iFormConfig } from '@vipsolucoes/dynamic-form';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <vp-dynamic-form [config]="formConfig" (formReady)="onFormReady($event)"> </vp-dynamic-form>
  `,
})
export class ExampleComponent {
  formConfig: iFormConfig[] = [
    {
      key: 'nome',
      controlType: 'text',
      label: 'Nome',
      placeholder: 'Digite seu nome',
      validators: [Validators.required, Validators.minLength(3)],
    },
    {
      key: 'email',
      controlType: 'email',
      label: 'E-mail',
      placeholder: 'Digite seu e-mail',
      validators: [Validators.required, Validators.email],
    },
    {
      key: 'idade',
      controlType: 'number',
      label: 'Idade',
      validators: [Validators.required, Validators.min(18)],
    },
  ];

  onFormReady(form: FormGroup): void {
    console.log('Formulário pronto:', form);
    // Acesse o formulário e seus valores
    form.valueChanges.subscribe((values) => {
      console.log('Valores do formulário:', values);
    });
  }
}
```

### 2. Controle de Submissão

O componente **não possui botão de submit interno**. O controle de submissão deve ser feito pelo componente pai usando `@ViewChild`:

```typescript
import { Component, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '@vipsolucoes/dynamic-form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <vp-dynamic-form #myForm [config]="formConfig" />
    <button (click)="onSubmit()">Enviar</button>
  `,
})
export class ExampleComponent {
  @ViewChild('myForm') myForm!: DynamicFormComponent;

  formConfig: iFormConfig[] = [
    // ... sua configuração
  ];

  onSubmit(): void {
    if (this.myForm.form.valid) {
      console.log('Dados:', this.myForm.form.value);
      // Enviar dados ao backend
    } else {
      this.myForm.form.markAllAsTouched();
    }
  }
}
```

## 📝 Tipos de Campos Suportados

A biblioteca suporta os seguintes tipos de campos:

- `text` - Campo de texto
- `email` - Campo de e-mail
- `password` - Campo de senha
- `number` - Campo numérico
- `select` - Dropdown/Select
- `datepicker` - Seletor de data
- `textarea` - Área de texto
- `toggleswitch` - Switch/Toggle
- `input-button` - Campo de texto com botão de ação
- `select-button` - Dropdown/Select com botão de ação
- `radiobutton` - Grupo de botões de rádio
- `divider` - Divisor visual (não cria FormControl)

## 🎯 Exemplos de Configuração

### Campo de Texto

```typescript
{
  key: 'nome',
  controlType: 'text',
  label: 'Nome Completo',
  placeholder: 'Digite seu nome',
  value: '', // Valor inicial
  hint: 'Este campo é obrigatório',
  validators: [Validators.required]
}
```

### Campo Select

#### Formato Padrão (Dados Fixos)

```typescript
{
  key: 'pais',
  controlType: 'select',
  label: 'País',
  placeholder: 'Selecione um país',
  options: [
    { label: 'Brasil', value: 'BR' },
    { label: 'Estados Unidos', value: 'US' },
    { label: 'Portugal', value: 'PT' }
  ],
  validators: [Validators.required]
}
```

#### Com Dados de API (Sem Mapeamento Manual)

```typescript
// Service retorna dados brutos: [{ id: 1, nome: 'São Paulo', uf: 'SP' }, ...]

{
  key: 'cidade',
  controlType: 'select',
  label: 'Cidade',
  options: [],
  optionLabel: 'nome',      // Campo do objeto para label
  optionValue: 'id',        // Campo do objeto para value
  optionFilter: true,       // Habilita filtro de busca
  optionShowClear: true,    // Mostra botão limpar
  validators: [Validators.required]
}

// No componente, passe os dados diretamente:
this.service.loadCidades().subscribe(cidades => {
  this.atualizarCampo('cidade', { options: cidades });
});
```

#### Com optionMapper (Labels Compostos)

```typescript
{
  key: 'cidade',
  controlType: 'select',
  label: 'Cidade',
  options: [],
  optionMapper: (cidade) => ({
    label: `${cidade.nome} - ${cidade.uf}`,  // Label composto
    value: cidade.id
  }),
  optionFilter: true,
  validators: [Validators.required]
}
```

**Propriedades Disponíveis:**

- `optionLabel?`: Nome do campo para label (default: `'label'`)
- `optionValue?`: Nome do campo para value (default: `'value'`)
- `optionMapper?`: Função para mapear itens (tem prioridade sobre optionLabel/optionValue)
- `optionFilter?`: Habilita filtro de busca
- `optionShowClear?`: Mostra botão para limpar seleção
- `optionAppendTo?`: `'body'` para anexar o painel ao `body` (use dentro de `p-dialog` ou containers com overflow)

### Campo Number

O campo `number` suporta números inteiros, decimais e monetários com muitas opções de formatação:

#### Números Inteiros (Padrão)

```typescript
{
  key: 'quantidade',
  controlType: 'number',
  label: 'Quantidade',
  validators: [Validators.required, Validators.min(1)]
}
```

#### Campo Monetário (Currency)

```typescript
{
  key: 'preco',
  controlType: 'number',
  label: 'Preço',
  numberConfig: {
    mode: 'currency',
    currency: 'BRL',
    locale: 'pt-BR',
    minFractionDigits: 2,
    maxFractionDigits: 2
  },
  validators: [Validators.required, Validators.min(0)]
}
```

#### Campo com Prefixo/Sufixo

```typescript
{
  key: 'desconto',
  controlType: 'number',
  label: 'Desconto',
  numberConfig: {
    prefix: '%',
    min: 0,
    max: 100,
    showButtons: true
  },
  validators: [Validators.required, Validators.min(0), Validators.max(100)]
}
```

#### Campo Decimal com Unidade

```typescript
{
  key: 'peso',
  controlType: 'number',
  label: 'Peso',
  numberConfig: {
    mode: 'decimal',
    suffix: ' kg',
    minFractionDigits: 2,
    maxFractionDigits: 3,
    showClear: true
  },
  validators: [Validators.required, Validators.min(0)]
}
```

**Propriedades Disponíveis em `numberConfig`:**

- `mode`: `'decimal'` | `'currency'`
- `currency`: Código da moeda (ISO 4217) - obrigatório para currency
- `prefix`: Texto antes do valor (ex: `'R$'`, `'%'`)
- `suffix`: Texto após o valor (ex: `' kg'`, `' m²'`)
- `min` / `max`: Valores mínimo e máximo
- `minFractionDigits` / `maxFractionDigits`: Casas decimais
- `showButtons`: Exibir botões de incremento/decremento
- `showClear`: Exibir botão para limpar valor
- `locale`: Localização para formatação (ex: `'pt-BR'`, `'en-US'`)
- E muitas outras opções...

### Campo DatePicker

```typescript
{
  key: 'dataNascimento',
  controlType: 'datepicker',
  label: 'Data de Nascimento',
  dateFormat: 'dd/mm/yy',
  dateViewType: 'date', // 'date' | 'month' | 'year'
  validators: [Validators.required]
}
```

### Campo Textarea

```typescript
{
  key: 'observacoes',
  controlType: 'textarea',
  label: 'Observações',
  placeholder: 'Digite suas observações',
  textareaAutoResize: true,
  textareaRows: 5,
  validators: [Validators.maxLength(500)]
}
```

### Campo ToggleSwitch

```typescript
{
  key: 'aceitaTermos',
  controlType: 'toggleswitch',
  label: 'Aceito os termos e condições',
  value: false,
  toggleTrueValue: true,
  toggleFalseValue: false
}
```

### Campo Input-Button (Input com Botão de Ação)

O campo `input-button` combina um input text com um botão de ação usando o componente InputGroup do PrimeNG:

```typescript
{
  key: 'cep',
  controlType: 'input-button',
  label: 'CEP',
  placeholder: '00000-000',
  validators: [Validators.required],
  buttonConfig: {
    icon: 'pi pi-search',
    tooltip: 'Buscar endereço',
    position: 'right',
    severity: 'primary'
  },
  buttonCallback: async (fieldKey, value) => {
    console.log(`Buscando ${fieldKey}:`, value);
    // Implementar lógica de busca
  }
}
```

Propriedades do `buttonConfig`:

- `icon`: Ícone do PrimeIcons (ex: 'pi pi-search')
- `label`: Texto do botão (opcional, pode usar apenas ícone)
- `tooltip`: Texto do tooltip ao passar o mouse
- `position`: Posição do botão ('left' | 'right'), padrão 'right'
- `severity`: Estilo do botão, padrão 'primary'
- `buttonEnabled`: Controla o estado do botão independentemente do campo. Quando `true`, o botão permanece habilitado mesmo se o campo estiver desabilitado. Quando `false`, o botão fica desabilitado mesmo se o campo estiver habilitado. Quando não especificado, o botão segue o estado do campo (padrão).

A função `buttonCallback` é executada quando o botão é clicado e recebe a key do campo e o valor atual como parâmetros.

#### Exemplo: Input Desabilitado com Botão Habilitado

```typescript
{
  key: 'cep',
  controlType: 'input-button',
  label: 'CEP',
  placeholder: '00000-000',
  disabled: true, // Input desabilitado (somente leitura)
  value: '01310-100',
  buttonConfig: {
    icon: 'pi pi-search',
    tooltip: 'Buscar endereço pelo CEP',
    position: 'right',
    severity: 'info',
    buttonEnabled: true, // Botão habilitado mesmo com campo desabilitado
  },
  buttonCallback: async (fieldKey: string, value: any) => {
    // Buscar endereço pelo CEP
    if (value) {
      await this.buscarEnderecoPorCep(value);
    }
  },
}
```

### Select com Botão (`select-button`)

O campo `select-button` combina um select com um botão de ação (mesmo padrão do `input-button`). Aceita as propriedades do `select` (`options`, `optionLabel`, `optionValue`, `optionMapper`, `optionFilter`, `optionShowClear`, `placeholder`) e o `buttonConfig`. O `buttonCallback` recebe a key do campo e o valor selecionado atual (pode ser `null`).

```typescript
{
  key: 'favorecidoId',
  controlType: 'select-button',
  label: 'Favorecido',
  options: [],
  optionFilter: true,
  optionShowClear: true,
  buttonConfig: { icon: 'pi pi-plus', tooltip: 'Novo favorecido', severity: 'secondary' },
  buttonCallback: (key, valor) => this.abrirNovoFavorecido(),
  styleClass: 'grid-col-6',
}
```

Fluxo típico: abrir diálogo de cadastro, atualizar as `options` do campo e selecionar o novo valor:

```typescript
abrirNovoFavorecido() {
  this.dialog.open(NovoFavorecidoComponent).onClose.subscribe((novo) => {
    if (!novo) return;
    // novo array/objeto para o campo refletir as opções atualizadas
    this.atualizarCampo('favorecidoId', { options: [...this.favorecidos, novo] });
    this.form.get('favorecidoId')?.setValue(novo.id);
  });
}
```

Quando o select estiver dentro de um `p-dialog` (ou container com overflow), use `optionAppendTo: 'body'` para que o painel de opções não seja cortado. A propriedade também vale para o `select`.

### Campos Condicionais

Você pode fazer campos serem habilitados/desabilitados baseado no valor de um toggle switch:

```typescript
{
  key: 'notificacoes',
  controlType: 'toggleswitch',
  label: 'Receber notificações'
},
{
  key: 'emailNotificacao',
  controlType: 'email',
  label: 'E-mail para notificações',
  placeholder: 'Digite seu e-mail',
  enabledWhen: 'notificacoes', // Campo será habilitado quando 'notificacoes' for true
  validators: [Validators.required, Validators.email]
}
```

### Layout Customizado com styleClass

Use a propriedade `styleClass` para criar layouts customizados em grid:

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
    label: 'E-mail',
    validators: [Validators.required, Validators.email],
    styleClass: 'grid-col-12', // Ocupa 12 colunas (100%)
  },
];
```

Você precisará definir as classes CSS no seu componente ou globalmente:

```css
.form-grid-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.grid-col-12 {
  grid-column: span 12;
}
.grid-col-6 {
  grid-column: span 6;
}
.grid-col-4 {
  grid-column: span 4;
}
.grid-col-3 {
  grid-column: span 3;
}
```

## 🔧 API

### DynamicFormComponent

#### Inputs

- `config: iFormConfig[]` (obrigatório) - Array com a configuração dos campos do formulário

#### Outputs

- `formReady: FormGroup` - Emite o FormGroup quando o formulário está pronto

#### Métodos Públicos

- `getControl(key: string): AbstractControl` - Obtém um controle do formulário pela chave

### Interface iFormConfig

```typescript
interface iFormConfig {
  key: string; // Identificador único do campo
  controlType:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'select'
    | 'datepicker'
    | 'textarea'
    | 'toggleswitch'
    | 'input-button';
  label: string; // Texto do label
  value?: any; // Valor inicial
  placeholder?: string; // Texto de placeholder
  hint?: string; // Texto de ajuda
  disabled?: boolean; // Campo desabilitado
  enabledWhen?: string; // Chave do toggle que controla este campo
  styleClass?: string; // Classes CSS customizadas
  options?: iFieldOption[] | unknown[]; // Opções para select (obrigatório se controlType for 'select')
  optionLabel?: string; // Campo do objeto para label no select (default: 'label')
  optionValue?: string; // Campo do objeto para value no select (default: 'value')
  optionMapper?: (item: any) => iFieldOption; // Função para mapear itens (tem prioridade sobre optionLabel/optionValue)
  optionFilter?: boolean; // Habilita filtro de busca no select
  optionShowClear?: boolean; // Mostra botão para limpar seleção no select
  validators?: ValidatorFn[]; // Validadores Angular
  dateFormat?: string; // Formato da data (default: 'dd/mm/yy')
  dateViewType?: 'date' | 'month' | 'year'; // Tipo de visualização da data (default: 'date')
  textareaAutoResize?: boolean; // Auto-resize do textarea (default: false)
  textareaRows?: number; // Número de linhas do textarea
  textareaCols?: number; // Número de colunas do textarea
  toggleTrueValue?: any; // Valor quando toggle está ativo (default: true)
  toggleFalseValue?: any; // Valor quando toggle está inativo (default: false)
  buttonConfig?: {
    // Configuração do botão para campos 'input-button'
    icon?: string; // Ícone do PrimeIcons
    label?: string; // Texto do botão
    tooltip?: string; // Tooltip do botão
    position?: 'left' | 'right'; // Posição do botão (default: 'right')
    severity?:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'info'
      | 'warning'
      | 'danger'
      | 'help'
      | 'contrast'; // Estilo do botão
    buttonEnabled?: boolean; // Controla o estado do botão independentemente do campo. Quando true, botão habilitado mesmo com campo desabilitado. Quando false, botão desabilitado mesmo com campo habilitado. Quando undefined, segue o estado do campo (padrão).
  };
  buttonCallback?: (fieldKey: string, fieldValue: any) => void | Promise<void>; // Callback executado ao clicar no botão
  numberConfig?: {
    // Configuração específica para campos 'number'
    mode?: 'decimal' | 'currency';
    currency?: string; // Código da moeda (ISO 4217)
    currencyDisplay?: 'symbol' | 'code' | 'name';
    minFractionDigits?: number;
    maxFractionDigits?: number;
    useGrouping?: boolean;
    prefix?: string;
    suffix?: string;
    min?: number;
    max?: number;
    step?: number;
    showButtons?: boolean;
    buttonLayout?: 'stacked' | 'horizontal' | 'vertical';
    showClear?: boolean;
    locale?: string;
    readonly?: boolean;
    size?: 'small' | 'large';
    variant?: 'outlined' | 'filled';
  };
}
```

## 🎨 Customização de Campos

Você pode registrar campos customizados usando o `FieldRegistryService`:

```typescript
import { FieldRegistryService } from '@vipsolucoes/dynamic-form';
import { CustomFieldComponent } from './custom-field.component';

export class AppComponent {
  constructor(private fieldRegistry: FieldRegistryService) {
    // Registra um campo customizado
    this.fieldRegistry.registerField('custom', CustomFieldComponent);
  }
}
```

Depois, use o tipo customizado na configuração:

```typescript
{
  key: 'campoCustom',
  controlType: 'custom',
  label: 'Campo Customizado'
}
```

## 🌐 Customização de Mensagens de Erro

Você pode personalizar as mensagens de erro através do provider:

```typescript
import { provideDynamicFormConfig } from '@vipsolucoes/dynamic-form';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideDynamicFormConfig({
      required: 'Este campo é obrigatório',
      email: 'E-mail inválido',
      minlength: (requiredLength: number) => `Mínimo de ${requiredLength} caracteres necessários`,
      maxlength: (requiredLength: number) => `Máximo de ${requiredLength} caracteres permitidos`,
      custom: (error: any) => error.message || 'Erro de validação',
    }),
  ],
};
```

**Nota:** As mensagens `minlength` e `maxlength` são funções que recebem o comprimento requerido como parâmetro. A função `custom` permite tratar erros de validação personalizados.

## 🌐 Internacionalização (PT-BR)

A biblioteca já disponibiliza uma tradução completa para português do Brasil das mensagens padrão do PrimeNG, garantindo consistência de idioma em todos os componentes (DatePicker, Table, Dialog, FileUpload, etc.).

Para habilitar a tradução globalmente na aplicação, basta utilizar o provider do PrimeNG conforme o exemplo abaixo:

```typescript
import { PRIMENG_PTBR } from '@vipsolucoes/dynamic-form';

providePrimeNG({
  translation: PRIMENG_PTBR,
});
```

**Nota:** a tradução é aplicada de forma global e deve ser configurada durante o bootstrap da aplicação.

## 🛠️ Desenvolvimento

### Build da biblioteca

```bash
ng build dynamic-form
```

### Publicação no npm

Após o build:

```bash
cd dist/dynamic-form
npm publish
```

## 📄 Licença

MIT

## 🔗 Links

- [Repositório](https://github.com/vipsolucoes/dynamic-form)
- [Issues](https://github.com/vipsolucoes/dynamic-form/issues)

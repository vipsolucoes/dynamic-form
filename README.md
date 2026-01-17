# @vipsolucoes/dynamic-form

[![npm version](https://img.shields.io/npm/v/@vipsolucoes/dynamic-form.svg)](https://www.npmjs.com/package/@vipsolucoes/dynamic-form)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Biblioteca Angular para criação de formulários dinâmicos e reativos usando PrimeNG. Construa formulários complexos de forma declarativa através de configuração baseada em objetos.

## Características

- ✅ **Formulários Reativos**: Baseado em Angular Reactive Forms
- ✅ **Múltiplos Tipos de Campo**: Text, Email, Password, Number (com suporte a decimais, monetários, prefixo/sufixo), Select, Datepicker, Textarea, ToggleSwitch
- ✅ **Validação Integrada**: Suporte completo a validadores do Angular Forms
- ✅ **Dependências entre Campos**: Campos condicionais baseados em toggle switches
- ✅ **Layout Customizado**: Suporte a classes CSS customizadas para layouts flexíveis
- ✅ **Performance Otimizada**: ChangeDetectionStrategy.OnPush em todos os componentes
- ✅ **Extensível**: Sistema de registro para campos customizados
- ✅ **Mensagens de Erro Customizáveis**: Internacionalização via InjectionToken
- ✅ **Standalone Components**: Compatível com Angular moderno (19+)

## Instalação

```bash
npm install @vipsolucoes/dynamic-form primeng
```

**Requisitos:**

- Angular 19+ ou 20+ ou 21+
- PrimeNG 19+ ou 20+ ou 21+

## Quick Start

```typescript
import { Component } from '@angular/core';
import { DynamicFormComponent, iFormConfig } from '@vipsolucoes/dynamic-form';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DynamicFormComponent],
  template: ` <vp-dynamic-form [config]="formConfig" /> `,
})
export class ExampleComponent {
  formConfig: iFormConfig[] = [
    {
      key: 'username',
      controlType: 'text',
      label: 'Nome de Usuário',
      placeholder: 'Digite seu nome',
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
      key: 'active',
      controlType: 'toggleswitch',
      label: 'Ativo',
      validators: [Validators.required],
    },
  ];
}
```

## Documentação Completa

Para documentação detalhada, exemplos avançados e referência completa da API, consulte:

📖 **[Documentação Completa](./docs/dynamic-form.md)**

## Recursos Principais

### Tipos de Campo Suportados

- **Text/Email**: Campos de texto simples
- **Password**: Campo de senha com toggle de visibilidade
- **Number**: Campo numérico com suporte a inteiros, decimais, monetários, prefixo/sufixo, botões de incremento e muito mais
- **Select**: Dropdown com opções customizadas
- **Datepicker**: Seletor de data com suporte a diferentes visualizações (date, month, year)
- **Textarea**: Área de texto com redimensionamento automático opcional
- **ToggleSwitch**: Switch liga/desliga com valores customizados

### Campos Condicionais

Crie campos que são habilitados/desabilitados automaticamente baseado no estado de um toggle switch:

```typescript
{
  key: 'notificacoes',
  controlType: 'toggleswitch',
  label: 'Ativar Notificações',
},
{
  key: 'emailNotificacao',
  controlType: 'email',
  label: 'Email para Notificações',
  enabledWhen: 'notificacoes', // Habilitado quando toggle está ativo
  validators: [Validators.email],
}
```

### Mensagens de Erro Customizadas

Configure mensagens de erro personalizadas:

```typescript
import { provideDynamicFormConfig } from '@vipsolucoes/dynamic-form';

bootstrapApplication(AppComponent, {
  providers: [
    provideDynamicFormConfig({
      required: 'Este campo é obrigatório.',
      email: 'Por favor, insira um e-mail válido.',
      minlength: (length) => `Mínimo de ${length} caracteres.`,
    }),
  ],
});
```

### Campos Customizados

Registre seus próprios tipos de campo:

```typescript
import { FieldRegistryService } from '@vipsolucoes/dynamic-form';

constructor(private fieldRegistry: FieldRegistryService) {
  this.fieldRegistry.registerField('custom', MyCustomFieldComponent);
}
```

## 🌐 Tradução das mensagens para PT-BR

A biblioteca disponibiliza uma tradução completa para português do Brasil das mensagens padrão do PrimeNG, garantindo consistência de idioma em todos os componentes (DatePicker, Table, Dialog, FileUpload, etc.).

Para habilitar a tradução globalmente na aplicação, basta utilizar o provider do PrimeNG conforme o exemplo abaixo:

```typescript
import { PRIMENG_PTBR } from '@vipsolucoes/dynamic-form';

providePrimeNG({
  translation: PRIMENG_PTBR,
});
```

## Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição antes de enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Changelog

Veja o [CHANGELOG.md](./CHANGELOG.md) para informações sobre versões e mudanças.

## Suporte

Para questões, bugs ou sugestões, por favor abra uma issue no [GitHub](https://github.com/vipsolucoes/dynamic-form/issues).

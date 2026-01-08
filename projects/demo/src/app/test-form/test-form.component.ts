import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormComponent, iFormConfig } from '@vipsolucoes/dynamic-form';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-test-form',
  imports: [CommonModule, JsonPipe, ButtonModule, CardModule, DynamicFormComponent],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestFormComponent {
  /**
   * Navega até um exemplo específico fazendo scroll suave até o elemento.
   * @param exemploId ID do exemplo (ex: 'exemplo-1', 'exemplo-2', etc.)
   */
  scrollToExample(exemploId: string): void {
    const element = document.getElementById(exemploId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ============================================
  // EXEMPLO 1: Formulário Básico
  // Demonstra todos os tipos de campos disponíveis
  // ============================================
  basicFormConfig = signal<iFormConfig[]>([
    {
      key: 'name',
      label: 'Nome Completo',
      controlType: 'text',
      validators: [Validators.required, Validators.minLength(10)],
      placeholder: 'Digite seu nome completo',
      hint: 'Seu nome como aparece no documento.',
    },
    {
      key: 'nickname',
      label: 'Apelido',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Como prefere ser chamado',
      hint: 'Um apelido para usarmos no sistema.',
    },
    {
      key: 'email',
      label: 'Email',
      controlType: 'email',
      validators: [Validators.required, Validators.email],
      placeholder: 'seu@email.com',
    },
    {
      key: 'password',
      label: 'Senha',
      controlType: 'password',
      validators: [Validators.required, Validators.minLength(8)],
      placeholder: 'Mínimo 8 caracteres',
    },
    {
      key: 'age',
      label: 'Idade',
      controlType: 'number',
      validators: [Validators.required, Validators.min(18), Validators.max(120)],
      placeholder: 'Digite sua idade',
    },
    {
      key: 'plan',
      label: 'Plano',
      controlType: 'select',
      options: [
        { label: 'Básico', value: 'basic' },
        { label: 'Profissional', value: 'pro' },
        { label: 'Empresarial', value: 'enterprise' },
      ],
      validators: [Validators.required],
      placeholder: 'Selecione um plano',
    },
    {
      key: 'birthDate',
      label: 'Data de Nascimento',
      controlType: 'datepicker',
      validators: [Validators.required],
      placeholder: 'Selecione a data',
      dateViewType: 'date',
    },
    {
      key: 'comments',
      label: 'Comentários',
      controlType: 'textarea',
      validators: [Validators.maxLength(500)],
      placeholder: 'Adicione seus comentários...',
      textareaRows: 4,
      hint: 'Máximo de 500 caracteres',
    },
  ]);

  // ============================================
  // EXEMPLO 2: Formulário com Validações Avançadas
  // Demonstra diferentes tipos de validação
  // ============================================
  advancedValidationConfig = signal<iFormConfig[]>([
    {
      key: 'phone',
      label: 'Telefone',
      controlType: 'text',
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(15)],
      placeholder: '(00) 00000-0000',
      hint: 'Inclua DDD e número completo',
    },
    {
      key: 'age',
      label: 'Idade',
      controlType: 'number',
      validators: [Validators.required, Validators.min(18), Validators.max(100)],
      placeholder: 'Entre 18 e 100 anos',
      hint: 'Idade mínima: 18 anos',
    },
    {
      key: 'description',
      label: 'Descrição',
      controlType: 'textarea',
      validators: [Validators.maxLength(200)],
      placeholder: 'Descreva-se em até 200 caracteres',
      textareaRows: 3,
      textareaAutoResize: true,
      hint: 'Máximo de 200 caracteres',
    },
    {
      key: 'status',
      label: 'Status',
      controlType: 'select',
      options: [
        { label: 'Ativo', value: 'active' },
        { label: 'Inativo', value: 'inactive' },
        { label: 'Pendente', value: 'pending' },
      ],
      validators: [Validators.required],
      placeholder: 'Selecione o status',
    },
  ]);

  // ============================================
  // EXEMPLO 3: Formulário com Layout Customizado
  // Demonstra uso de styleClass para layouts diferentes
  // ============================================
  customLayoutConfig = signal<iFormConfig[]>([
    {
      key: 'firstName',
      label: 'Primeiro Nome',
      controlType: 'text',
      validators: [Validators.required],
      styleClass: 'grid-col-6',
    },
    {
      key: 'lastName',
      label: 'Sobrenome',
      controlType: 'text',
      validators: [Validators.required],
      styleClass: 'grid-col-6',
    },
    {
      key: 'email',
      label: 'Email',
      controlType: 'email',
      validators: [Validators.required, Validators.email],
      styleClass: 'grid-col-8',
    },
    {
      key: 'phone',
      label: 'Telefone',
      controlType: 'text',
      validators: [Validators.required],
      styleClass: 'grid-col-4',
    },
    {
      key: 'address',
      label: 'Endereço Completo',
      controlType: 'textarea',
      validators: [Validators.required],
      placeholder: 'Digite o endereço completo',
      textareaRows: 2,
      styleClass: 'grid-col-12',
    },
    {
      key: 'city',
      label: 'Cidade',
      controlType: 'text',
      validators: [Validators.required],
      styleClass: 'grid-col-6',
    },
    {
      key: 'state',
      label: 'Estado',
      controlType: 'select',
      options: [
        { label: 'São Paulo', value: 'SP' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Paraná', value: 'PR' },
      ],
      validators: [Validators.required],
      styleClass: 'grid-col-3',
    },
    {
      key: 'zipCode',
      label: 'CEP',
      controlType: 'text',
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      styleClass: 'grid-col-3',
    },
  ]);

  // ============================================
  // EXEMPLO 4: Formulário Pré-preenchido
  // Demonstra campos com valores iniciais (edição)
  // ============================================
  preFilledFormConfig = signal<iFormConfig[]>([
    {
      key: 'name',
      label: 'Nome Completo',
      controlType: 'text',
      value: 'João Silva',
      validators: [Validators.required],
    },
    {
      key: 'email',
      label: 'Email',
      controlType: 'email',
      value: 'joao.silva@example.com',
      validators: [Validators.required, Validators.email],
    },
    {
      key: 'age',
      label: 'Idade',
      controlType: 'number',
      value: 30,
      validators: [Validators.required, Validators.min(18)],
    },
    {
      key: 'plan',
      label: 'Plano Atual',
      controlType: 'select',
      value: 'pro',
      options: [
        { label: 'Básico', value: 'basic' },
        { label: 'Profissional', value: 'pro' },
        { label: 'Empresarial', value: 'enterprise' },
      ],
      validators: [Validators.required],
    },
    {
      key: 'registrationDate',
      label: 'Data de Cadastro',
      controlType: 'datepicker',
      value: new Date('2024-01-15'),
      validators: [Validators.required],
      placeholder: 'Data de cadastro',
      dateViewType: 'date',
    },
  ]);

  // ============================================
  // EXEMPLO 5: Formulário Completo
  // Combinação de todas as funcionalidades
  // ============================================
  completeFormConfig = signal<iFormConfig[]>([
    {
      key: 'fullName',
      label: 'Nome Completo',
      controlType: 'text',
      validators: [Validators.required, Validators.minLength(5)],
      placeholder: 'Digite seu nome completo',
      hint: 'Nome como aparece em documentos oficiais',
    },
    {
      key: 'email',
      label: 'Email',
      controlType: 'email',
      validators: [Validators.required, Validators.email],
      placeholder: 'seu@email.com',
      hint: 'Usado para login e recuperação de senha',
    },
    {
      key: 'password',
      label: 'Senha',
      controlType: 'password',
      validators: [Validators.required, Validators.minLength(8)],
      placeholder: 'Mínimo 8 caracteres',
      hint: 'Use letras, números e caracteres especiais',
    },
    {
      key: 'confirmPassword',
      label: 'Confirmar Senha',
      controlType: 'password',
      validators: [Validators.required],
      placeholder: 'Digite a senha novamente',
    },
    {
      key: 'phone',
      label: 'Telefone',
      controlType: 'text',
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(15)],
      placeholder: '(00) 00000-0000',
      hint: 'Inclua DDD',
    },
    {
      key: 'age',
      label: 'Idade',
      controlType: 'number',
      validators: [Validators.required, Validators.min(18), Validators.max(120)],
      placeholder: 'Digite sua idade',
    },
    {
      key: 'plan',
      label: 'Plano',
      controlType: 'select',
      options: [
        { label: 'Básico - R$ 29,90/mês', value: 'basic' },
        { label: 'Profissional - R$ 79,90/mês', value: 'pro' },
        { label: 'Empresarial - R$ 199,90/mês', value: 'enterprise' },
      ],
      validators: [Validators.required],
      placeholder: 'Selecione seu plano',
      hint: 'Você pode alterar o plano a qualquer momento',
    },
    {
      key: 'bio',
      label: 'Biografia',
      controlType: 'textarea',
      validators: [Validators.maxLength(500)],
      placeholder: 'Conte-nos um pouco sobre você',
      textareaRows: 5,
      textareaAutoResize: true,
      hint: 'Máximo de 500 caracteres (opcional)',
    },
    {
      key: 'birthDate',
      label: 'Data de Nascimento',
      controlType: 'datepicker',
      validators: [Validators.required],
      placeholder: 'Selecione a data de nascimento',
      dateViewType: 'date',
      hint: 'Data completa de nascimento',
    },
    {
      key: 'expiryDate',
      label: 'Data de Vencimento',
      controlType: 'datepicker',
      validators: [Validators.required],
      placeholder: 'MM/AA',
      dateViewType: 'month',
      hint: 'Mês e ano de vencimento',
    },
  ]);

  // ============================================
  // EXEMPLO 6: Formulário com Submit
  // Demonstra como o componente pai controla a submissão
  // ============================================
  @ViewChild('formWithSubmit') formWithSubmit!: DynamicFormComponent;
  submitResult = signal<any>(null);

  submitFormConfig = signal<iFormConfig[]>([
    {
      key: 'name',
      label: 'Nome',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Digite seu nome',
    },
    {
      key: 'email',
      label: 'Email',
      controlType: 'email',
      validators: [Validators.required, Validators.email],
      placeholder: 'seu@email.com',
    },
    {
      key: 'message',
      label: 'Mensagem',
      controlType: 'textarea',
      validators: [Validators.required, Validators.minLength(10)],
      placeholder: 'Digite sua mensagem',
      textareaRows: 4,
      textareaAutoResize: true,
      hint: 'Mínimo de 10 caracteres',
    },
  ]);

  onSubmitForm(): void {
    if (this.formWithSubmit.form.valid) {
      const formData = this.formWithSubmit.form.value;
      this.submitResult.set(formData);
      console.log('Formulário submetido com sucesso:', formData);
    } else {
      this.formWithSubmit.form.markAllAsTouched();
      this.submitResult.set(null);
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  // ============================================
  // EXEMPLO 7: Objeto Aninhado (Pessoa com Endereco)
  // Demonstra como trabalhar com objetos complexos usando notação de ponto
  // ============================================
  @ViewChild('nestedForm') nestedForm!: DynamicFormComponent;
  nestedResult = signal<any>(null);

  nestedObjectConfig = signal<iFormConfig[]>([
    // Campos principais da Pessoa
    {
      key: 'nome',
      label: 'Nome Completo',
      controlType: 'text',
      validators: [Validators.required, Validators.minLength(5)],
      placeholder: 'Digite seu nome completo',
      styleClass: 'grid-col-12',
    },
    {
      key: 'email',
      label: 'Email',
      controlType: 'email',
      validators: [Validators.required, Validators.email],
      placeholder: 'seu@email.com',
      styleClass: 'grid-col-4',
    },
    {
      key: 'telefone',
      label: 'Telefone',
      controlType: 'text',
      validators: [Validators.required, Validators.minLength(10)],
      placeholder: '(00) 00000-0000',
      styleClass: 'grid-col-4',
    },
    {
      key: 'dataNascimento',
      label: 'Data de Nascimento',
      controlType: 'datepicker',
      validators: [Validators.required],
      placeholder: 'Selecione a data de nascimento',
      dateViewType: 'date',
      styleClass: 'grid-col-4',
    },
    // Campos do Endereco usando notação de ponto
    {
      key: 'endereco.rua',
      label: 'Rua',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Nome da rua',
      styleClass: 'grid-col-8',
    },
    {
      key: 'endereco.numero',
      label: 'Número',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Número',
      styleClass: 'grid-col-4',
    },
    {
      key: 'endereco.complemento',
      label: 'Complemento',
      controlType: 'textarea',
      placeholder: 'Apto, Bloco, etc. (opcional)',
      textareaRows: 2,
      styleClass: 'grid-col-12',
    },
    {
      key: 'endereco.cidade',
      label: 'Cidade',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Nome da cidade',
      styleClass: 'grid-col-6',
    },
    {
      key: 'endereco.estado',
      label: 'Estado',
      controlType: 'select',
      options: [
        { label: 'São Paulo', value: 'SP' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'Rio Grande do Sul', value: 'RS' },
      ],
      validators: [Validators.required],
      placeholder: 'Selecione o estado',
      styleClass: 'grid-col-3',
    },
    {
      key: 'endereco.cep',
      label: 'CEP',
      controlType: 'text',
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      placeholder: '00000-000',
      styleClass: 'grid-col-3',
    },
  ]);

  onSubmitNestedForm(): void {
    if (this.nestedForm.form.valid) {
      const flatData = this.nestedForm.form.value;
      const nestedData = this.flatToNested(flatData);
      this.nestedResult.set(nestedData);
      console.log('Dados flat (do formulário):', flatData);
      console.log('Dados nested (transformado):', nestedData);
    } else {
      this.nestedForm.form.markAllAsTouched();
      this.nestedResult.set(null);
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  /**
   * Transforma um objeto flat (com keys usando notação de ponto) em um objeto aninhado.
   * Exemplo: { 'endereco.rua': 'Av. Brasil' } => { endereco: { rua: 'Av. Brasil' } }
   */
  private flatToNested(flatObj: Record<string, any>): any {
    const result: any = {};

    for (const [key, value] of Object.entries(flatObj)) {
      if (key.includes('.')) {
        // Key com notação de ponto - criar estrutura aninhada
        const keys = key.split('.');
        let current = result;

        // Criar objetos intermediários se não existirem
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }

        // Atribuir valor ao último nível
        current[keys[keys.length - 1]] = value;
      } else {
        // Key simples - atribuir diretamente
        result[key] = value;
      }
    }

    return result;
  }

  // ============================================
  // EXEMPLO 8: Formulário com Campos de Data
  // Demonstra os três tipos de visualização de data
  // ============================================
  dateFormConfig = signal<iFormConfig[]>([
    {
      key: 'birthDate',
      label: 'Data de Nascimento',
      controlType: 'datepicker',
      validators: [Validators.required],
      placeholder: 'Selecione a data',
      dateViewType: 'date',
      hint: 'Formato: dd/mm/yy',
    },
    {
      key: 'cardExpiry',
      label: 'Vencimento do Cartão',
      controlType: 'datepicker',
      validators: [Validators.required],
      placeholder: 'MM/AA',
      dateViewType: 'month',
      hint: 'Mês e ano de vencimento',
    },
    {
      key: 'graduationYear',
      label: 'Ano de Formatura',
      controlType: 'datepicker',
      validators: [Validators.required],
      placeholder: 'Selecione o ano',
      dateViewType: 'year',
      hint: 'Ano em que se formou',
    },
  ]);

  // ============================================
  // EXEMPLO 9: Formulário com Campos de Textarea
  // Demonstra diferentes configurações de textarea
  // ============================================
  textareaFormConfig = signal<iFormConfig[]>([
    {
      key: 'name',
      label: 'Nome',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Digite seu nome',
    },
    {
      key: 'description',
      label: 'Descrição Básica',
      controlType: 'textarea',
      validators: [Validators.required],
      placeholder: 'Digite uma descrição básica',
      textareaRows: 3,
      hint: 'Textarea com 3 linhas fixas',
    },
    {
      key: 'notes',
      label: 'Notas',
      controlType: 'textarea',
      validators: [Validators.maxLength(1000)],
      placeholder: 'Adicione suas notas...',
      textareaRows: 5,
      textareaAutoResize: true,
      hint: 'Textarea com redimensionamento automático (5 linhas iniciais)',
    },
    {
      key: 'comments',
      label: 'Comentários',
      controlType: 'textarea',
      placeholder: 'Digite seus comentários',
      textareaRows: 4,
      textareaCols: 50,
      hint: 'Textarea com linhas e colunas definidas',
    },
    {
      key: 'bio',
      label: 'Biografia',
      controlType: 'textarea',
      validators: [Validators.required, Validators.minLength(50), Validators.maxLength(500)],
      placeholder: 'Conte-nos sobre você...',
      textareaRows: 6,
      textareaAutoResize: true,
      hint: 'Mínimo 50, máximo 500 caracteres com auto-resize',
    },
  ]);

  // ============================================
  // EXEMPLO 10: Formulário com Campos de Toggle Switch
  // Demonstra diferentes configurações de toggle switch
  // ============================================
  toggleSwitchFormConfig = signal<iFormConfig[]>([
    {
      key: 'name',
      label: 'Nome',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Digite seu nome',
    },
    {
      key: 'active',
      label: 'Ativo',
      controlType: 'toggleswitch',
      validators: [Validators.required],
      hint: 'Marque para ativar o registro',
    },
    {
      key: 'notifications',
      label: 'Receber Notificações',
      controlType: 'toggleswitch',
      value: true,
      hint: 'Receba notificações por email',
    },
    {
      key: 'premium',
      label: 'Conta Premium',
      controlType: 'toggleswitch',
      value: false,
      hint: 'Ative para ter acesso a recursos premium',
    },
    {
      key: 'status',
      label: 'Status',
      controlType: 'toggleswitch',
      toggleTrueValue: 'S',
      toggleFalseValue: 'N',
      value: 'N',
      validators: [Validators.required],
      hint: 'S = Sim, N = Não',
    },
    {
      key: 'enabled',
      label: 'Habilitado',
      controlType: 'toggleswitch',
      toggleTrueValue: 1,
      toggleFalseValue: 0,
      value: 0,
      validators: [Validators.required],
      hint: '1 = Habilitado, 0 = Desabilitado',
    },
  ]);

  // ============================================
  // EXEMPLO 11: Formulário com Toggle Switch em Layout Grid
  // Demonstra toggle switches em layout customizado
  // ============================================
  toggleSwitchLayoutConfig = signal<iFormConfig[]>([
    {
      key: 'active',
      label: 'Ativo',
      controlType: 'toggleswitch',
      styleClass: 'grid-col-6',
      validators: [Validators.required],
    },
    {
      key: 'featured',
      label: 'Destaque',
      controlType: 'toggleswitch',
      styleClass: 'grid-col-6',
      value: false,
    },
    {
      key: 'notifications',
      label: 'Notificações por Email',
      controlType: 'toggleswitch',
      styleClass: 'grid-col-4',
      value: true,
    },
    {
      key: 'notificationsSMS',
      label: 'Notificações por SMS',
      controlType: 'toggleswitch',
      styleClass: 'grid-col-4',
      value: false,
    },
    {
      key: 'notificationsPush',
      label: 'Notificações Push',
      controlType: 'toggleswitch',
      styleClass: 'grid-col-4',
      value: false,
    },
  ]);

  // ============================================
  // EXEMPLO 12: Formulário com Campos Desabilitados
  // Demonstra diferentes tipos de campos com propriedade disabled
  // ============================================
  disabledFormConfig = signal<iFormConfig[]>([
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
      key: 'password',
      label: 'Senha',
      controlType: 'password',
      disabled: true,
      validators: [Validators.required],
      placeholder: 'Digite sua senha',
      hint: 'Campo de senha desabilitado',
    },
    {
      key: 'age',
      label: 'Idade',
      controlType: 'number',
      value: 30,
      disabled: true,
      validators: [Validators.required, Validators.min(18)],
      placeholder: 'Digite sua idade',
      hint: 'Idade desabilitada',
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
      placeholder: 'Selecione um plano',
      hint: 'Plano desabilitado',
    },
    {
      key: 'birthDate',
      label: 'Data de Nascimento',
      controlType: 'datepicker',
      value: new Date('1990-01-15'),
      disabled: true,
      validators: [Validators.required],
      placeholder: 'Selecione a data',
      dateViewType: 'date',
      hint: 'Data desabilitada',
    },
    {
      key: 'comments',
      label: 'Comentários',
      controlType: 'textarea',
      value: 'Este é um comentário pré-preenchido e desabilitado.',
      disabled: true,
      validators: [Validators.maxLength(500)],
      placeholder: 'Adicione seus comentários...',
      textareaRows: 4,
      hint: 'Textarea desabilitado',
    },
    {
      key: 'active',
      label: 'Ativo',
      controlType: 'toggleswitch',
      value: true,
      disabled: true,
      hint: 'Toggle switch desabilitado',
    },
    {
      key: 'editableField',
      label: 'Campo Editável',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Este campo pode ser editado',
      hint: 'Este campo está habilitado para comparação',
    },
  ]);

  // ============================================
  // EXEMPLO 13: Formulário com Dependência entre ToggleSwitch e Campos
  // Demonstra campos que são habilitados/desabilitados baseado no estado de um toggleSwitch
  // ============================================
  dependencyFormConfig = signal<iFormConfig[]>([
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
      enabledWhen: 'notificacoes',
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
      key: 'receberPromocoes',
      label: 'Receber Promoções',
      controlType: 'toggleswitch',
      value: false,
      hint: 'Ative para receber ofertas e promoções',
    },
    {
      key: 'preferenciasPromocao',
      label: 'Preferências de Promoção',
      controlType: 'textarea',
      enabledWhen: 'receberPromocoes',
      validators: [Validators.maxLength(200)],
      placeholder: 'Descreva suas preferências...',
      textareaRows: 3,
      hint: 'Este campo só fica habilitado quando "Receber Promoções" estiver ativo',
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
  ]);
}

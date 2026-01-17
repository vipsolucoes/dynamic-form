import { CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicFormComponent, iFormConfig } from '@vipsolucoes/dynamic-form';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EstadoCidadeService } from '../services/estado-cidade.service';

@Component({
  selector: 'app-test-form',
  imports: [CommonModule, JsonPipe, ButtonModule, CardModule, DynamicFormComponent],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestFormComponent implements OnInit {
  private readonly estadoCidadeService = inject(EstadoCidadeService);
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

  // ============================================
  // EXEMPLO 14: Formulário com Input-Button (Busca de CEP)
  // Demonstra o uso do campo input-button com callback
  // ============================================
  @ViewChild('inputButtonForm') inputButtonForm!: DynamicFormComponent;
  inputButtonResult = signal<any>(null);
  isSearching = signal<boolean>(false);

  inputButtonFormConfig = signal<iFormConfig[]>([
    {
      key: 'nome',
      label: 'Nome Completo',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Digite seu nome',
    },
    {
      key: 'cep',
      controlType: 'input-button' as any,
      label: 'CEP',
      placeholder: '00000-000',
      validators: [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)],
      hint: 'Digite o CEP e clique no botão para buscar',
      buttonConfig: {
        icon: 'pi pi-search',
        tooltip: 'Buscar endereço pelo CEP',
        position: 'right',
        severity: 'primary',
      },
      buttonCallback: async (fieldKey: string, value: any) => {
        await this.buscarCep(value);
      },
    } as any,
    {
      key: 'rua',
      label: 'Rua',
      controlType: 'text',
      placeholder: 'Nome da rua',
    },
    {
      key: 'bairro',
      label: 'Bairro',
      controlType: 'text',
      placeholder: 'Nome do bairro',
    },
    {
      key: 'cidade',
      label: 'Cidade',
      controlType: 'text',
      placeholder: 'Nome da cidade',
    },
    {
      key: 'estado',
      label: 'Estado',
      controlType: 'select',
      options: [
        { label: 'São Paulo', value: 'SP' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Paraná', value: 'PR' },
      ],
      placeholder: 'Selecione o estado',
    },
    {
      key: 'busca',
      controlType: 'input-button' as any,
      label: 'Buscar Produto',
      placeholder: 'Digite o nome do produto',
      hint: 'Busque produtos por nome',
      buttonConfig: {
        icon: 'pi pi-shopping-cart',
        label: 'Buscar',
        tooltip: 'Buscar produtos',
        position: 'right',
        severity: 'success',
      },
      buttonCallback: async (fieldKey: string, value: any) => {
        await this.buscarProduto(value);
      },
    } as any,
  ]);

  async buscarCep(cep: string): Promise<void> {
    if (!cep) {
      alert('Por favor, digite um CEP');
      return;
    }

    this.isSearching.set(true);
    this.inputButtonResult.set(null);

    try {
      const cepLimpo = cep.replace(/\D/g, '');

      if (cepLimpo.length !== 8) {
        alert('CEP inválido. Digite 8 dígitos.');
        return;
      }

      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }

      // Preenche os campos do formulário
      this.inputButtonForm?.form.patchValue({
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      });

      this.inputButtonResult.set({
        tipo: 'CEP',
        dados: data,
      });

      console.log('Endereço encontrado:', data);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      alert('Erro ao buscar CEP. Tente novamente.');
    } finally {
      this.isSearching.set(false);
    }
  }

  async buscarProduto(termo: string): Promise<void> {
    if (!termo || termo.trim().length < 3) {
      alert('Digite pelo menos 3 caracteres para buscar');
      return;
    }

    this.isSearching.set(true);

    try {
      // Simula uma busca (em produção, chamaria uma API real)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const produtosSimulados = [
        { id: 1, nome: `${termo} Premium`, preco: 99.9 },
        { id: 2, nome: `${termo} Standard`, preco: 59.9 },
        { id: 3, nome: `${termo} Básico`, preco: 29.9 },
      ];

      this.inputButtonResult.set({
        tipo: 'Produtos',
        dados: produtosSimulados,
      });

      console.log('Produtos encontrados:', produtosSimulados);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      alert('Erro ao buscar produtos. Tente novamente.');
    } finally {
      this.isSearching.set(false);
    }
  }

  // ============================================
  // EXEMPLO 15: Formulário com Transformação de Texto
  // Demonstra uppercase e lowercase em diferentes tipos de campos
  // ============================================
  textTransformFormConfig = signal<iFormConfig[]>([
    {
      key: 'codigo',
      label: 'Código do Produto',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Digite o código',
      textTransform: 'uppercase',
      hint: 'O código será convertido automaticamente para MAIÚSCULAS',
    },
    {
      key: 'email',
      label: 'E-mail',
      controlType: 'email',
      validators: [Validators.required, Validators.email],
      placeholder: 'seu@email.com',
      textTransform: 'lowercase',
      hint: 'O e-mail será convertido automaticamente para minúsculas',
    },
    {
      key: 'nome',
      label: 'Nome Completo',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Digite seu nome',
      hint: 'Este campo não tem transformação',
    },
    {
      key: 'observacoes',
      label: 'Observações',
      controlType: 'textarea',
      validators: [Validators.maxLength(500)],
      placeholder: 'Digite as observações',
      textTransform: 'uppercase',
      textareaRows: 4,
      hint: 'As observações serão convertidas para MAIÚSCULAS',
    },
    {
      key: 'sku',
      label: 'SKU',
      controlType: 'input-button',
      validators: [Validators.required],
      placeholder: 'Digite o SKU',
      textTransform: 'uppercase',
      hint: 'O SKU será convertido para MAIÚSCULAS',
      buttonConfig: {
        icon: 'pi pi-search',
        tooltip: 'Buscar produto pelo SKU',
        position: 'right',
        severity: 'primary',
      },
      buttonCallback: async (fieldKey: string, value: any) => {
        console.log('Buscando produto com SKU:', value);
        alert(`Buscando produto com SKU: ${value}`);
      },
    } as any,
    {
      key: 'descricao',
      label: 'Descrição',
      controlType: 'textarea',
      placeholder: 'Digite a descrição',
      textTransform: 'lowercase',
      textareaRows: 3,
      hint: 'A descrição será convertida para minúsculas',
    },
  ]);

  // ============================================
  // EXEMPLO 16: Formulário com Campos Visíveis/Invisíveis
  // Demonstra campos que não são renderizados mas ainda existem no FormGroup
  // ============================================
  @ViewChild('visibleForm') visibleForm!: DynamicFormComponent;
  visibleFormResult = signal<any>(null);

  visibleFormConfig = signal<iFormConfig[]>([
    {
      key: 'name',
      label: 'Nome Completo',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Digite seu nome',
      hint: 'Este campo está visível',
    },
    {
      key: 'internalId',
      label: 'ID Interno',
      controlType: 'text',
      value: 'AUTO-GENERATED-123',
      visible: false,
      validators: [Validators.required],
      hint: 'Este campo está oculto mas existe no FormGroup',
    },
    {
      key: 'email',
      label: 'Email',
      controlType: 'email',
      validators: [Validators.required, Validators.email],
      placeholder: 'seu@email.com',
      hint: 'Este campo está visível',
    },
    {
      key: 'hiddenNotes',
      label: 'Notas Internas',
      controlType: 'textarea',
      value: 'Notas administrativas - não visível ao usuário',
      visible: false,
      textareaRows: 3,
      hint: 'Este campo está oculto',
    },
    {
      key: 'phone',
      label: 'Telefone',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: '(00) 00000-0000',
      hint: 'Este campo está visível',
    },
    {
      key: 'adminFlag',
      label: 'Flag Administrativa',
      controlType: 'toggleswitch',
      value: true,
      visible: false,
      hint: 'Campo toggle oculto',
    },
    {
      key: 'hiddenDate',
      label: 'Data de Criação',
      controlType: 'datepicker',
      value: new Date(),
      visible: false,
      dateViewType: 'date',
      hint: 'Campo de data oculto',
    },
  ]);

  onSubmitVisibleForm(): void {
    if (this.visibleForm.form.valid) {
      const formData = this.visibleForm.form;
      this.visibleFormResult.set(formData);
      console.log('Formulário submetido (inclui campos invisíveis):', formData);
      console.log('Campos invisíveis presentes:', {
        internalId: formData.get('internalId')?.value,
        hiddenNotes: formData.get('hiddenNotes')?.value,
        adminFlag: formData.get('adminFlag')?.value,
        hiddenDate: formData.get('hiddenDate')?.value,
      });
    } else {
      this.visibleForm.form.markAllAsTouched();
      this.visibleFormResult.set(null);
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  // ============================================
  // EXEMPLO 17: Formulário com Separadores/Divisores
  // Demonstra o uso de dividers para separar visualmente seções do formulário
  // ============================================
  @ViewChild('dividerForm') dividerForm!: DynamicFormComponent;
  dividerFormResult = signal<any>(null);

  dividerFormConfig = signal<iFormConfig[]>([
    {
      key: 'nome',
      label: 'Nome Completo',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Digite seu nome completo',
      hint: 'Seu nome como aparece no documento',
    },
    {
      key: 'cpf',
      label: 'CPF',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: '000.000.000-00',
      hint: 'Apenas números',
    },
    {
      key: 'dataNascimento',
      label: 'Data de Nascimento',
      controlType: 'datepicker',
      validators: [Validators.required],
      placeholder: 'Selecione a data',
      dateViewType: 'date',
    },
    {
      key: 'divider-1',
      controlType: 'divider',
      dividerConfig: {
        type: 'solid',
        align: 'center',
        content: 'Dados de Contato',
      },
    },
    {
      key: 'email',
      label: 'E-mail',
      controlType: 'email',
      validators: [Validators.required, Validators.email],
      placeholder: 'seu@email.com',
      hint: 'E-mail principal para contato',
    },
    {
      key: 'telefone',
      label: 'Telefone',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: '(00) 00000-0000',
      hint: 'Inclua DDD',
    },
    {
      key: 'celular',
      label: 'Celular',
      controlType: 'text',
      placeholder: '(00) 00000-0000',
      hint: 'Opcional',
    },
    {
      key: 'divider-2',
      controlType: 'divider',
      dividerConfig: {
        type: 'dashed',
        align: 'left',
        content: 'Endereço',
      },
    },
    {
      key: 'cep',
      label: 'CEP',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: '00000-000',
    },
    {
      key: 'rua',
      label: 'Rua',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Nome da rua',
      styleClass: 'grid-col-8',
    },
    {
      key: 'numero',
      label: 'Número',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Número',
      styleClass: 'grid-col-4',
    },
    {
      key: 'complemento',
      label: 'Complemento',
      controlType: 'text',
      placeholder: 'Apto, Bloco, etc.',
      styleClass: 'grid-col-6',
    },
    {
      key: 'bairro',
      label: 'Bairro',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Nome do bairro',
      styleClass: 'grid-col-6',
    },
    {
      key: 'cidade',
      label: 'Cidade',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Nome da cidade',
      styleClass: 'grid-col-8',
    },
    {
      key: 'estado',
      label: 'Estado',
      controlType: 'select',
      validators: [Validators.required],
      options: [
        { label: 'São Paulo', value: 'SP' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'Rio Grande do Sul', value: 'RS' },
      ],
      placeholder: 'Selecione o estado',
      styleClass: 'grid-col-4',
    },
    {
      key: 'divider-3',
      controlType: 'divider',
      dividerConfig: {
        type: 'dotted',
        align: 'right',
        content: 'Informações Adicionais',
      },
    },
    {
      key: 'observacoes',
      label: 'Observações',
      controlType: 'textarea',
      placeholder: 'Adicione observações adicionais...',
      textareaRows: 4,
      textareaAutoResize: true,
      hint: 'Campo opcional para observações',
    },
    {
      key: 'divider-4',
      controlType: 'divider',
      dividerConfig: {
        type: 'solid',
      },
    },
    {
      key: 'aceitarTermos',
      label: 'Aceitar Termos e Condições',
      controlType: 'toggleswitch',
      validators: [Validators.requiredTrue],
      hint: 'Você precisa aceitar os termos para continuar',
    },
  ]);

  onSubmitDividerForm(): void {
    if (this.dividerForm.form.valid) {
      const formData = this.dividerForm.form.value;
      this.dividerFormResult.set(formData);
      console.log('Formulário com dividers submetido:', formData);
    } else {
      this.dividerForm.form.markAllAsTouched();
      this.dividerFormResult.set(null);
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  // ============================================
  // EXEMPLO 18: Formulário com Estado e Cidade (Select Dinâmico)
  // Demonstra campos select interdependentes com carregamento dinâmico
  // ============================================
  @ViewChild('estadoCidadeForm') estadoCidadeForm!: DynamicFormComponent;
  estadoCidadeResult = signal<any>(null);
  isLoadingCidades = signal<boolean>(false);
  private estadoCidadeFormGroup?: FormGroup;
  private readonly destroyRef = inject(DestroyRef);

  estadoCidadeFormConfig = signal<iFormConfig[]>([
    {
      key: 'estado',
      label: 'Estado',
      controlType: 'select',
      options: [],
      validators: [Validators.required],
      placeholder: 'Selecione o estado',
      hint: 'Selecione um estado para carregar as cidades',
    },
    {
      key: 'cidade',
      label: 'Cidade',
      controlType: 'select',
      options: [],
      validators: [Validators.required],
      placeholder: 'Selecione a cidade',
      disabled: true,
      hint: 'As cidades serão carregadas após selecionar um estado',
    },
  ]);

  ngOnInit(): void {
    this.carregarEstados();
    this.carregarEstadosApi();
  }

  /**
   * Callback executado quando o formulário está pronto.
   * Configura a dependência entre os campos estado e cidade.
   */
  onEstadoCidadeFormReady(form: FormGroup): void {
    this.estadoCidadeFormGroup = form;

    // Escuta mudanças no campo estado
    form
      .get('estado')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((uf: string | null) => {
        if (uf) {
          this.carregarCidades(uf);
        } else {
          this.limparCidades();
        }
      });
  }

  /**
   * Carrega os estados do arquivo JSON e atualiza a configuração do formulário.
   */
  private carregarEstados(): void {
    this.estadoCidadeService.loadEstados().subscribe({
      next: (estados) => {
        this.atualizarCampo('estado', { options: estados });
      },
      error: (error) => {
        console.error('Erro ao carregar estados:', error);
        alert('Erro ao carregar estados. Verifique o console para mais detalhes.');
      },
    });
  }

  /**
   * Carrega as cidades de um estado específico via API.
   * @param uf Sigla do estado selecionado
   */
  private carregarCidades(uf: string): void {
    this.isLoadingCidades.set(true);
    this.limparCidades();

    this.estadoCidadeService.loadCidadesByEstado(uf).subscribe({
      next: (cidades) => {
        this.atualizarCampo('cidade', { options: cidades, disabled: false });
        this.estadoCidadeFormGroup?.get('cidade')?.enable({ emitEvent: false });
        this.isLoadingCidades.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar cidades:', error);
        this.isLoadingCidades.set(false);
        alert('Erro ao carregar cidades. Verifique o console para mais detalhes.');
      },
    });
  }

  /**
   * Limpa as opções de cidade e desabilita o campo.
   */
  private limparCidades(): void {
    this.atualizarCampo('cidade', { options: [], disabled: true });
    const cidadeControl = this.estadoCidadeFormGroup?.get('cidade');
    if (cidadeControl) {
      cidadeControl.reset(null, { emitEvent: false });
      cidadeControl.disable({ emitEvent: false });
    }
  }

  /**
   * Método auxiliar que atualiza um campo criando um novo objeto (imutabilidade).
   * Isso garante que o Angular detecte a mudança mesmo com OnPush change detection.
   * @param key Chave do campo a ser atualizado
   * @param changes Propriedades a serem atualizadas no campo
   */
  private atualizarCampo(key: string, changes: Partial<iFormConfig>): void {
    this.estadoCidadeFormConfig.update((config) =>
      config.map((field) => (field.key === key ? { ...field, ...changes } : field))
    );
  }

  onSubmitEstadoCidadeForm(): void {
    if (this.estadoCidadeFormGroup?.valid) {
      const formData = this.estadoCidadeFormGroup.value;
      this.estadoCidadeResult.set(formData);
      console.log('Formulário Estado/Cidade submetido:', formData);
    } else {
      this.estadoCidadeFormGroup?.markAllAsTouched();
      this.estadoCidadeResult.set(null);
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  // ============================================
  // EXEMPLO 19: Formulário com Campos de RadioButton
  // Demonstra diferentes configurações de radio button
  // ============================================
  @ViewChild('radioButtonForm') radioButtonForm!: DynamicFormComponent;
  radioButtonResult = signal<any>(null);

  radioButtonFormConfig = signal<iFormConfig[]>([
    {
      key: 'nome',
      label: 'Nome Completo',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Digite seu nome',
    },
    {
      key: 'genero',
      controlType: 'radiobutton',
      label: 'Gênero',
      options: [
        { label: 'Masculino', value: 'M' },
        { label: 'Feminino', value: 'F' },
        { label: 'Outro', value: 'O' },
        { label: 'Prefiro não informar', value: 'N' },
      ],
      radioLayout: 'vertical',
      validators: [Validators.required],
      hint: 'Selecione uma opção',
    },
    {
      key: 'prioridade',
      controlType: 'radiobutton',
      label: 'Prioridade',
      options: [
        { label: 'Baixa', value: 'low' },
        { label: 'Média', value: 'medium' },
        { label: 'Alta', value: 'high' },
        { label: 'Urgente', value: 'urgent' },
      ],
      radioLayout: 'horizontal',
      validators: [Validators.required],
      hint: 'Selecione o nível de prioridade',
    },
    {
      key: 'status',
      controlType: 'radiobutton',
      label: 'Status',
      options: [
        { label: 'Ativo', value: 'active' },
        { label: 'Inativo', value: 'inactive' },
        { label: 'Pendente', value: 'pending' },
      ],
      value: 'active',
      radioLayout: 'vertical',
      validators: [Validators.required],
      hint: 'Status pré-selecionado como "Ativo"',
    },
    {
      key: 'tipoConta',
      controlType: 'radiobutton',
      label: 'Tipo de Conta',
      options: [
        { label: 'Pessoa Física', value: 'PF' },
        { label: 'Pessoa Jurídica', value: 'PJ' },
      ],
      radioLayout: 'horizontal',
      validators: [Validators.required],
      hint: 'Selecione o tipo de conta',
    },
    {
      key: 'estadoCivil',
      controlType: 'radiobutton',
      label: 'Estado Civil',
      options: [
        { label: 'Solteiro(a)', value: 'single' },
        { label: 'Casado(a)', value: 'married' },
        { label: 'Divorciado(a)', value: 'divorced' },
        { label: 'Viúvo(a)', value: 'widowed' },
      ],
      radioLayout: 'vertical',
      hint: 'Campo opcional',
    },
  ]);

  onSubmitRadioButtonForm(): void {
    if (this.radioButtonForm.form.valid) {
      const formData = this.radioButtonForm.form.value;
      this.radioButtonResult.set(formData);
      console.log('Formulário RadioButton submetido:', formData);
    } else {
      this.radioButtonForm.form.markAllAsTouched();
      this.radioButtonResult.set(null);
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  // ============================================
  // EXEMPLO 20: Select com Dados de API (Sem Mapeamento)
  // Demonstra uso de optionLabel/optionValue e optionMapper para dados de API
  // ============================================
  @ViewChild('selectApiForm') selectApiForm!: DynamicFormComponent;
  selectApiResult = signal<any>(null);
  isLoadingCidadesApi = signal<boolean>(false);
  private selectApiFormGroup?: FormGroup;

  selectApiFormConfig = signal<iFormConfig[]>([
    {
      key: 'estado',
      label: 'Estado',
      controlType: 'select',
      options: [],
      validators: [Validators.required],
      placeholder: 'Selecione o estado',
      hint: 'Selecione um estado para carregar as cidades',
      optionFilter: true,
      optionShowClear: true,
    },
    {
      key: 'cidade',
      label: 'Cidade',
      controlType: 'select',
      options: [],
      validators: [Validators.required],
      placeholder: 'Selecione a cidade',
      disabled: true,
      hint: 'As cidades serão carregadas após selecionar um estado',
      optionLabel: 'nome',
      optionValue: 'id',
      optionFilter: true,
      optionShowClear: true,
    },
    {
      key: 'cidadeComMapper',
      label: 'Cidade (com Mapper)',
      controlType: 'select',
      options: [],
      validators: [Validators.required],
      placeholder: 'Selecione a cidade',
      disabled: true,
      hint: 'Exemplo usando optionMapper para label composto',
      optionMapper: (cidade: any) => ({
        label: `${cidade.nome} - ${cidade.microrregiao?.mesorregiao?.UF?.sigla || 'N/A'}`,
        value: cidade.id,
      }),
      optionFilter: true,
      optionShowClear: true,
    },
  ]);

  /**
   * Callback executado quando o formulário está pronto.
   * Configura a dependência entre os campos estado e cidade.
   */
  onSelectApiFormReady(form: FormGroup): void {
    this.selectApiFormGroup = form;

    // Escuta mudanças no campo estado
    form
      .get('estado')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((uf: string | null) => {
        if (uf) {
          this.carregarCidadesApi(uf);
        } else {
          this.limparCidadesApi();
        }
      });
  }

  /**
   * Carrega os estados do arquivo JSON e atualiza a configuração do formulário.
   */
  private carregarEstadosApi(): void {
    this.estadoCidadeService.loadEstados().subscribe({
      next: (estados) => {
        this.atualizarCampoApi('estado', { options: estados });
      },
      error: (error) => {
        console.error('Erro ao carregar estados:', error);
        alert('Erro ao carregar estados. Verifique o console para mais detalhes.');
      },
    });
  }

  /**
   * Carrega as cidades de um estado específico via API usando dados brutos.
   * Demonstra o uso de optionLabel/optionValue para evitar mapeamento manual.
   * @param uf Sigla do estado selecionado
   */
  private carregarCidadesApi(uf: string): void {
    this.isLoadingCidadesApi.set(true);
    this.limparCidadesApi();

    this.estadoCidadeService.loadCidadesByEstadoRaw(uf).subscribe({
      next: (cidades) => {
        // Campo cidade usa optionLabel/optionValue
        this.atualizarCampoApi('cidade', {
          options: cidades,
          disabled: false,
        });

        // Campo cidadeComMapper usa optionMapper
        this.atualizarCampoApi('cidadeComMapper', {
          options: cidades,
          disabled: false,
        });

        this.selectApiFormGroup?.get('cidade')?.enable({ emitEvent: false });
        this.selectApiFormGroup?.get('cidadeComMapper')?.enable({ emitEvent: false });
        this.isLoadingCidadesApi.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar cidades:', error);
        this.isLoadingCidadesApi.set(false);
        alert('Erro ao carregar cidades. Verifique o console para mais detalhes.');
      },
    });
  }

  /**
   * Limpa as opções de cidade e desabilita os campos.
   */
  private limparCidadesApi(): void {
    this.atualizarCampoApi('cidade', { options: [], disabled: true });
    this.atualizarCampoApi('cidadeComMapper', { options: [], disabled: true });
    const cidadeControl = this.selectApiFormGroup?.get('cidade');
    const cidadeMapperControl = this.selectApiFormGroup?.get('cidadeComMapper');
    if (cidadeControl) {
      cidadeControl.reset(null, { emitEvent: false });
      cidadeControl.disable({ emitEvent: false });
    }
    if (cidadeMapperControl) {
      cidadeMapperControl.reset(null, { emitEvent: false });
      cidadeMapperControl.disable({ emitEvent: false });
    }
  }

  /**
   * Método auxiliar que atualiza um campo criando um novo objeto (imutabilidade).
   * @param key Chave do campo a ser atualizado
   * @param changes Propriedades a serem atualizadas no campo
   */
  private atualizarCampoApi(key: string, changes: Partial<iFormConfig>): void {
    this.selectApiFormConfig.update((config) =>
      config.map((field) => (field.key === key ? { ...field, ...changes } : field))
    );
  }

  onSubmitSelectApiForm(): void {
    if (this.selectApiFormGroup?.valid) {
      const formData = this.selectApiFormGroup.value;
      this.selectApiResult.set(formData);
      console.log('Formulário Select API submetido:', formData);
    } else {
      this.selectApiFormGroup?.markAllAsTouched();
      this.selectApiResult.set(null);
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  // ============================================
  // EXEMPLO 21: Formulário com Campos Number Aprimorados
  // Demonstra todas as funcionalidades do campo number: currency, decimal, prefixo/sufixo, botões, etc.
  // ============================================
  @ViewChild('numberForm') numberForm!: DynamicFormComponent;
  numberResult = signal<any>(null);

  numberFormConfig = signal<iFormConfig[]>([
    {
      key: 'nome',
      label: 'Nome do Produto',
      controlType: 'text',
      validators: [Validators.required],
      placeholder: 'Digite o nome do produto',
    },
    {
      key: 'preco',
      label: 'Preço de Venda',
      controlType: 'number',
      placeholder: 'Digite o preço',
      numberConfig: {
        mode: 'currency',
        currency: 'BRL',
        locale: 'pt-BR',
        minFractionDigits: 2,
        maxFractionDigits: 2,
        showClear: true,
      },
      validators: [Validators.required, Validators.min(0)],
      hint: 'Preço em reais (R$) com formatação monetária',
    },
    {
      key: 'desconto',
      label: 'Desconto',
      controlType: 'number',
      placeholder: 'Digite o desconto',
      numberConfig: {
        prefix: '%',
        min: 0,
        max: 100,
        showButtons: true,
        buttonLayout: 'stacked',
        step: 1,
      },
      validators: [Validators.min(0), Validators.max(100)],
      hint: 'Desconto de 0 a 100% com botões de incremento/decremento',
    },
    {
      key: 'peso',
      label: 'Peso',
      controlType: 'number',
      placeholder: 'Digite o peso',
      numberConfig: {
        mode: 'decimal',
        suffix: ' kg',
        minFractionDigits: 2,
        maxFractionDigits: 3,
        useGrouping: true,
        showClear: true,
        min: 0,
      },
      validators: [Validators.required, Validators.min(0)],
      hint: 'Peso em quilogramas com 2-3 casas decimais',
    },
    {
      key: 'quantidade',
      label: 'Quantidade em Estoque',
      controlType: 'number',
      placeholder: 'Digite a quantidade',
      numberConfig: {
        min: 0,
        showButtons: true,
        buttonLayout: 'horizontal',
        step: 1,
      },
      validators: [Validators.required, Validators.min(0)],
      hint: 'Quantidade de itens (números inteiros) com botões horizontais',
    },
    {
      key: 'temperatura',
      label: 'Temperatura de Armazenamento',
      controlType: 'number',
      placeholder: 'Digite a temperatura',
      numberConfig: {
        mode: 'decimal',
        prefix: '↑ ',
        suffix: '℃',
        min: -50,
        max: 50,
        step: 0.5,
        showButtons: true,
        buttonLayout: 'horizontal',
        minFractionDigits: 1,
        maxFractionDigits: 1,
      },
      validators: [Validators.required, Validators.min(-50), Validators.max(50)],
      hint: 'Temperatura em graus Celsius com prefixo e sufixo',
    },
    {
      key: 'area',
      label: 'Área',
      controlType: 'number',
      placeholder: 'Digite a área',
      numberConfig: {
        mode: 'decimal',
        suffix: ' m²',
        minFractionDigits: 2,
        maxFractionDigits: 4,
        useGrouping: true,
        showButtons: true,
        buttonLayout: 'stacked',
        step: 0.1,
        min: 0,
      },
      validators: [Validators.required, Validators.min(0)],
      hint: 'Área em metros quadrados com múltiplas casas decimais',
    },
    {
      key: 'precoUSD',
      label: 'Preço (USD)',
      controlType: 'number',
      placeholder: 'Enter price',
      numberConfig: {
        mode: 'currency',
        currency: 'USD',
        locale: 'en-US',
        currencyDisplay: 'symbol',
        minFractionDigits: 2,
        maxFractionDigits: 2,
      },
      validators: [Validators.min(0)],
      hint: 'Preço em dólares americanos (opcional)',
    },
    {
      key: 'total',
      label: 'Total Calculado',
      controlType: 'number',
      numberConfig: {
        mode: 'currency',
        currency: 'BRL',
        locale: 'pt-BR',
        minFractionDigits: 2,
        maxFractionDigits: 2,
        readonly: true,
      },
      value: 0,
      hint: 'Valor calculado automaticamente (somente leitura)',
    },
    {
      key: 'idade',
      label: 'Idade',
      controlType: 'number',
      placeholder: 'Digite a idade',
      validators: [Validators.required, Validators.min(18), Validators.max(120)],
      hint: 'Campo number sem numberConfig (comportamento padrão para inteiros)',
    },
  ]);

  onSubmitNumberForm(): void {
    if (this.numberForm.form.valid) {
      const formData = this.numberForm.form.value;
      this.numberResult.set(formData);
      console.log('Formulário Number aprimorado submetido:', formData);
    } else {
      this.numberForm.form.markAllAsTouched();
      this.numberResult.set(null);
      console.log('Formulário inválido. Verifique os campos.');
    }
  }
}

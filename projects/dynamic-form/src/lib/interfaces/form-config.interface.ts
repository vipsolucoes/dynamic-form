import { ValidatorFn } from '@angular/forms';
import { ButtonSeverity } from 'primeng/button';

/**
 * Define a estrutura para opções de campos como 'select' (dropdown).
 */
export interface iFieldOption {
  label: string;
  value: any;
}

/**
 * Define a estrutura completa para a configuração de um único campo de formulário dinâmico.
 */
export interface iFormConfig {
  /**
   * Identificador único do controle no formulário.
   */
  key: string;
  /**
   * O tipo de controle a ser renderizado.
   */
  controlType:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'select'
    | 'datepicker'
    | 'textarea'
    | 'toggleswitch'
    | 'input-button'
    | 'divider'
    | 'radiobutton';
  /**
   * Texto a ser exibido no label do campo.
   * Não obrigatório para controlType 'divider'.
   */
  label?: string;
  /**
   * Valor inicial do campo.
   */
  value?: any;
  /**
   * Texto de placeholder para o campo.
   */
  placeholder?: string;
  /**
   * Texto de ajuda ou dica, exibido abaixo do campo.
   */
  hint?: string;
  /**
   * Indica se o campo deve estar desabilitado. Default: false.
   */
  disabled?: boolean;
  /**
   * Indica se o campo deve estar visível. Default: true.
   * Quando false, o campo não é renderizado no template, mas ainda é criado no FormGroup.
   */
  visible?: boolean;
  /**
   * Chave (key) do campo toggleSwitch que controla a habilitação deste campo.
   * Quando o toggle referenciado estiver ativado (true), este campo será habilitado.
   * Quando desativado (false), este campo será desabilitado.
   */
  enabledWhen?: string;
  /**
   * Classes CSS customizadas para o container do campo.
   */
  styleClass?: string;
  /**
   * Array de opções, obrigatório para o controlType 'select' e 'radiobutton'.
   */
  options?: iFieldOption[] | unknown[];
  /**
   * Nome do campo do objeto a ser usado como label no select.
   * Default: 'label'. Suporta dot notation para campos aninhados (ex: 'endereco.cidade').
   * Aplicável apenas para controlType 'select'.
   * Quando definido, permite usar dados de API diretamente sem mapeamento manual.
   */
  optionLabel?: string;
  /**
   * Nome do campo do objeto a ser usado como value no select.
   * Default: 'value'. Suporta dot notation para campos aninhados (ex: 'id').
   * Aplicável apenas para controlType 'select'.
   * Quando definido, permite usar dados de API diretamente sem mapeamento manual.
   */
  optionValue?: string;
  /**
   * Função para mapear cada item da opção para o formato { label, value }.
   * Útil quando label precisa ser uma combinação de campos ou transformação complexa.
   * Aplicável apenas para controlType 'select'.
   * Se definido, tem prioridade sobre optionLabel/optionValue.
   */
  optionMapper?: (item: any) => iFieldOption;
  /**
   * Habilita filtro de busca nas opções do select.
   * Aplicável apenas para controlType 'select'.
   */
  optionFilter?: boolean;
  /**
   * Exibe botão para limpar a seleção do select.
   * Aplicável apenas para controlType 'select'.
   */
  optionShowClear?: boolean;
  /**
   * Array de funções de validação a serem aplicadas ao campo.
   */
  validators?: ValidatorFn[];
  /**
   * Formato da data para o campo de data. Default: 'dd/mm/yy'.
   */
  dateFormat?: string;
  /**
   * Tipo de visualização da data para o campo de data. Default: 'date'. Opções: 'date' | 'month' | 'year'
   */
  dateViewType?: 'date' | 'month' | 'year';
  /**
   * Habilita redimensionamento automático do textarea. Default: false. Aplicável apenas para controlType 'textarea'.
   */
  textareaAutoResize?: boolean;
  /**
   * Número de linhas do textarea. Default: 1 quando controlType é 'textarea'. Aplicável apenas para controlType 'textarea'.
   */
  textareaRows?: number;
  /**
   * Número de colunas do textarea. Opcional, sem default. Aplicável apenas para controlType 'textarea'.
   */
  textareaCols?: number;
  /**
   * Valor quando o toggle switch está ativado. Default: true. Aplicável apenas para controlType 'toggleswitch'.
   */
  toggleTrueValue?: any;
  /**
   * Valor quando o toggle switch está desativado. Default: false. Aplicável apenas para controlType 'toggleswitch'.
   */
  toggleFalseValue?: any;
  /**
   * Configuração do botão para campos do tipo 'input-button'
   */
  buttonConfig?: {
    /**
     * Ícone do botão (PrimeIcons). Ex: 'pi pi-search'
     */
    icon?: string;
    /**
     * Label/texto do botão
     */
    label?: string;
    /**
     * Tooltip do botão
     */
    tooltip?: string;
    /**
     * Posição do botão. Default: 'right'
     */
    position?: 'left' | 'right';
    /**
     * Severity do botão. Default: 'primary'
     */
    severity?: ButtonSeverity;
  };
  /**
   * Função callback executada ao clicar no botão do campo 'input-button'.
   * Recebe a key do campo e o valor atual como parâmetros.
   */
  buttonCallback?: (fieldKey: string, fieldValue: any) => void | Promise<void>;
  /**
   * Transformação de texto para o campo. Opções: 'uppercase' | 'lowercase'.
   * Aplicável apenas para campos de texto (text, email, textarea, input-button).
   * Quando definido, o texto é transformado automaticamente conforme o usuário digita.
   */
  textTransform?: 'uppercase' | 'lowercase';
  /**
   * Configuração do divisor/separador para campos do tipo 'divider'.
   * Aplicável apenas para controlType 'divider'.
   */
  dividerConfig?: {
    /**
     * Orientação do divisor. Default: 'horizontal'.
     */
    layout?: 'horizontal' | 'vertical';
    /**
     * Estilo da borda do divisor. Default: 'solid'.
     */
    type?: 'solid' | 'dashed' | 'dotted';
    /**
     * Alinhamento do conteúdo do divisor (quando há texto).
     */
    align?: 'left' | 'center' | 'right' | 'top' | 'bottom';
    /**
     * Texto opcional para exibir no divisor.
     */
    content?: string;
  };
  /**
   * Orientação do layout dos radio buttons. Default: 'vertical'.
   * Aplicável apenas para controlType 'radiobutton'.
   */
  radioLayout?: 'horizontal' | 'vertical';
}

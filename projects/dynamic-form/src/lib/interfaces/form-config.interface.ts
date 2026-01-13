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
    | 'input-button';
  /**
   * Texto a ser exibido no label do campo.
   */
  label: string;
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
   * Array de opções, obrigatório para o controlType 'select'.
   */
  options?: iFieldOption[];
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
}

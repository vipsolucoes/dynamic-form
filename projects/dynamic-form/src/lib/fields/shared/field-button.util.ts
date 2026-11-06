import { FormGroup } from '@angular/forms';

import { iFormConfig } from '../../interfaces/form-config.interface';

/**
 * Retorna a posição do botão acoplado ao campo. Default: 'right'.
 */
export function resolveButtonPosition(field: iFormConfig): 'left' | 'right' {
  return field.buttonConfig?.position || 'right';
}

/**
 * Indica se o botão deve estar desabilitado.
 * `buttonEnabled === true` habilita, `false` desabilita; indefinido segue o estado do controle.
 */
export function isFieldButtonDisabled(form: FormGroup, field: iFormConfig): boolean {
  const buttonEnabled = field.buttonConfig?.buttonEnabled;

  if (buttonEnabled === true) {
    return false;
  }
  if (buttonEnabled === false) {
    return true;
  }

  return form.get(field.key)?.disabled ?? false;
}

/**
 * Executa o buttonCallback (se existir) com a key do campo e o valor atual do controle.
 */
export function invokeFieldButtonCallback(form: FormGroup, field: iFormConfig): void {
  const value = form.get(field.key)?.value;
  const callback = field.buttonCallback;

  if (callback) {
    callback(field.key, value);
  }
}

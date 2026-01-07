import { Provider } from '@angular/core';

import { DYNAMIC_FORM_ERROR_MESSAGES, DynamicFormErrorMessages } from '../interfaces/error-messages.interface';

/**
 * Provider para configurar mensagens de erro customizadas.
 * @param messages Mensagens de erro customizadas
 * @returns Provider configurado
 */
export function provideDynamicFormConfig(messages?: DynamicFormErrorMessages): Provider[] {
  const providers: Provider[] = [];

  if (messages) {
    providers.push({
      provide: DYNAMIC_FORM_ERROR_MESSAGES,
      useValue: messages,
    });
  }

  return providers;
}

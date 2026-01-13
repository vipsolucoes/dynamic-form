import { InjectionToken } from '@angular/core';

/**
 * Interface para configuração de mensagens de erro customizadas.
 */
export interface DynamicFormErrorMessages {
  required?: string;
  email?: string;
  minlength?: (requiredLength: number) => string;
  maxlength?: (requiredLength: number) => string;
  custom?: (error: any) => string;
}

/**
 * InjectionToken para prover mensagens de erro customizadas.
 */
export const DYNAMIC_FORM_ERROR_MESSAGES = new InjectionToken<DynamicFormErrorMessages>(
  'DYNAMIC_FORM_ERROR_MESSAGES'
);

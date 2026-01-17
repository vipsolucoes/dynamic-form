import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { DYNAMIC_FORM_ERROR_MESSAGES, DynamicFormErrorMessages } from '../../interfaces/error-messages.interface';

@Component({
  selector: 'vp-form-field-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (errorMessage) {
      <small class="p-error">{{ errorMessage }}</small>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: 0.5rem;
        min-height: 1rem;
      }
      .p-error {
        color: var(--p-red-500, #ef4444);
        font-size: 0.875rem;
      }
    `,
  ],
})
export class DynamicFormErrorComponent {
  control = input.required<AbstractControl>();

  private readonly customMessages = inject(DYNAMIC_FORM_ERROR_MESSAGES, { optional: true });

  // Mapeamento de erros para mensagens
  private readonly defaultErrorMessages: { [key: string]: (err: any) => string } = {
    required: () => this.customMessages?.required ?? 'Este campo é obrigatório.',
    email: () => this.customMessages?.email ?? 'Por favor, insira um e-mail válido.',
    minlength: (err) => this.customMessages?.minlength?.(err.requiredLength) ?? `Mínimo de ${err.requiredLength} caracteres.`,
    maxlength: (err) => this.customMessages?.maxlength?.(err.requiredLength) ?? `Máximo de ${err.requiredLength} caracteres.`,
    min: (err) => this.customMessages?.min?.(err.min) ?? `O valor mínimo é ${err.min}.`,
    max: (err) => this.customMessages?.max?.(err.max) ?? `O valor máximo é ${err.max}.`,
    custom: (err) => (this.customMessages?.custom ? this.customMessages.custom(err) : err),
  };

  // Getter simples - Angular detecta mudanças automaticamente
  get errorMessage(): string | null {
    const ctrl = this.control();
    if (!ctrl || !ctrl.errors || (!ctrl.touched && !ctrl.dirty)) {
      return null;
    }

    const errorKey = Object.keys(ctrl.errors)[0];
    return this.defaultErrorMessages[errorKey] ? this.defaultErrorMessages[errorKey](ctrl.errors[errorKey]) : 'Campo inválido.';
  }
}

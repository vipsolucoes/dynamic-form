import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';

import { iFormConfig } from '../interfaces/form-config.interface';

@Component({
  selector: 'vp-number-input-field',
  standalone: true,
  imports: [ReactiveFormsModule, IftaLabelModule, InputNumberModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()">
      <p-iftalabel>
        <p-inputNumber
          [inputId]="field().key"
          [formControlName]="field().key"
          [placeholder]="field().placeholder || ''"
          [mode]="effectiveMode() ?? undefined"
          [currency]="numberConfig()?.currency ?? undefined"
          [currencyDisplay]="numberConfig()?.currencyDisplay ?? undefined"
          [minFractionDigits]="effectiveMinFractionDigits() ?? undefined"
          [maxFractionDigits]="effectiveMaxFractionDigits() ?? undefined"
          [useGrouping]="numberConfig()?.useGrouping ?? true"
          [prefix]="numberConfig()?.prefix ?? undefined"
          [suffix]="numberConfig()?.suffix ?? undefined"
          [min]="numberConfig()?.min ?? undefined"
          [max]="numberConfig()?.max ?? undefined"
          [step]="numberConfig()?.step ?? undefined"
          [showButtons]="hasButtons()"
          [buttonLayout]="numberConfig()?.buttonLayout ?? 'stacked'"
          [showClear]="hasClearButton()"
          [locale]="effectiveLocale() ?? undefined"
          [readonly]="numberConfig()?.readonly ?? false"
          [size]="numberConfig()?.size ?? undefined"
          [variant]="numberConfig()?.variant ?? 'outlined'"
          [invalid]="isInvalid()"
          [disabled]="field().disabled ?? false"
          [required]="hasRequiredValidator()"
          styleClass="w-full"
          class="w-full"
        />
        <label [for]="field().key">{{ field().label }}</label>
      </p-iftalabel>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      p-iftalabel {
        display: block;
        width: 100%;
      }
      :host ::ng-deep p-inputNumber,
      :host ::ng-deep .p-inputnumber,
      :host ::ng-deep .p-inputnumber input {
        width: 100%;
      }
    `,
  ],
})
export class NumberInputFieldComponent {
  form = input.required<FormGroup>();
  field = input.required<iFormConfig>();

  /**
   * Retorna a configuração numberConfig do campo, se existir.
   */
  numberConfig = computed(() => this.field().numberConfig);

  /**
   * Determina o modo efetivo do InputNumber.
   * Se não houver numberConfig, retorna undefined (comportamento padrão para inteiros).
   * Se houver numberConfig mas mode não estiver definido, retorna 'decimal'.
   */
  effectiveMode = computed(() => {
    const config = this.numberConfig();
    if (!config) {
      return undefined; // Comportamento padrão (inteiros)
    }
    return config.mode ?? 'decimal';
  });

  /**
   * Determina a localização efetiva.
   * Se não especificada no numberConfig, retorna undefined (usa localização do navegador).
   */
  effectiveLocale = computed(() => {
    return this.numberConfig()?.locale;
  });

  /**
   * Determina o número mínimo de casas decimais.
   * Para currency mode, default é 2. Para decimal mode, default é 0.
   * Se não houver numberConfig, retorna undefined (comportamento padrão para inteiros).
   */
  effectiveMinFractionDigits = computed(() => {
    const config = this.numberConfig();
    if (!config) {
      return undefined; // Comportamento padrão (inteiros)
    }
    if (config.minFractionDigits !== undefined) {
      return config.minFractionDigits;
    }
    // Default baseado no mode
    return config.mode === 'currency' ? 2 : 0;
  });

  /**
   * Determina o número máximo de casas decimais.
   * Para currency mode, default é 2. Para decimal mode, default é 3.
   * Se não houver numberConfig, retorna undefined (comportamento padrão para inteiros).
   */
  effectiveMaxFractionDigits = computed(() => {
    const config = this.numberConfig();
    if (!config) {
      return undefined; // Comportamento padrão (inteiros)
    }
    if (config.maxFractionDigits !== undefined) {
      return config.maxFractionDigits;
    }
    // Default baseado no mode
    return config.mode === 'currency' ? 2 : 3;
  });

  /**
   * Verifica se deve exibir botões de incremento/decremento.
   */
  hasButtons = computed(() => {
    return this.numberConfig()?.showButtons ?? false;
  });

  /**
   * Verifica se deve exibir botão para limpar valor.
   */
  hasClearButton = computed(() => {
    return this.numberConfig()?.showClear ?? false;
  });

  /**
   * Verifica se o campo está em estado inválido.
   */
  isInvalid = computed(() => {
    const control = this.form().get(this.field().key);
    if (!control) {
      return false;
    }
    return control.invalid && (control.touched || control.dirty);
  });

  /**
   * Verifica se o campo tem validação required.
   */
  hasRequiredValidator = computed(() => {
    const control = this.form().get(this.field().key);
    if (!control) {
      return false;
    }
    return control.hasError('required');
  });
}

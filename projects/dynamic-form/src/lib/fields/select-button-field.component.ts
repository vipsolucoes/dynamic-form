import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

import { iFormConfig } from '../interfaces/form-config.interface';
import {
  invokeFieldButtonCallback,
  isFieldButtonDisabled,
  resolveButtonPosition,
} from './shared/field-button.util';
import {
  mapSelectOptions,
  resolveOptionLabel,
  resolveOptionValue,
} from './shared/select-options.util';

/**
 * Campo select com botão acoplado via p-inputgroup (mesmo padrão do input-button).
 */
@Component({
  selector: 'vp-select-button-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IftaLabelModule,
    SelectModule,
    InputGroupModule,
    ButtonModule,
    TooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()">
      <p-inputgroup>
        @if (buttonPosition() === 'left') {
        <p-button
          type="button"
          [icon]="buttonConfig()?.icon || ''"
          [label]="buttonConfig()?.label || ''"
          [severity]="buttonConfig()?.severity || 'primary'"
          [pTooltip]="buttonConfig()?.tooltip || ''"
          tooltipPosition="top"
          (click)="onButtonClick()"
          [disabled]="isButtonDisabled()"
        />
        }

        <p-iftalabel>
          <p-select
            [inputId]="field().key"
            [formControlName]="field().key"
            [options]="mappedOptions()"
            [placeholder]="field().placeholder || 'Selecione'"
            [optionLabel]="effectiveOptionLabel()"
            [optionValue]="effectiveOptionValue()"
            [filter]="field().optionFilter ?? false"
            [showClear]="field().optionShowClear ?? false"
            [appendTo]="field().optionAppendTo ?? undefined"
          />
          <label [for]="field().key">{{ field().label }}</label>
        </p-iftalabel>

        @if (buttonPosition() === 'right') {
        <p-button
          type="button"
          [icon]="buttonConfig()?.icon || ''"
          [label]="buttonConfig()?.label || ''"
          [severity]="buttonConfig()?.severity || 'primary'"
          [pTooltip]="buttonConfig()?.tooltip || ''"
          tooltipPosition="top"
          (click)="onButtonClick()"
          [disabled]="isButtonDisabled()"
        />
        }
      </p-inputgroup>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      p-inputgroup {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
      }
      p-iftalabel {
        flex: 1;
        min-width: 0;
      }
      p-select {
        width: 100%;
      }
      p-button {
        flex-shrink: 0;
      }
    `,
  ],
})
export class SelectButtonFieldComponent {
  form = input.required<FormGroup>();
  field = input.required<iFormConfig>();

  /**
   * Aplica optionMapper se existir, caso contrário retorna as opções originais.
   */
  mappedOptions = computed(() => mapSelectOptions(this.field()));

  /** optionLabel efetivo ('label' quando há optionMapper). */
  effectiveOptionLabel = computed(() => resolveOptionLabel(this.field()));

  /** optionValue efetivo ('value' quando há optionMapper). */
  effectiveOptionValue = computed(() => resolveOptionValue(this.field()));

  buttonConfig() {
    return this.field().buttonConfig;
  }

  buttonPosition(): 'left' | 'right' {
    return resolveButtonPosition(this.field());
  }

  isFieldDisabled(): boolean {
    const control = this.form().get(this.field().key);
    return control?.disabled ?? false;
  }

  isButtonDisabled(): boolean {
    return isFieldButtonDisabled(this.form(), this.field());
  }

  onButtonClick(): void {
    invokeFieldButtonCallback(this.form(), this.field());
  }
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';

import { iFieldOption, iFormConfig } from '../interfaces/form-config.interface';

@Component({
  selector: 'vp-select-field',
  standalone: true,
  imports: [ReactiveFormsModule, IftaLabelModule, SelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()">
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
      p-select {
        width: 100%;
      }
    `,
  ],
})
export class SelectFieldComponent {
  form = input.required<FormGroup>();
  field = input.required<iFormConfig>();

  /**
   * Aplica optionMapper se existir, caso contrário retorna as opções originais.
   * Prioridade: optionMapper > optionLabel/optionValue > label/value padrão
   */
  mappedOptions = computed(() => {
    const options = this.field().options ?? [];
    const mapper = this.field().optionMapper;

    if (mapper) {
      return options.map(mapper);
    }
    return options;
  });

  /**
   * Determina o optionLabel efetivo a ser usado.
   * Se optionMapper estiver definido, usa 'label' (pois mapper já transformou).
   * Caso contrário, usa optionLabel configurado ou 'label' como padrão.
   */
  effectiveOptionLabel = computed(() => {
    if (this.field().optionMapper) {
      return 'label';
    }
    return this.field().optionLabel ?? 'label';
  });

  /**
   * Determina o optionValue efetivo a ser usado.
   * Se optionMapper estiver definido, usa 'value' (pois mapper já transformou).
   * Caso contrário, usa optionValue configurado ou 'value' como padrão.
   */
  effectiveOptionValue = computed(() => {
    if (this.field().optionMapper) {
      return 'value';
    }
    return this.field().optionValue ?? 'value';
  });
}

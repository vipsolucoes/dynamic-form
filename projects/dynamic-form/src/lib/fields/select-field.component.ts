import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';

import { iFormConfig } from '../interfaces/form-config.interface';

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
          [options]="field().options!"
          [placeholder]="field().placeholder || 'Selecione'"
          [disabled]="field().disabled ?? false"
          optionLabel="label"
          optionValue="value"
          class="w-full" />
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
}

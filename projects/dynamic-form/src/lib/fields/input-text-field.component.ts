import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

import { iFormConfig } from '../interfaces/form-config.interface';

@Component({
  selector: 'vp-input-text-field',
  standalone: true,
  imports: [ReactiveFormsModule, IftaLabelModule, InputTextModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()">
      <p-iftalabel>
        <input pInputText [id]="field().key" [type]="field().controlType" [formControlName]="field().key" [placeholder]="field().placeholder || ''" />
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
      input {
        width: 100%;
      }
    `,
  ],
})
export class InputTextFieldComponent {
  form = input.required<FormGroup>();
  field = input.required<iFormConfig>();
}

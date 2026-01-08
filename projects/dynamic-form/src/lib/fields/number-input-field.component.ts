import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
        <p-inputNumber [id]="field().key" [formControlName]="field().key" [placeholder]="field().placeholder || ''" styleClass="w-full" class="w-full" />
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
}

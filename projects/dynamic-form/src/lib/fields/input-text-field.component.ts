import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

import { iFormConfig } from '../interfaces/form-config.interface';
import { TextTransformDirective } from '../directives/text-transform.directive';

@Component({
  selector: 'vp-input-text-field',
  standalone: true,
  imports: [ReactiveFormsModule, IftaLabelModule, InputTextModule, TextTransformDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()">
      <p-iftalabel>
        <input
          pInputText
          [id]="field().key"
          [type]="field().controlType"
          [formControlName]="field().key"
          [placeholder]="field().placeholder || ''"
          [vpTextTransform]="field().textTransform || null"
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

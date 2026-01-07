import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';

import { iFormConfig } from '../interfaces/form-config.interface';

@Component({
  selector: 'vp-password-field',
  standalone: true,
  imports: [ReactiveFormsModule, IftaLabelModule, PasswordModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()">
      <p-iftalabel>
        <p-password
          [id]="field().key"
          [formControlName]="field().key"
          [feedback]="false"
          [toggleMask]="true"
          [placeholder]="field().placeholder || ''"
          [disabled]="field().disabled ?? false"
          styleClass="w-full"
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
      :host ::ng-deep .p-password,
      :host ::ng-deep .p-password input {
        width: 100%;
      }
    `,
  ],
})
export class PasswordFieldComponent {
  form = input.required<FormGroup>();
  field = input.required<iFormConfig>();
}

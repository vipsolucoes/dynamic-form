import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';

import { iFormConfig } from '../interfaces/form-config.interface';
import { TextTransformDirective } from '../directives/text-transform.directive';

@Component({
  selector: 'vp-textarea-field',
  standalone: true,
  imports: [ReactiveFormsModule, IftaLabelModule, TextareaModule, TextTransformDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()">
      <p-iftalabel>
        <textarea
          pTextarea
          [id]="field().key"
          [formControlName]="field().key"
          [placeholder]="field().placeholder || ''"
          [rows]="field().textareaRows ?? 1"
          [cols]="field().textareaCols"
          [autoResize]="field().textareaAutoResize ?? false"
          [vpTextTransform]="field().textTransform || null"
        ></textarea>
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
      textarea {
        width: 100%;
      }
    `,
  ],
})
export class TextareaFieldComponent {
  form = input.required<FormGroup>();
  field = input.required<iFormConfig>();
}

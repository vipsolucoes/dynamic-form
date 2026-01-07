import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabelModule } from 'primeng/iftalabel';

import { iFormConfig } from '../interfaces/form-config.interface';

@Component({
  selector: 'vp-datepicker-field',
  standalone: true,
  imports: [ReactiveFormsModule, IftaLabelModule, DatePickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()">
      <p-iftalabel>
        <p-datepicker
          [inputId]="field().key"
          [formControlName]="field().key"
          [showButtonBar]="true"
          [iconDisplay]="'input'"
          [placeholder]="field().placeholder || ''"
          [dateFormat]="dateFormat()"
          [view]="field().dateViewType || 'date'"
          [disabled]="field().disabled ?? false" />
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
      p-datepicker {
        width: 100%;
      }
    `,
  ],
})
export class DatePickerFieldComponent {
  form = input.required<FormGroup>();
  field = input.required<iFormConfig>();

  readonly dateFormat = computed(() => {
    const viewType = this.field().dateViewType || 'date';
    const customFormat = this.field().dateFormat;

    if (viewType === 'month') {
      return 'mm/yy';
    }
    if (viewType === 'year') {
      return 'yy';
    }

    return customFormat || 'dd/mm/yyyy';
  });
}

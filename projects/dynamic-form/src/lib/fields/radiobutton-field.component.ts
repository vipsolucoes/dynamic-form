import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

import { iFormConfig } from '../interfaces/form-config.interface';

@Component({
  selector: 'vp-radiobutton-field',
  standalone: true,
  imports: [ReactiveFormsModule, RadioButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()" class="radiobutton-field">
      @if (field().label) {
      <label class="radiobutton-group-label">{{ field().label }}</label>
      }
      <div
        class="radiobutton-options"
        [class.radiobutton-options-horizontal]="layout() === 'horizontal'"
        [class.radiobutton-options-vertical]="layout() === 'vertical'"
      >
        @for (option of field().options; track option.value) {
        <div class="radiobutton-option">
          <p-radiobutton
            [formControlName]="field().key"
            [name]="field().key"
            [value]="option.value"
            [inputId]="getInputId(option.value)"
            [invalid]="isInvalid()"
          />
          <label [for]="getInputId(option.value)" class="radiobutton-option-label">
            {{ option.label }}
          </label>
        </div>
        }
      </div>
      @if (field().hint) {
      <small class="radiobutton-hint">{{ field().hint }}</small>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      .radiobutton-field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
      }
      .radiobutton-group-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--p-text-color, #333);
        margin-bottom: 0.25rem;
      }
      .radiobutton-options {
        display: flex;
        width: 100%;
      }
      .radiobutton-options-horizontal {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .radiobutton-options-vertical {
        flex-direction: column;
        gap: 0.75rem;
      }
      .radiobutton-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .radiobutton-option-label {
        cursor: pointer;
        user-select: none;
        font-size: 0.875rem;
        color: var(--p-text-color, #333);
        margin: 0;
      }
      .radiobutton-hint {
        display: block;
        font-size: 0.75rem;
        color: var(--p-text-muted-color, #666);
        margin-top: 0.25rem;
      }
    `,
  ],
})
export class RadioButtonFieldComponent {
  form = input.required<FormGroup>();
  field = input.required<iFormConfig>();

  layout = computed(() => {
    return this.field().radioLayout ?? 'vertical';
  });

  isInvalid = computed(() => {
    const control = this.form().get(this.field().key);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  });

  getInputId(value: any): string {
    return `${this.field().key}-${String(value).replace(/\s+/g, '-').toLowerCase()}`;
  }
}

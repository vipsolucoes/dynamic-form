import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { iFormConfig } from '../interfaces/form-config.interface';

@Component({
  selector: 'vp-toggleswitch-field',
  standalone: true,
  imports: [ReactiveFormsModule, ToggleSwitchModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()" class="toggleswitch-field">
      <p-toggleswitch
        [formControlName]="field().key"
        [inputId]="field().key"
        [invalid]="isInvalid()"
        [trueValue]="field().toggleTrueValue ?? true"
        [falseValue]="field().toggleFalseValue ?? false" />
      <label [for]="field().key" class="toggleswitch-label">{{ field().label }}</label>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      .toggleswitch-field {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
      }
      .toggleswitch-label {
        cursor: pointer;
        user-select: none;
        font-size: 0.875rem;
        color: var(--p-text-color, #333);
        margin: 0;
      }
      p-toggleswitch {
        flex-shrink: 0;
      }
    `,
  ],
})
export class ToggleSwitchFieldComponent {
  form = input.required<FormGroup>();
  field = input.required<iFormConfig>();

  isInvalid = computed(() => {
    const control = this.form().get(this.field().key);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  });
}

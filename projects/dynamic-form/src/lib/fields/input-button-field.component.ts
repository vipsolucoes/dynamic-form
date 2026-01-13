import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { iFormConfig } from '../interfaces/form-config.interface';

@Component({
  selector: 'vp-input-button-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    TooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="form()">
      <p-inputgroup>
        @if (buttonPosition() === 'left') {
        <p-button
          type="button"
          [icon]="buttonConfig()?.icon || ''"
          [label]="buttonConfig()?.label || ''"
          [severity]="buttonConfig()?.severity || 'primary'"
          [pTooltip]="buttonConfig()?.tooltip || ''"
          tooltipPosition="top"
          (click)="onButtonClick()"
          [disabled]="isFieldDisabled()"
        />
        }

        <p-iftalabel>
          <input
            pInputText
            [id]="field().key"
            [formControlName]="field().key"
            [placeholder]="field().placeholder || ''"
          />
          <label [for]="field().key">{{ field().label }}</label>
        </p-iftalabel>

        @if (buttonPosition() === 'right') {
        <p-button
          type="button"
          [icon]="buttonConfig()?.icon || ''"
          [label]="buttonConfig()?.label || ''"
          [severity]="buttonConfig()?.severity || 'primary'"
          [pTooltip]="buttonConfig()?.tooltip || ''"
          tooltipPosition="top"
          (click)="onButtonClick()"
          [disabled]="isFieldDisabled()"
        />
        }
      </p-inputgroup>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      p-inputgroup {
        display: flex;
        width: 100%;
      }
      p-iftalabel {
        flex: 1;
      }
    `,
  ],
})
export class InputButtonFieldComponent {
  form = input.required<FormGroup>();
  field = input.required<iFormConfig>();

  buttonConfig() {
    return this.field().buttonConfig;
  }

  buttonPosition(): 'left' | 'right' {
    return this.buttonConfig()?.position || 'right';
  }

  isFieldDisabled(): boolean {
    const control = this.form().get(this.field().key);
    return control?.disabled ?? false;
  }

  onButtonClick(): void {
    const control = this.form().get(this.field().key);
    const value = control?.value;
    const callback = this.field().buttonCallback;

    if (callback) {
      callback(this.field().key, value);
    }
  }
}

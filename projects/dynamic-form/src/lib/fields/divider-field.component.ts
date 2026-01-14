import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DividerModule } from 'primeng/divider';

import { iFormConfig } from '../interfaces/form-config.interface';

@Component({
  selector: 'vp-divider-field',
  standalone: true,
  imports: [DividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-divider
      [layout]="dividerConfig()?.layout || 'horizontal'"
      [type]="dividerConfig()?.type || 'solid'"
      [align]="dividerConfig()?.align"
      [styleClass]="field().styleClass || ''"
    >
      @if (dividerConfig()?.content) {
      <b>{{ dividerConfig()?.content }}</b>
      }
    </p-divider>
  `,
})
export class DividerFieldComponent {
  form = input<FormGroup>();
  field = input.required<iFormConfig>();

  /**
   * Retorna a configuração do divider do campo.
   * Se não existir, retorna undefined para usar os defaults do PrimeNG.
   */
  dividerConfig() {
    return this.field().dividerConfig;
  }
}

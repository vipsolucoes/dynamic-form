import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DynamicFormErrorComponent } from '../form-field-error/form-field-error.component';
import { DatePickerFieldComponent } from '../../fields/datepicker-field.component';
import { InputTextFieldComponent } from '../../fields/input-text-field.component';
import { InputButtonFieldComponent } from '../../fields/input-button-field.component';
import { NumberInputFieldComponent } from '../../fields/number-input-field.component';
import { PasswordFieldComponent } from '../../fields/password-field.component';
import { SelectFieldComponent } from '../../fields/select-field.component';
import { TextareaFieldComponent } from '../../fields/textarea-field.component';
import { ToggleSwitchFieldComponent } from '../../fields/toggleswitch-field.component';
import { iFormConfig } from '../../interfaces/form-config.interface';
import { FieldRegistryService } from '../../services/field-registry.service';

@Component({
  selector: 'vp-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgComponentOutlet, DynamicFormErrorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly fieldRegistry = inject(FieldRegistryService);

  config = input.required<iFormConfig[]>();
  formReady = output<FormGroup>();

  form = new FormGroup({});

  readonly fieldComponents: { [key: string]: Type<any> } = {
    text: InputTextFieldComponent,
    email: InputTextFieldComponent,
    password: PasswordFieldComponent,
    number: NumberInputFieldComponent,
    select: SelectFieldComponent,
    datepicker: DatePickerFieldComponent,
    textarea: TextareaFieldComponent,
    toggleswitch: ToggleSwitchFieldComponent,
    'input-button': InputButtonFieldComponent,
  };

  ngOnInit(): void {
    const configValue = this.config();
    if (configValue && configValue.length > 0) {
      this.buildForm(configValue);
      this.setupFieldDependencies(configValue);
      this.formReady.emit(this.form);
    }
  }

  private buildForm(config: iFormConfig[]): void {
    config.forEach((field) => {
      // Para toggle switch, o valor padrão é false se não especificado
      const defaultValue = field.controlType === 'toggleswitch' ? (field.value ?? false) : (field.value ?? '');

      // Se o campo tem enabledWhen, ele deve começar desabilitado a menos que o toggle já esteja ativo
      const shouldBeDisabled = field.disabled ?? (field.enabledWhen ? !this.getToggleValue(field.enabledWhen, config) : false);

      const control = shouldBeDisabled
        ? new FormControl(
            { value: defaultValue, disabled: true },
            {
              validators: field.validators ?? [],
            }
          )
        : new FormControl(defaultValue, {
            validators: field.validators ?? [],
          });
      this.form.addControl(field.key, control);
    });
  }

  private setupFieldDependencies(config: iFormConfig[]): void {
    config.forEach((field) => {
      if (!field.enabledWhen) {
        return;
      }

      const toggleField = config.find((f) => f.key === field.enabledWhen);

      if (!toggleField) {
        console.warn(
          `DynamicFormComponent: Campo '${field.key}' referencia '${field.enabledWhen}' em enabledWhen, mas este campo não existe no formulário.`
        );
        return;
      }

      if (toggleField.controlType !== 'toggleswitch') {
        console.warn(
          `DynamicFormComponent: Campo '${field.key}' referencia '${field.enabledWhen}' em enabledWhen, mas este campo não é do tipo 'toggleswitch'.`
        );
        return;
      }

      const toggleControl = this.form.get(field.enabledWhen);
      const dependentControl = this.form.get(field.key);

      if (!toggleControl || !dependentControl) {
        console.warn(
          `DynamicFormComponent: Não foi possível encontrar os controles para configurar a dependência entre '${field.enabledWhen}' e '${field.key}'.`
        );
        return;
      }

      // Configura a subscription para reagir às mudanças do toggle
      toggleControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((toggleValue) => {
        const isToggleActive = toggleValue === (toggleField.toggleTrueValue ?? true);

        if (isToggleActive) {
          dependentControl.enable();
        } else {
          // Limpa o valor do campo antes de desabilitá-lo
          const resetValue = this.getResetValueForFieldType(field.controlType);
          dependentControl.setValue(resetValue, { emitEvent: false });
          dependentControl.disable();
        }
      });
    });
  }

  private getToggleValue(toggleKey: string, config: iFormConfig[]): boolean {
    const toggleField = config.find((f) => f.key === toggleKey);
    if (!toggleField || toggleField.controlType !== 'toggleswitch') {
      return false;
    }

    const toggleTrueValue = toggleField.toggleTrueValue ?? true;
    const toggleValue = toggleField.value ?? false;

    return toggleValue === toggleTrueValue;
  }

  /**
   * Retorna o valor padrão de reset para cada tipo de campo.
   * Usado quando um campo dependente é desabilitado e precisa ser limpo.
   */
  private getResetValueForFieldType(controlType: string): any {
    switch (controlType) {
      case 'text':
      case 'email':
      case 'password':
      case 'textarea':
      case 'input-button':
        return '';
      case 'number':
        return null;
      case 'select':
        return null;
      case 'datepicker':
        return null;
      default:
        return '';
    }
  }

  /**
   * Obtém o componente a ser renderizado para um tipo de campo.
   * Primeiro verifica no registro customizado, depois nos componentes padrão.
   */
  getFieldComponent(controlType: string): Type<any> | null {
    // Verifica primeiro no registro customizado
    const customComponent = this.fieldRegistry.getField(controlType);
    if (customComponent) {
      return customComponent;
    }

    // Fallback para componentes padrão
    return this.fieldComponents[controlType] || null;
  }

  getControl(key: string): AbstractControl {
    const control = this.form.get(key);
    if (!control) {
      console.warn(`DynamicFormComponent: Controle não encontrado para a chave: ${key}`);
    }
    return control!;
  }
}

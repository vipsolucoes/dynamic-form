import { PRIMENG_PTBR } from './lib/i18n/primeng-ptbr';
/*
 * Public API Surface of @vipsolucoes/dynamic-form
 */

// Componentes
export { DynamicFormComponent } from './lib/components/dynamic-form/dynamic-form.component';
export { DynamicFormErrorComponent } from './lib/components/form-field-error/form-field-error.component';

// Fields (para uso standalone)
export { InputTextFieldComponent } from './lib/fields/input-text-field.component';
export { InputButtonFieldComponent } from './lib/fields/input-button-field.component';
export { SelectFieldComponent } from './lib/fields/select-field.component';
export { DatePickerFieldComponent } from './lib/fields/datepicker-field.component';
export { NumberInputFieldComponent } from './lib/fields/number-input-field.component';
export { PasswordFieldComponent } from './lib/fields/password-field.component';
export { TextareaFieldComponent } from './lib/fields/textarea-field.component';
export { ToggleSwitchFieldComponent } from './lib/fields/toggleswitch-field.component';
export { DividerFieldComponent } from './lib/fields/divider-field.component';

// Interfaces
export type { iFormConfig, iFieldOption } from './lib/interfaces/form-config.interface';
export type { DynamicFormErrorMessages } from './lib/interfaces/error-messages.interface';
export { DYNAMIC_FORM_ERROR_MESSAGES } from './lib/interfaces/error-messages.interface';

// Services
export { FieldRegistryService } from './lib/services/field-registry.service';

// Directives
export { TextTransformDirective } from './lib/directives/text-transform.directive';

// Utility functions
export { PRIMENG_PTBR } from './lib/i18n/primeng-ptbr';
export { provideDynamicFormConfig } from './lib/providers/dynamic-form.providers';

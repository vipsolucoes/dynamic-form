import { iFormConfig } from '../../interfaces/form-config.interface';

/**
 * Aplica optionMapper se existir, caso contrário retorna as opções originais.
 * Prioridade: optionMapper > optionLabel/optionValue > label/value padrão
 */
export function mapSelectOptions(field: iFormConfig): unknown[] {
  const options = field.options ?? [];
  const mapper = field.optionMapper;

  if (mapper) {
    return options.map(mapper);
  }
  return options;
}

/**
 * Determina o optionLabel efetivo a ser usado.
 * Se optionMapper estiver definido, usa 'label' (pois mapper já transformou).
 * Caso contrário, usa optionLabel configurado ou 'label' como padrão.
 */
export function resolveOptionLabel(field: iFormConfig): string {
  if (field.optionMapper) {
    return 'label';
  }
  return field.optionLabel ?? 'label';
}

/**
 * Determina o optionValue efetivo a ser usado.
 * Se optionMapper estiver definido, usa 'value' (pois mapper já transformou).
 * Caso contrário, usa optionValue configurado ou 'value' como padrão.
 */
export function resolveOptionValue(field: iFormConfig): string {
  if (field.optionMapper) {
    return 'value';
  }
  return field.optionValue ?? 'value';
}

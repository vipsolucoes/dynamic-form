import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { Select } from 'primeng/select';

import { iFormConfig } from '../interfaces/form-config.interface';
import { SelectButtonFieldComponent } from './select-button-field.component';

describe('SelectButtonFieldComponent', () => {
  let fixture: ComponentFixture<SelectButtonFieldComponent>;
  let form: FormGroup;

  const baseField: iFormConfig = {
    key: 'categoria',
    label: 'Categoria',
    controlType: 'select-button',
    options: [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
    ],
    buttonConfig: { icon: 'pi pi-plus' },
  };

  function create(field: iFormConfig, control = new FormControl<any>(null)) {
    form = new FormGroup({ [field.key]: control });
    fixture = TestBed.createComponent(SelectButtonFieldComponent);
    fixture.componentRef.setInput('form', form);
    fixture.componentRef.setInput('field', field);
    fixture.detectChanges();
  }

  function selectInstance(): Select {
    return fixture.debugElement.query(By.directive(Select)).componentInstance;
  }

  function group(): HTMLElement {
    return fixture.nativeElement.querySelector('p-inputgroup');
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectButtonFieldComponent],
      providers: [providePrimeNG()],
    });
  });

  it('mapeia opções via optionMapper', () => {
    create({
      ...baseField,
      options: [{ id: 7, nome: 'Sete' }],
      optionMapper: (i: any) => ({ label: i.nome, value: i.id }),
    });

    const component = fixture.componentInstance;
    expect(component.mappedOptions()).toEqual([{ label: 'Sete', value: 7 }]);
    const select = selectInstance();
    expect(select.options).toEqual([{ label: 'Sete', value: 7 }]);
    expect(select.optionLabel).toBe('label');
    expect(select.optionValue).toBe('value');
  });

  it('repassa optionLabel/optionValue efetivos', () => {
    create({
      ...baseField,
      options: [{ id: 7, nome: 'Sete' }],
      optionLabel: 'nome',
      optionValue: 'id',
    });

    const select = selectInstance();
    expect(select.optionLabel).toBe('nome');
    expect(select.optionValue).toBe('id');
    expect(select.options).toEqual([{ id: 7, nome: 'Sete' }]);
  });

  it('posiciona o botão à direita por padrão', () => {
    create(baseField);
    expect(group().lastElementChild?.tagName.toLowerCase()).toBe('p-button');
    expect(group().firstElementChild?.tagName.toLowerCase()).toBe('p-iftalabel');
  });

  it('posiciona o botão à esquerda com position left', () => {
    create({ ...baseField, buttonConfig: { icon: 'pi pi-plus', position: 'left' } });
    expect(group().firstElementChild?.tagName.toLowerCase()).toBe('p-button');
    expect(group().lastElementChild?.tagName.toLowerCase()).toBe('p-iftalabel');
  });

  it('chama buttonCallback com key e valor selecionado', () => {
    const callback = vi.fn();
    create({ ...baseField, buttonCallback: callback }, new FormControl<any>(2));

    fixture.componentInstance.onButtonClick();
    expect(callback).toHaveBeenCalledWith('categoria', 2);
  });

  it('chama buttonCallback com null quando não há seleção', () => {
    const callback = vi.fn();
    create({ ...baseField, buttonCallback: callback });

    fixture.nativeElement.querySelector('p-button button').click();
    expect(callback).toHaveBeenCalledWith('categoria', null);
  });

  it('desabilita o botão quando o control está desabilitado e buttonEnabled indefinido', () => {
    create(baseField, new FormControl<any>({ value: null, disabled: true }));
    expect(fixture.componentInstance.isButtonDisabled()).toBe(true);
  });

  it('mantém o botão habilitado com buttonEnabled true mesmo com control desabilitado', () => {
    create(
      { ...baseField, buttonConfig: { icon: 'pi pi-plus', buttonEnabled: true } },
      new FormControl<any>({ value: null, disabled: true })
    );
    expect(fixture.componentInstance.isButtonDisabled()).toBe(false);
  });

  it('desabilita o botão com buttonEnabled false mesmo com control habilitado', () => {
    create({ ...baseField, buttonConfig: { icon: 'pi pi-plus', buttonEnabled: false } });
    expect(fixture.componentInstance.isButtonDisabled()).toBe(true);
  });

  it('reflete novas options no select preservando o valor do control', () => {
    const control = new FormControl<any>(2);
    create(baseField, control);

    const novas = [...(baseField.options as any[]), { label: 'C', value: 3 }];
    fixture.componentRef.setInput('field', { ...baseField, options: novas });
    fixture.detectChanges();

    expect(selectInstance().options).toEqual(novas);
    expect(control.value).toBe(2);
  });

  it('repassa optionAppendTo ao appendTo do Select', () => {
    create({ ...baseField, optionAppendTo: 'body' });
    expect(selectInstance().appendTo()).toBe('body');
  });
});

import { Directive, ElementRef, HostListener, inject, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Diretiva para transformar texto em uppercase ou lowercase em tempo real.
 * Funciona com Reactive Forms (NgControl) e elementos HTML nativos.
 *
 * @example
 * ```html
 * <!-- Uppercase -->
 * <input [vpTextTransform]="'uppercase'" />
 *
 * <!-- Lowercase -->
 * <input [vpTextTransform]="'lowercase'" />
 *
 * <!-- Desabilitado -->
 * <input [vpTextTransform]="null" />
 * ```
 */
@Directive({
  selector: '[vpTextTransform]',
  standalone: true,
})
export class TextTransformDirective implements OnInit {
  private readonly elementRef = inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>);

  /**
   * NgControl opcional - presente quando usado com reactive forms ou ngModel.
   * Usamos `optional: true` e `self: true` para injetar apenas se estiver no mesmo elemento.
   */
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  /**
   * Tipo de transformação a ser aplicada: 'uppercase' | 'lowercase' | null
   * Quando null ou undefined, a transformação é desabilitada.
   */
  @Input() vpTextTransform: 'uppercase' | 'lowercase' | null = null;

  ngOnInit(): void {
    // Aplicar transformação no valor inicial se existir
    const element = this.elementRef.nativeElement;
    const transform = this.vpTextTransform;

    if (transform && element.value && typeof element.value === 'string') {
      const transformedValue = this.transformValue(element.value, transform);
      if (transformedValue !== element.value) {
        element.value = transformedValue;

        // Atualizar o FormControl se existir
        if (this.ngControl?.control) {
          this.ngControl.control.setValue(transformedValue, { emitEvent: false });
        }
      }
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement;
    const transform = this.vpTextTransform;

    // Verifica se a transformação está habilitada
    if (!transform || !inputElement.value) {
      return;
    }

    const currentValue = inputElement.value;
    if (typeof currentValue !== 'string') {
      return;
    }

    // Preserva a posição do cursor
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;

    // Aplica a transformação
    const transformedValue = this.transformValue(currentValue, transform);

    // Se o valor já está transformado, não faz nada
    if (currentValue === transformedValue) {
      return;
    }

    // Atualiza o valor do elemento
    inputElement.value = transformedValue;

    // Restaura a posição do cursor (apenas para inputs de texto)
    if (this.isTextInput(inputElement)) {
      const newStart = Math.min(start ?? 0, transformedValue.length);
      const newEnd = Math.min(end ?? 0, transformedValue.length);
      inputElement.setSelectionRange(newStart, newEnd);
    }

    // Se NgControl estiver presente (reactive forms ou ngModel), atualiza através dele
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(transformedValue, { emitEvent: false });
      // Emite o evento manualmente para garantir que os listeners sejam notificados
      this.ngControl.control.updateValueAndValidity({ emitEvent: true });
    } else {
      // Para elementos sem NgControl, dispara evento input manualmente
      // Isso garante compatibilidade com listeners diretos no elemento
      const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true,
      });
      inputElement.dispatchEvent(inputEvent);
    }
  }

  /**
   * Aplica a transformação de texto baseada no tipo especificado.
   */
  private transformValue(value: string, transform: 'uppercase' | 'lowercase'): string {
    return transform === 'uppercase' ? value.toUpperCase() : value.toLowerCase();
  }

  /**
   * Verifica se o elemento é um input de texto que suporta seleção de cursor.
   */
  private isTextInput(element: HTMLInputElement | HTMLTextAreaElement): boolean {
    if (element.tagName === 'TEXTAREA') {
      return true;
    }

    const inputElement = element as HTMLInputElement;
    return (
      inputElement.type === 'text' ||
      inputElement.type === 'search' ||
      inputElement.type === 'email' ||
      inputElement.type === 'url' ||
      inputElement.type === 'tel' ||
      !inputElement.type // type padrão é 'text'
    );
  }
}

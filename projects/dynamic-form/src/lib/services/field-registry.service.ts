import { Injectable, signal, Type } from '@angular/core';

/**
 * Serviço para registro de campos customizados.
 * Permite adicionar novos tipos de campos dinamicamente.
 */
@Injectable({ providedIn: 'root' })
export class FieldRegistryService {
  private readonly registry = signal<Map<string, Type<any>>>(new Map());

  /**
   * Registra um novo tipo de campo.
   * @param type Tipo do campo (ex: 'custom', 'file', etc.)
   * @param component Componente Angular que renderiza o campo
   */
  registerField(type: string, component: Type<any>): void {
    this.registry.update((map) => new Map(map).set(type, component));
  }

  /**
   * Obtém o componente registrado para um tipo de campo.
   * @param type Tipo do campo
   * @returns Componente Angular ou undefined se não encontrado
   */
  getField(type: string): Type<any> | undefined {
    return this.registry().get(type);
  }

  /**
   * Remove um tipo de campo do registro.
   * @param type Tipo do campo a ser removido
   */
  unregisterField(type: string): void {
    this.registry.update((map) => {
      const newMap = new Map(map);
      newMap.delete(type);
      return newMap;
    });
  }

  /**
   * Limpa todos os campos registrados.
   */
  clear(): void {
    this.registry.set(new Map());
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { iFieldOption } from '@vipsolucoes/dynamic-form';

export interface Estado {
  label: string;
  value: string;
}

export interface CidadeIBGE {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: {
        id: number;
        sigla: string;
        nome: string;
        regiao: {
          id: number;
          sigla: string;
          nome: string;
        };
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class EstadoCidadeService {
  private readonly http = inject(HttpClient);

  /**
   * Carrega a lista de estados do arquivo JSON.
   * @returns Observable com array de estados no formato iFieldOption
   */
  loadEstados(): Observable<iFieldOption[]> {
    return this.http.get<Estado[]>('assets/estados.json');
  }

  /**
   * Busca as cidades de um estado específico via API do IBGE.
   * @param uf Sigla do estado (ex: 'SP', 'RJ')
   * @returns Observable com array de cidades no formato iFieldOption
   */
  loadCidadesByEstado(uf: string): Observable<iFieldOption[]> {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;
    return this.http.get<CidadeIBGE[]>(url).pipe(
      map((cidades) =>
        cidades.map((cidade) => ({
          label: cidade.nome,
          value: cidade.nome,
        }))
      )
    );
  }
}

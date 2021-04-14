import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

interface IUpdateCliente {
  cliente_id: number;
  inscricao: string;
  nome: string;
  apelido: string;
}

interface IAddEmail {
  cliente_id: number;
  categoria: string;
  nome: string;
  email: string;
}

export interface ILoadClientesPage {
  page: number;
  pageSize: number;
  sortAtive: string;
  sorteDirection: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    @Inject(HttpClient) private httpClient: HttpClient,
  ) { }

  public getClientes({ page, pageSize, sortAtive, sorteDirection }: ILoadClientesPage): Observable<any> {
    return this.httpClient.get(
      `http://localhost:8080/clientes?page=${page}&size=${pageSize}&sort=${sortAtive},${sorteDirection}`)
      .pipe(
        retry(3),
      );
  }

  public getClienteById(clienteId: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/clientes/${clienteId}`)
      .pipe(
        retry(3),
      );
  }

  public updateCliente(data: IUpdateCliente): Observable<any> {
    return this.httpClient.put(`http://localhost:8080/clientes`, data)
      .pipe(
        retry(3),
      );
  }

  public deleteCliente(clienteId: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:8080/clientes/${clienteId}`)
      .pipe(
        retry(3),
      );
  }

  public addEmail(data: IAddEmail): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/clientes/emails`, data)
      .pipe(
        retry(3),
      );
  }

  public removeEmail(clienteId: number, emailId: number): Observable<any> {
    return this.httpClient.delete(
      `http://localhost:8080/clientes/${clienteId}/emails/${emailId}`
    )
      .pipe(
        retry(3),
      );
  }
}


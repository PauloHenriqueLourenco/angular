import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PageDataSource } from '../page.data-source';
import { ClientesService, ILoadClientesPage } from './clientes.service';

export interface IEmail {
  id: number;
  categoria: string;
  nome: string;
  email: string;
}

export interface ICliente {
  id: number;
  inscricao: string;
  nome: string;
  apelido: string;
  status: string;
  foto: string;
  emails: IEmail[];
}

export interface IClienteApi {
  content: ICliente[];
  totalElements: number;
}

export class ClientesDataSource
  extends PageDataSource<ICliente[]>
  implements DataSource<ICliente> {
  constructor(
    @Inject(ClientesService)
    private clientesService: ClientesService,
  ) {
    super();
  }

  public connect(
    collectionViewer: CollectionViewer,
  ): Observable<ICliente[]> {
    return this.dataSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void { }

  public load(data: ILoadClientesPage): Observable<IClienteApi> {
    console.log(data);
    this.setLoadingSubject(true);

    const clientesObservable = this.clientesService
      .getClientes(data)
      .pipe(finalize(() => this.setLoadingSubject(false)));

    clientesObservable.subscribe(data => data);

    return clientesObservable;
  }
}

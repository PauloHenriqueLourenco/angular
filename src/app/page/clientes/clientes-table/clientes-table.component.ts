import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

import { ClientesDataSource, ICliente } from '../clientes.data-source'
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes-table',
  templateUrl: './clientes-table.component.html',
  styleUrls: ['./clientes-table.component.scss']
})
export class ClientesTableComponent implements AfterViewInit {
  @Input('app-data-source')
  public dataSource: ClientesDataSource;

  filteredAndPagedClientes: Observable<ICliente[]>;

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public faEdit = faEdit;

  displayedColumns: string[] = ['inscricao', 'nome', 'apelido', 'status', 'acao'];

  constructor(
    @Inject(ClientesService) private clientesService: ClientesService
  ) {
    this.dataSource = new ClientesDataSource(
      this.clientesService,
    )
  }

  ngAfterViewInit() {
    this.filteredAndPagedClientes = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataSource!.load({
            page: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            sortAtive: this.sort.active,
            sorteDirection: this.sort.direction,
          });
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.totalElements;

          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;

          return observableOf([]);
        })
      );
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

}

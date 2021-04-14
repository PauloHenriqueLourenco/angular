import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ClientesDataSource } from './clientes.data-source';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public clientesDataSource: ClientesDataSource;

  constructor(
    @Inject(ClientesService) private clientesService: ClientesService,
  ) {
    this.clientesDataSource = new ClientesDataSource(
      this.clientesService,
    )
  }

  ngOnInit(): void {
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClientesTableModule } from './clientes-table/clientes-table.module';

import { ClientesComponent } from './clientes.component';

const appModules = [ClientesTableModule];

@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    ...appModules,
    RouterModule.forChild([
      {
        path: '',
        component: ClientesComponent,
      },
    ],
    ),
  ]
})
export class ClientesModule { }

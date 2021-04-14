import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSortModule } from '@angular/material/sort'
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { ClientesTableComponent } from './clientes-table.component';

const matModules = [MatIconModule, MatPaginatorModule, MatTableModule, MatProgressSpinnerModule, MatSortModule];

@NgModule({
  declarations: [
    ClientesTableComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    ...matModules,
  ],
  exports: [ClientesTableComponent]
})
export class ClientesTableModule { }

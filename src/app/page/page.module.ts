import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PageComponent } from './page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageComponent,
        children: [
          {
            path: 'clientes',
            loadChildren: () =>
              import('./clientes/clientes.module').then(m => m.ClientesModule),
          },
          {
            path: 'clientes/:clienteId',
            loadChildren: () =>
              import('./clientes/edit-cliente/edit-cliente.module').then(m => m.EditClienteModule),
          },
          {
            path: '',
            redirectTo: 'clientes',
            pathMatch: 'full',
          }
        ],
      },
    ]),
  ]
})
export class PageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'

import { EditClienteComponent } from './edit-cliente.component';
import { RouterModule } from '@angular/router';

const matModules = [MatButtonModule, MatIconModule, MatInputModule, MatTableModule];

@NgModule({
  declarations: [
    EditClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...matModules,
    RouterModule.forChild([
      { path: '', component: EditClienteComponent }
    ])
  ]
})
export class EditClienteModule { }

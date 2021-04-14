import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { ClientesService } from '../clientes.service';

import { ICliente, IEmail } from '../clientes.data-source'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {
  displayedColumns: string[] = ['categoria', 'nome', 'email', 'acao'];
  emailDataSource = new MatTableDataSource<IEmail>();

  clienteId: number;
  cliente: ICliente;

  form = new FormGroup({
    inscricao: new FormControl('', [
      Validators.required,
    ]),
    nome: new FormControl('', [
      Validators.required,
    ]),
    apelido: new FormControl('', [
      Validators.required,
    ]),
    status: new FormControl(''),
  });

  categoriaFormControl = new FormControl('', [
    Validators.required,
  ]);
  nomeFormControl = new FormControl('', [
    Validators.required,
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientesService: ClientesService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.clienteId = Number(routeParams.get('clienteId'));

    this.refresh();
  }

  refresh(): void {
    this.clientesService.getClienteById(this.clienteId)
      .pipe(first())
      .subscribe(cliente => {
        this.cliente = cliente;
        this.form.patchValue(cliente);
        this.emailDataSource.data = cliente.emails;
        this.changeDetectorRefs.detectChanges();
      });
  }

  public updateCliente() {
    if (!this.form.valid) {
      return;
    }

    this.clientesService.updateCliente({
      cliente_id: this.clienteId,
      inscricao: this.form.value.inscricao,
      nome: this.form.value.nome,
      apelido: this.form.value.apelido
    }).pipe(first())
      .subscribe((data) => {
        this.refresh();
      });
  }

  public deleteCliente() {
    this.clientesService.deleteCliente(this.clienteId)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['clientes']);
      });
  }

  public addEmail() {
    const categoria = this.categoriaFormControl.value;
    const nome = this.nomeFormControl.value;
    const email = this.emailFormControl.value;

    if (!this.categoriaFormControl.valid
      || !this.nomeFormControl.valid
      || !this.emailFormControl.valid) {
      return;
    }

    this.clientesService.addEmail({
      cliente_id: this.clienteId,
      categoria,
      nome,
      email,
    })
      .pipe(first())
      .subscribe(() => {
        this.refresh();
      });

    this.categoriaFormControl.reset();
    this.nomeFormControl.reset();
    this.emailFormControl.reset();
  }

  public removeEmail(emailId: number) {
    this.clientesService.removeEmail(this.clienteId, emailId)
      .pipe(first())
      .subscribe(() => {
        this.refresh();
      });
  }
}

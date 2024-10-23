import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { generarIdRandom } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../../../../core/models/curso';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ClasesService } from '../../../../core/services/clases.service';
import { Observable } from 'rxjs';
import { Clase } from '../../../../core/models/clase';

interface cursoDialogData {
  cursoModificado?: Curso
}

@Component({
  selector: 'app-crear-editar-cursos',
  templateUrl: './crear-editar-cursos.component.html',
  styleUrl: './crear-editar-cursos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class CrearEditarCursosComponent {
  public cursoForm: FormGroup;
  public clases$: Observable<Clase[]>;

  constructor(
    private matDialogRef: MatDialogRef<CrearEditarCursosComponent>, 
    private formBuilder: FormBuilder,
    private clasesService: ClasesService,
    @Inject(MAT_DIALOG_DATA) public data?: cursoDialogData) {
    this.cursoForm = this.formBuilder.group({
      nombre: [null],
      fechaInicio: [null],
      dificultad: [null],
      descripcion: [null],
      idClase: [null]
    });

    this.clases$ = this.clasesService.getAll();
    this.patchFormValue();
  }

  private get esModificar() {
    return !!this.data?.cursoModificado;
  }

  patchFormValue() {
    if(this.data?.cursoModificado){
      this.cursoForm.patchValue(this.data.cursoModificado);
    }
  }

  onSave(): void {
    if (this.cursoForm.invalid){
      this.cursoForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.cursoForm.value,
        id: this.esModificar ? this.data!.cursoModificado!.id : generarIdRandom()
      });
    }
  }
}

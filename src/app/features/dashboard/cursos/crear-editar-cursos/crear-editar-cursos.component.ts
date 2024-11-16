import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { generarIdRandom } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../../../../core/models/curso';
import { provideNativeDateAdapter } from '@angular/material/core';

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

  constructor(
    private matDialogRef: MatDialogRef<CrearEditarCursosComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: cursoDialogData) {
    this.cursoForm = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(4)]],
      fechaInicio: [null, [Validators.required]],
      dificultad: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(4)]],
      descripcion: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
    });

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

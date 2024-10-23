import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { generarIdRandom } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripcion } from '../../../../core/models/inscripcion';
import { provideNativeDateAdapter } from '@angular/material/core';

interface cursoDialogData {
  inscripcionModificada?: Inscripcion
}


@Component({
  selector: 'app-crear-editar-inscripciones',
  templateUrl: './crear-editar-inscripciones.component.html',
  styleUrl: './crear-editar-inscripciones.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class CrearEditarInscripcionesComponent {
  public inscripcionForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<CrearEditarInscripcionesComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: cursoDialogData) {
    this.inscripcionForm = this.formBuilder.group({
      idAlumno: [null],
      idCurso: [null],
      fechaInscripcion: [null],
      estado: [null]
    });

    this.patchFormValue();
  }

  private get esModificar() {
    return !!this.data?.inscripcionModificada;
  }

  patchFormValue() {
    if(this.data?.inscripcionModificada){
      this.inscripcionForm.patchValue(this.data.inscripcionModificada);
    }
  }

  onSave(): void {
    if (this.inscripcionForm.invalid){
      this.inscripcionForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.inscripcionForm.value,
        id: this.esModificar ? this.data!.inscripcionModificada!.id : generarIdRandom()
      });
    }
  }
}

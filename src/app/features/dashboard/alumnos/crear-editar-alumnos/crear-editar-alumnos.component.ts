import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generarIdRandom, soloLetras } from '../../../../shared/utils';
import { Alumno } from '../../../../core/models/alumno';

interface alumnoDialogData {
  alumnoModificado?: Alumno
}

@Component({
  selector: 'app-crear-editar-alumnos',
  templateUrl: './crear-editar-alumnos.component.html',
  styleUrl: './crear-editar-alumnos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})

export class CrearEditarAlumnosComponent {
  public alumnoForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<CrearEditarAlumnosComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: alumnoDialogData) {
    this.alumnoForm = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(3), soloLetras()]],
      apellido: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(3), soloLetras()]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(30), Validators.minLength(15)]],
      fechaNacimiento: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(4)]]
    });

    this.patchFormValue();
  }

  private get esModificar() {
    return !!this.data?.alumnoModificado;
  }

  patchFormValue() {
    if(this.data?.alumnoModificado){
      this.alumnoForm.patchValue(this.data.alumnoModificado);
    }
  }

  onSave(): void {
    if (this.alumnoForm.invalid){
      this.alumnoForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.alumnoForm.value,
        id: this.esModificar ? this.data!.alumnoModificado!.id : generarIdRandom(),
        token: this.esModificar ? this.data!.alumnoModificado!.token : generarIdRandom()
      });
    }
  }
}

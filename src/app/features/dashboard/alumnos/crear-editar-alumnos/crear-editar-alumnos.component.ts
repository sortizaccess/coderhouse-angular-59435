import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generarIdRandom, soloLetras } from '../../../../shared/utils';
import { Alumno } from '../../../../core/models/alumno';

interface alumnoDialogData {
  modificarAlumno?: Alumno
}

@Component({
  selector: 'app-crear-editar-alumnos',
  templateUrl: './crear-editar-alumnos.component.html',
  styleUrl: './crear-editar-alumnos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})

export class CrearEditarAlumnosComponent {
  public userForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<CrearEditarAlumnosComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: alumnoDialogData) {
    this.userForm = this.formBuilder.group({
      nombre: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(3), soloLetras()]],
      apellido: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(3), soloLetras()]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(30), Validators.minLength(15)]],
      fechaNacimiento: [null, [Validators.required]],
      genero: [null, [Validators.required]]
    });

    this.patchFormValue();
  }

  private get esModificar() {
    return !!this.data?.modificarAlumno;
  }

  patchFormValue() {
    if(this.data?.modificarAlumno){
      this.userForm.patchValue(this.data.modificarAlumno);
    }
  }

  onSave(): void {
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.userForm.value,
        legajo: this.esModificar ? this.data!.modificarAlumno!.legajo : generarIdRandom()
      });
    }
  }
}

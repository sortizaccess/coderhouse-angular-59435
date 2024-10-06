import { ChangeDetectionStrategy, Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generarIdRandom } from '../../utils';
import { Alumno } from '../models/alumno';

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
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  public userForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<CrearEditarAlumnosComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: alumnoDialogData) {
    this.userForm = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
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

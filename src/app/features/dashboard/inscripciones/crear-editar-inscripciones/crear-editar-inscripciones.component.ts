import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { generarIdRandom } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripcion } from '../../../../core/models/inscripcion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CursosService } from '../../../../core/services/cursos.service';
import { Curso } from '../../../../core/models/curso';
import { Observable } from 'rxjs';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../../../../core/models/alumno';

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
  public cursos$: Observable<Curso[]>;
  public alumnos$: Observable<Alumno[]>;

  constructor(
    private matDialogRef: MatDialogRef<CrearEditarInscripcionesComponent>, 
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,

    @Inject(MAT_DIALOG_DATA) public data?: cursoDialogData) {
    this.inscripcionForm = this.formBuilder.group({
      idAlumno: [null, [Validators.required]],
      idCurso: [null, [Validators.required]],
      fechaInscripcion: [null, [Validators.required]],
      estado: [null, [Validators.required]]
    });

    this.cursos$ = this.cursosService.getAll();
    this.alumnos$ = this.alumnosService.getAll();
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

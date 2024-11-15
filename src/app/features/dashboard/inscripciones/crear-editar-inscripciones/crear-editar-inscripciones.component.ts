import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { generarIdRandom } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripcion } from '../../../../core/models/inscripcion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CursosService } from '../../../../core/services/cursos.service';
import { Curso } from '../../../../core/models/curso';
import { Observable, of } from 'rxjs';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../../../../core/models/alumno';
import { Store } from '@ngrx/store';
import { selectUsuarioAutenticado } from '../../../../store/selectors/auth.selector';
import { Usuario } from '../../../../core/models/usuario';

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

export class CrearEditarInscripcionesComponent implements OnInit {
  public inscripcionForm: FormGroup;
  public cursos$: Observable<Curso[]>;
  public alumnos$: Observable<Alumno[]> = of([]);
  public authUsuario$: Observable<Usuario | null>;
  public authUsuario: Usuario | null = null;

  constructor(
    private matDialogRef: MatDialogRef<CrearEditarInscripcionesComponent>, 
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data?: cursoDialogData
  ) {
    this.inscripcionForm = this.formBuilder.group({
      idAlumno: [null, [Validators.required]],
      idCurso: [null, [Validators.required]],
      fechaInscripcion: [null, [Validators.required]],
      estado: [null, [Validators.required]]
    });
    this.authUsuario$ = this.store.select(selectUsuarioAutenticado); 
    this.authUsuario$.subscribe(auth => { this.authUsuario = auth; });
    this.cursos$ = this.cursosService.getAll();
  }

  ngOnInit(): void {
    this.alumnosService.getAll().subscribe(alumnos => {
      this.alumnos$ = of(alumnos);
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

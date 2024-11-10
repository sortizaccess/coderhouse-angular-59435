import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { generarIdRandom } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripcion } from '../../../../core/models/inscripcion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CursosService } from '../../../../core/services/cursos.service';
import { Curso } from '../../../../core/models/curso';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../../../../core/models/alumno';
import { Store } from '@ngrx/store';
import { selectAlumnoAutenticado } from '../../../../store/selectors/auth.selector';

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
  public authAlumno$: Observable<Alumno | null>;
  public authAlumno: Alumno | null = null;

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
    this.authAlumno$ = this.store.select(selectAlumnoAutenticado); 
    this.authAlumno$.subscribe(auth => { this.authAlumno = auth; });
    this.cursos$ = this.cursosService.getAll();
  }

  ngOnInit(): void {
    this.authAlumno$.pipe(
      switchMap(authAlumno => {
        this.authAlumno = authAlumno; 
        
        if (authAlumno?.esAdmin) {
          return this.alumnosService.getAll();  
        } else if (authAlumno?.id) {
          return this.alumnosService.get(authAlumno.id).pipe(
            map(alumno => alumno ? [alumno] : [])  
          );
        }
        return of([]);  
      }),
      filter(alumnos => alumnos !== undefined)  
    ).subscribe(alumnos => {
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

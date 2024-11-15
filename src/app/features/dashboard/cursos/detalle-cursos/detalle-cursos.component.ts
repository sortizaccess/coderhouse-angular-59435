import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../../../../core/models/curso';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { CursosService } from '../../../../core/services/cursos.service';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { Inscripcion } from '../../../../core/models/inscripcion';
import { Alumno } from '../../../../core/models/alumno';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { forkJoin, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAlumnoAutenticado } from '../../../../store/selectors/auth.selector';

@Component({
  selector: 'app-detalle-cursos',
  templateUrl: './detalle-cursos.component.html',
  styleUrl: './detalle-cursos.component.css'
})
export class DetalleCursosComponent implements OnInit {
  idCurso?: string;
  curso?: Curso;
  inscripciones: Inscripcion[] = [];
  alumnos: Alumno[] = [];
  authAlumno$: Observable<Alumno | null>;
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'email', 'fechaNacimiento', 'acciones'];
  dataSource: Alumno[] = [];
  @ViewChild(ToastsComponent) toast!: ToastsComponent;
  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService,
    private store: Store, 
  ) {
    this.idCurso = activatedRoute.snapshot.params['id'];
    this.authAlumno$ = this.store.select(selectAlumnoAutenticado);
  }

  ngOnInit(): void {
    if (this.idCurso) {
      this.cursosService.get(this.idCurso).subscribe({
        next: (curso) => {
          this.curso = curso;
        },
      });
      this.cargarInscripciones();
    }
  }

  cargarInscripciones(): void {
    if (this.idCurso) {
      this.inscripcionesService.getAllByCurso(this.idCurso).subscribe({
        next: (inscripciones) => {
          this.inscripciones = inscripciones;
          this.cargarAlumnos();
        },
      });
    }
  }

  cargarAlumnos(): void {
    this.alumnos = [];
    const alumnoObservables = this.inscripciones.map((inscripcion) =>
      this.alumnosService.get(inscripcion.idAlumno)
    );

    forkJoin(alumnoObservables).subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
        this.dataSource = [...this.alumnos];
      },
    });
  }

  anularInscripcion(idAlumno: string): void {
    const idInscripcion = this.inscripciones.find((inscripcion) => inscripcion.idAlumno === idAlumno)?.id;
    if (idInscripcion) {

      this.toast.confirmarToast().then((confirmed) => {
        if (confirmed) {
          this.inscripcionesService.delete(idInscripcion).subscribe({
            next: () => {
              this.inscripciones = this.inscripciones.filter((inscripcion) => inscripcion.idAlumno !== idAlumno);
              this.cargarAlumnos();
            },
          }); 
        }
      }).catch(() => {
        console.error('Error al confirmar la eliminación');
      });
    }
  }
  
}

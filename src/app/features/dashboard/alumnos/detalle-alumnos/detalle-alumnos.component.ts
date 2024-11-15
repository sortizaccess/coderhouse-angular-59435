import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../../../../core/models/alumno';
import { Curso } from '../../../../core/models/curso';
import { CursosService } from '../../../../core/services/cursos.service';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { Inscripcion } from '../../../../core/models/inscripcion';
import { forkJoin } from 'rxjs';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';

@Component({
  selector: 'app-detalle-alumnos',
  templateUrl: './detalle-alumnos.component.html',
  styleUrl: './detalle-alumnos.component.css'
})
export class DetalleAlumnosComponent implements OnInit {
  idAlumno?: string;
  alumno?: Alumno;
  inscripciones: Inscripcion[] = [];
  cursos: Curso[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  dataSource: Curso[] = [];

  @ViewChild(ToastsComponent) toast!: ToastsComponent;
  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService
  ) {
    this.idAlumno = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.idAlumno) {
      this.alumnosService.get(this.idAlumno).subscribe({
        next: (alumno) => {
          this.alumno = alumno;
        },
      });
      this.cargarInscripciones();
    }
  }

  cargarInscripciones(): void {
    if (this.idAlumno) {
      this.inscripcionesService.getAllByAlumno(this.idAlumno).subscribe({
        next: (inscripciones) => {
          this.inscripciones = inscripciones;
          this.cargarCursos();
        },
      });
    }
  }

  cargarCursos(): void {
    this.cursos = [];
    const cursoObservables = this.inscripciones.map((inscripcion) =>
      this.cursosService.get(inscripcion.idCurso)
    );

    forkJoin(cursoObservables).subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        this.dataSource = [...this.cursos];
      },
    });
  }

  anularInscripcion(idCurso: string): void {
    const idInscripcion = this.inscripciones.find((inscripcion) => inscripcion.idCurso === idCurso)?.id;
    if (idInscripcion) {
      this.toast.confirmarToast().then((confirmed) => {
        if (confirmed) {
          this.inscripcionesService.delete(idInscripcion).subscribe({
            next: () => {
              this.inscripciones = this.inscripciones.filter((inscripcion) => inscripcion.idCurso !== idCurso);
              this.cargarCursos();
            },
          }); 
        }
      }).catch(() => {
        console.error('Error al confirmar la eliminación');
      });
    }
  }
}


import { Component, OnInit, ViewChild } from '@angular/core';
import { Alumno } from '../../../../core/models/alumno';
import { MatDialog } from '@angular/material/dialog';
import { CrearEditarAlumnosComponent } from '../crear-editar-alumnos/crear-editar-alumnos.component';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AlumnoActions } from '../store/alumno.actions';
import { selectAlumnos } from '../store/alumno.selectors';
import { selectAlumnoAutenticado } from '../../../../store/selectors/auth.selector';

@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrl: './listar-alumnos.component.css'
})

export class ListarAlumnosComponent implements OnInit  {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'fechaNacimiento', 'genero', 'acciones'];
  dataSource: Alumno[] = [];

  authAlumno$: Observable<Alumno | null>;
  alumnos$: Observable<Alumno[]>;

  @ViewChild(ToastsComponent) toast!: ToastsComponent;
  constructor(private matDialog: MatDialog, private alumnosService: AlumnosService, private store: Store){
    this.authAlumno$ = this.store.select(selectAlumnoAutenticado);
    this.alumnos$ = this.store.select(selectAlumnos);
   }

  ngOnInit(): void {
    this.listarAlumnos();
  }

  //ABM ALUMNOS
  listarAlumnos(): void {
    this.store.dispatch(AlumnoActions.loadAlumnos());
  }
  eliminarAlumno(alumno: Alumno): void {
    this.toast.confirmarToast().then((confirmed) => {
      if (confirmed) {
        this.alumnosService.delete(alumno.id).subscribe({
          next: (alumnos) => {
            this.dataSource = alumnos
          }
        });
      }
    }).catch(() => {
      console.error('Error al confirmar la eliminación');
    });
  }
  modificarAlumno(id: string, alumnoModificado: Alumno): void {
    this.alumnosService.update(id, alumnoModificado).subscribe({
      next: () => { this.listarAlumnos(); }
    });
  }

  //MANEJO DE MODAL
  openModal(alumnoModificado?: Alumno): void {
    this.matDialog.open(CrearEditarAlumnosComponent, {
      data: {
        alumnoModificado
      },
      height: '450px',
      width: '600px',
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (!!result) {
          if (alumnoModificado) {
            this.modificarAlumno(alumnoModificado.id, result);            
          } else {
            this.alumnosService.add(result).subscribe({ next: () => this.store.dispatch(AlumnoActions.loadAlumnos())});
            //this.store.dispatch(AlumnoActions.createAlumno(result));            
          }
          this.toast.show();          
        }
      }
    });
  }
}




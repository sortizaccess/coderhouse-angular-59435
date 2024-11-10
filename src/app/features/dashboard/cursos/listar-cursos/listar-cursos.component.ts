import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearEditarCursosComponent } from '../crear-editar-cursos/crear-editar-cursos.component';
import { CursosService } from '../../../../core/services/cursos.service';
import { Curso } from '../../../../core/models/curso';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../core/models/alumno';
import { Store } from '@ngrx/store';
import { selectAlumnoAutenticado } from '../../../../store/selectors/auth.selector';
import { selectCursos } from '../store/curso.selectors';
import { CursoActions } from '../store/curso.actions';


@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrl: './listar-cursos.component.css'
})
export class ListarCursosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'fechaInicio', 'dificultad', 'acciones'];
  dataSource: Curso[] = [];

  authAlumno$: Observable<Alumno | null>;
  cursos$: Observable<Curso[]>;

  @ViewChild(ToastsComponent) toast!: ToastsComponent; 
  constructor(private matDialog: MatDialog, private cursosService: CursosService, private store: Store){
    this.authAlumno$ = this.store.select(selectAlumnoAutenticado);
    this.cursos$ = this.store.select(selectCursos);
   }

  ngOnInit(): void {
    this.listarCursos();
  }

  //ABM CURSOS
  listarCursos(): void {
    this.store.dispatch(CursoActions.loadCursos());
  }
  eliminarCurso(curso: Curso): void {
    this.toast.confirmarToast().then((confirmed) => {
      if (confirmed) {
        this.cursosService.delete(curso.id).subscribe({
          next: () => { this.listarCursos(); }
        });
      }
    }).catch(() => {
      console.error('Error al confirmar la eliminación');
    });
  }
  modificarCurso(id: string, cursoModificado: Curso): void {
    this.cursosService.update(id, cursoModificado).subscribe({
      next: () => { this.listarCursos(); }
    });
  }

  //MANEJO DE MODAL
  openModal(cursoModificado?: Curso): void {
    this.matDialog.open(CrearEditarCursosComponent, {
      data: {
        cursoModificado
      },
      height: '450px',
      width: '600px',
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (!!result) {
          if (cursoModificado) {
            this.modificarCurso(cursoModificado.id, result);            
          } else {
            this.cursosService.add(result).subscribe({ next: () => this.listarCursos()});   
          }

          this.toast.show();         
        }
      }
    });
  }

}

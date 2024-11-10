import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearEditarCursosComponent } from '../crear-editar-cursos/crear-editar-cursos.component';
import { CursosService } from '../../../../core/services/cursos.service';
import { Curso } from '../../../../core/models/curso';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../core/models/alumno';


@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrl: './listar-cursos.component.css'
})
export class ListarCursosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'fechaInicio', 'dificultad', 'acciones'];
  dataSource: Curso[] = [];
  authAlumno$: Observable<Alumno | null>;
  
  @ViewChild(ToastsComponent) toast!: ToastsComponent;
  
  constructor(private matDialog: MatDialog, private cursosService: CursosService, private authService: AuthService){
    this.authAlumno$ = this.authService.authAlumno$;
   }

  ngOnInit(): void {
    this.listarCursos();
  }

  //ABM CURSOS
  listarCursos(): void {
    this.cursosService.getAll().subscribe({
      next: (cursos) => {
        this.dataSource = cursos
      }
    });
  }
  eliminarCurso(curso: Curso): void {
    this.toast.confirmarToast().then((confirmed) => {
      if (confirmed) {
        this.cursosService.delete(curso.id).subscribe({
          next: (cursos) => {
            this.dataSource = cursos
          }
        });
      }
    }).catch(() => {
      console.error('Error al confirmar la eliminación');
    });
  }
  modificarCurso(id: string, cursoModificado: Curso): void {
    this.cursosService.update(id, cursoModificado).subscribe({
      next: (cursos) => {
        this.dataSource = cursos
      }
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

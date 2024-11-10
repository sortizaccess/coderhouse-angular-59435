import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { Inscripcion } from '../../../../core/models/inscripcion';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { CrearEditarInscripcionesComponent } from '../crear-editar-inscripciones/crear-editar-inscripciones.component';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../core/models/alumno';
import { Store } from '@ngrx/store';
import { selectAlumnoAutenticado } from '../../../../store/selectors/auth.selector';
import { selectInscripciones } from '../store/inscripcion.selectors';
import { InscripcionActions } from '../store/inscripcion.actions';


@Component({
  selector: 'app-listar-inscripciones',
  templateUrl: './listar-inscripciones.component.html',
  styleUrl: './listar-inscripciones.component.css'
})
export class ListarInscripcionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'idAlumno', 'idCurso', 'fechaInscripcion', 'estado', 'acciones'];
  dataSource: Inscripcion[] = [];

  authAlumno$: Observable<Alumno | null>;
  inscripciones$: Observable<Inscripcion[]>;

  @ViewChild(ToastsComponent) toast!: ToastsComponent;
  constructor(private matDialog: MatDialog, private inscripcionesService: InscripcionesService, private store: Store){
    this.authAlumno$ = this.store.select(selectAlumnoAutenticado);
    this.inscripciones$ = this.store.select(selectInscripciones);
   }

  ngOnInit(): void {
    this.listarInscripciones();
  }

  //ABM INSCRIPCIONES
  listarInscripciones(): void {
    this.store.dispatch(InscripcionActions.loadInscripciones());
  }
  eliminarInscripcion(inscripcion: Inscripcion): void {
    this.toast.confirmarToast().then((confirmed) => {
      if (confirmed) {
        this.inscripcionesService.delete(inscripcion.id).subscribe({
          next: (inscripciones) => {
            this.dataSource = inscripciones
          }
        });
      }
    }).catch(() => {
      console.error('Error al confirmar la eliminación');
    });
  }
  modificarInscripcion(id: string, inscripcionModificada: Inscripcion): void {
    this.inscripcionesService.update(id, inscripcionModificada).subscribe({
      next: () => { this.listarInscripciones(); }
    });
  }

  //MANEJO DE MODAL
  openModal(inscripcionModificada?: Inscripcion): void {
    this.matDialog.open(CrearEditarInscripcionesComponent, {
      data: {
        inscripcionModificada
      },
      height: '450px',
      width: '600px',
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (!!result) {
          if (inscripcionModificada) {
            this.modificarInscripcion(inscripcionModificada.id, result);            
          } else {
              this.inscripcionesService.add(result).subscribe({ next: () => this.listarInscripciones()});    
          }

          this.toast.show();         
        }
      }
    });
  }
}

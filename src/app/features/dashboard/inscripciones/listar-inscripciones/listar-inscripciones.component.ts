import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { Inscripcion } from '../../../../core/models/inscripcion';

import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { CrearEditarInscripcionesComponent } from '../crear-editar-inscripciones/crear-editar-inscripciones.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../core/models/alumno';


@Component({
  selector: 'app-listar-inscripciones',
  templateUrl: './listar-inscripciones.component.html',
  styleUrl: './listar-inscripciones.component.css'
})
export class ListarInscripcionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'idAlumno', 'idCurso', 'fechaInscripcion', 'estado', 'acciones'];
  dataSource: Inscripcion[] = [];
  authAlumno$: Observable<Alumno | null>;
  
  @ViewChild(ToastsComponent) toast!: ToastsComponent;
  
  constructor(private matDialog: MatDialog, private inscripcionesService: InscripcionesService, private authService: AuthService){
    this.authAlumno$ = this.authService.authAlumno$;
   }

  ngOnInit(): void {
    this.listarInscripciones();
  }

  //ABM INSCRIPCIONES
  listarInscripciones(): void {
    this.inscripcionesService.getAll().subscribe({
      next: (inscripciones) => {
        this.dataSource = inscripciones
      }
    });
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
      next: (inscripciones) => {
        this.dataSource = inscripciones
      }
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

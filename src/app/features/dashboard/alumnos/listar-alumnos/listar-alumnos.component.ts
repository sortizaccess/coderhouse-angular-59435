import { Component, OnInit, ViewChild } from '@angular/core';
import { Alumno } from '../../../../core/models/alumno';
import { Toast } from 'bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { CrearEditarAlumnosComponent } from '../crear-editar-alumnos/crear-editar-alumnos.component';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';

@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrl: './listar-alumnos.component.css'
})

export class ListarAlumnosComponent implements OnInit  {
  displayedColumns: string[] = ['legajo', 'nombre', 'email', 'fechaNacimiento', 'genero', 'acciones'];
  dataSource: Alumno[] = [];
  @ViewChild(ToastsComponent) toast!: ToastsComponent;
  constructor(private matDialog: MatDialog, private alumnos$: AlumnosService){ }

  ngOnInit(): void {
    this.listarAlumnos();
  }

  //ABM ALUMNOS
  listarAlumnos(): void {
    this.alumnos$.getAll().subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos
      }
    });
  }
  eliminarAlumno(alumno: Alumno): void {
    this.toast.confirmarToast().then((confirmed) => {
      if (confirmed) {
        this.alumnos$.delete(alumno.legajo).subscribe({
          next: (alumnos) => {
            this.dataSource = alumnos
          }
        });
      }
    }).catch(() => {
      console.error('Error al confirmar la eliminación');
    });
  }
  modificarAlumno(legajo: number, alumnoModificado: Alumno): void {
    this.alumnos$.update(legajo, alumnoModificado).subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos
      }
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
            this.modificarAlumno(alumnoModificado.legajo, result);            
          } else {
            this.dataSource = [
              ...this.dataSource, {...result}
            ];
          }

          this.toast.show();          
        }
      }
    });
  }
  
}




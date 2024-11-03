import { Component, OnInit, ViewChild } from '@angular/core';
import { Alumno } from '../../../../core/models/alumno';
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
  displayedColumns: string[] = ['id', 'nombre', 'email', 'fechaNacimiento', 'genero', 'acciones'];
  dataSource: Alumno[] = [];
  @ViewChild(ToastsComponent) toast!: ToastsComponent;
  constructor(private matDialog: MatDialog, private alumnosService: AlumnosService){ }

  ngOnInit(): void {
    this.listarAlumnos();
  }

  //ABM ALUMNOS
  listarAlumnos(): void {
    this.alumnosService.getAll().subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos
      }
    });
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
            this.modificarAlumno(alumnoModificado.id, result);            
          } else {
            this.alumnosService.add(result).subscribe({ next: () => this.listarAlumnos()});
          }

          this.toast.show();          
        }
      }
    });
  }
  
}




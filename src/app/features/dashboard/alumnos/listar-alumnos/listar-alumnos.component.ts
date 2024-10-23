import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../../../core/models/alumno';
import { Toast } from 'bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { CrearEditarAlumnosComponent } from '../crear-editar-alumnos/crear-editar-alumnos.component';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrl: './listar-alumnos.component.css'
})

export class ListarAlumnosComponent implements OnInit  {
  displayedColumns: string[] = ['legajo', 'nombre', 'email', 'fechaNacimiento', 'genero', 'acciones'];
  dataSource: Alumno[] = [];

  constructor(private matDialog: MatDialog, private alumnos$: AlumnosService){ }

  ngOnInit(): void {
    this.listarAlumnos();
  }

  listarAlumnos(): void {
    this.alumnos$.getAlumnos().subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos
      }
    });
  }
  eliminarAlumno(alumno: Alumno): void {
    this.confirmarToast().then((confirmed) => {
      if (confirmed) {
        this.alumnos$.eliminarAlumno(alumno.legajo).subscribe({
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
    this.alumnos$.modificarAlumno(legajo, alumnoModificado).subscribe({
      next: (alumnos) => {
        this.dataSource = alumnos
      }
    });
  }

  confirmarToast(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const toastElement = document.getElementById('id-toast');
    
      if (toastElement) {
        const toast = new Toast(toastElement);
        toast.show();
    
        const actionButton = document.getElementById('take-action-btn');
        if (actionButton) {
          actionButton.addEventListener('click', () => {
            toast.hide();
            resolve(true);
            const toastElementSuccess = document.getElementById('id-toast-success');
            if (toastElementSuccess) {
              const toastSuccess = new Toast(toastElementSuccess);
              toastSuccess.show();
            }
          });
        } else {
          console.error('actionButton no encontrado en el DOM');
          reject(false);  //Si no se encuentra el boton, rechaza la promesa
        }
      } else {
        console.error('toast no encontrado en el DOM');
        reject(false);  //Si no se encuentra el toast, rechaza la promesa
      }
    });
  }
  
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

          const toastElementSuccess = document.getElementById('id-toast-success');
          if (toastElementSuccess) {
            const toastSuccess = new Toast(toastElementSuccess);
            toastSuccess.show();
          }          
        }
      }
    });
  }
}




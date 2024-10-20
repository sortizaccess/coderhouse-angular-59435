import { Component } from '@angular/core';
import { Alumno } from '../../../../core/models/alumno';
import { Toast } from 'bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { CrearEditarAlumnosComponent } from '../crear-editar-alumnos/crear-editar-alumnos.component';

let ALUMNOS: Alumno[] = [
  new Alumno(254084299, 'Juan', 'Pérez', 'jperez@gmail.com', new Date('2000-05-20'), 'Masculino'),
  new Alumno(322063478, 'Ana', 'Gómez', 'agomez@gmail.com', new Date('1999-03-15'), 'Femenino'),
  new Alumno(433056889, 'Luis', 'Fernández', 'lfernandez@gmail.com', new Date('2001-07-30'), 'Masculino'),
  new Alumno(747016311, 'María', 'López', 'mlopez@gmail.com', new Date('2000-12-10'), 'Femenino'),
  new Alumno(995023300, 'Carlos', 'Martínez', 'cmartinez@gmail.com', new Date('1998-11-22'), 'Masculino'),
];

@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrl: './listar-alumnos.component.css'
})

export class ListarAlumnosComponent  {
  displayedColumns: string[] = ['legajo', 'nombre', 'email', 'fechaNacimiento', 'genero', 'acciones'];
  dataSource = ALUMNOS;

  constructor(private matDialog: MatDialog){
  }

  eliminarAlumno(alumno: Alumno): void {
    this.confirmarToast().then((confirmed) => {
      if (confirmed) {
        this.dataSource = this.dataSource.filter(x => x.legajo !== alumno.legajo);
      }
    }).catch(() => {
      console.error('Error al confirmar la eliminación');
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

  openModal(modificarAlumno?: Alumno): void {
    this.matDialog.open(CrearEditarAlumnosComponent, {
      data: {
        modificarAlumno
      },
      height: '450px',
      width: '600px',
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (!!result) {
          if (modificarAlumno) {
            this.dataSource = this.dataSource.map((alumno) => alumno.legajo === modificarAlumno.legajo ? {...alumno, ...result} : alumno)
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




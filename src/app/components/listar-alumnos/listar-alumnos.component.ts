import { Component } from '@angular/core';
import { Alumno } from '../models/alumno';
import * as bootstrap from 'bootstrap';

let ALUMNOS: Alumno[] = [
  new Alumno(1, new Date('2023-01-15'), 'Juan', 'Pérez', new Date('2000-05-20'), 'Masculino'),
  new Alumno(2, new Date('2023-02-10'), 'Ana', 'Gómez', new Date('1999-03-15'), 'Femenino'),
  new Alumno(3, new Date('2023-03-05'), 'Luis', 'Fernández', new Date('2001-07-30'), 'Masculino'),
  new Alumno(4, new Date('2023-04-20'), 'María', 'López', new Date('2000-12-10'), 'Femenino'),
  new Alumno(5, new Date('2023-05-25'), 'Carlos', 'Martínez', new Date('1998-11-22'), 'Masculino'),
];

@Component({
  selector: 'app-listar-alumnos',
  templateUrl: './listar-alumnos.component.html',
  styleUrl: './listar-alumnos.component.css'
})


export class ListarAlumnosComponent  {
  displayedColumns: string[] = ['legajo', 'fechaInscripcion', 'nombre', 'apellido', 'genero', 'acciones'];
  dataSource = ALUMNOS;

  eliminarAlumno(alumno: Alumno) : void {
    if (this.confirmarToast()) {
      this.dataSource = this.dataSource.filter(x => x.legajo !== alumno.legajo);
    }
  }

  confirmarToast(): boolean {
    const toastElement = document.getElementById('id-toast');

    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show(); 

      const actionButton = document.getElementById('take-action-btn');
      if (actionButton) {
        actionButton.addEventListener('click', () => {
          return true;        
        });
      } else {
        console.error('actionButton no encontrado en el DOM');
      }
    } else {
      console.error('toast no encontrado en el DOM');
    }

    return false;
  }
}




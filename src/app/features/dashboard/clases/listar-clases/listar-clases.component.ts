import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClasesService } from '../../../../core/services/clases.service';
import { Clase } from '../../../../core/models/clase';
import { CrearEditarClasesComponent } from '../crear-editar-clases/crear-editar-clases.component';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../core/models/alumno';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-listar-clases',
  templateUrl: './listar-clases.component.html',
  styleUrl: './listar-clases.component.css'
})
export class ListarClasesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'contenido', 'profesor', 'aula', 'acciones'];
  dataSource: Clase[] = [];
  authAlumno$: Observable<Alumno | null>;
  @ViewChild(ToastsComponent) toast!: ToastsComponent;

  constructor(private matDialog: MatDialog, private clasesService: ClasesService, private authService: AuthService){
    this.authAlumno$ = this.authService.authAlumno$;
   }

  ngOnInit(): void {
    this.listarClases();
  }

  //ABM CLASES
  listarClases(): void {
    this.clasesService.getAll().subscribe({
      next: (clases) => {
        this.dataSource = clases
      }
    });
  }
  eliminarClase(clase: Clase): void {
    this.toast.confirmarToast().then((confirmed) => {
      if (confirmed) {
        this.clasesService.delete(clase.id).subscribe({
          next: (clases) => {
            this.dataSource = clases
          }
        });
      }
    }).catch(() => {
      console.error('Error al confirmar la eliminación');
    });
  }
  modificarClase(id: string, claseModificada: Clase): void {
    this.clasesService.update(id, claseModificada).subscribe({
      next: (clases) => {
        this.dataSource = clases
      }
    });
  }

  //MANEJO DE MODAL
  openModal(claseModificada?: Clase): void {
    this.matDialog.open(CrearEditarClasesComponent, {
      data: {
        claseModificada
      },
      height: '450px',
      width: '600px',
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (!!result) {
          if (claseModificada) {
            this.modificarClase(claseModificada.id, result);            
          } else {
            this.clasesService.add(result).subscribe({ next: () => this.listarClases()});   
          }

          this.toast.show();        
        }
      }
    });
  }
  

}

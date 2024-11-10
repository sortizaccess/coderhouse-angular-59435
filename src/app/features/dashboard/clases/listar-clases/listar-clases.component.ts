import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClasesService } from '../../../../core/services/clases.service';
import { Clase } from '../../../../core/models/clase';
import { CrearEditarClasesComponent } from '../crear-editar-clases/crear-editar-clases.component';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { Observable } from 'rxjs';
import { Alumno } from '../../../../core/models/alumno';
import { Store } from '@ngrx/store';
import { selectAlumnoAutenticado } from '../../../../store/selectors/auth.selector';
import { selectClases } from '../store/clase.selectors';
import { ClaseActions } from '../store/clase.actions';

@Component({
  selector: 'app-listar-clases',
  templateUrl: './listar-clases.component.html',
  styleUrl: './listar-clases.component.css'
})
export class ListarClasesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'contenido', 'profesor', 'aula', 'acciones'];
  dataSource: Clase[] = [];

  authAlumno$: Observable<Alumno | null>;
  clases$: Observable<Clase[]>;

  @ViewChild(ToastsComponent) toast!: ToastsComponent;
  constructor(private matDialog: MatDialog, private clasesService: ClasesService, private store: Store){
    this.authAlumno$ = this.store.select(selectAlumnoAutenticado);
    this.clases$ = this.store.select(selectClases);
   }

  ngOnInit(): void {
    this.listarClases();
  }

  //ABM CLASES
  listarClases(): void {
    this.store.dispatch(ClaseActions.loadClases());
  }
  eliminarClase(clase: Clase): void {
    this.toast.confirmarToast().then((confirmed) => {
      if (confirmed) {
        this.clasesService.delete(clase.id).subscribe({
          next: () => { this.listarClases(); }
        });
      }
    }).catch(() => {
      console.error('Error al confirmar la eliminación');
    });
  }
  modificarClase(id: string, claseModificada: Clase): void {
    this.clasesService.update(id, claseModificada).subscribe({
      next: () => { this.listarClases(); }
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

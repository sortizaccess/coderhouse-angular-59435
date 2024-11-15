import { Component, ViewChild } from '@angular/core';
import { CrearEditarUsuariosComponent } from '../crear-editar-usuarios/crear-editar-usuarios.component';
import { Usuario } from '../../../../core/models/usuario';
import { Observable } from 'rxjs';
import { ToastsComponent } from '../../../../shared/utils/toasts/toasts.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { selectUsuarioAutenticado } from '../../../../store/selectors/auth.selector';
import { UsuarioActions } from '../store/usuario.actions';
import { selectUsuarios } from '../store/usuario.selectors';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'acciones'];
  dataSource: Usuario[] = [];

  authUsuario$: Observable<Usuario | null>;
  usuario$: Observable<Usuario[]>;

  @ViewChild(ToastsComponent) toast!: ToastsComponent;
  constructor(
    private matDialog: MatDialog, 
    private usuariosService: UsuariosService, 
    private store: Store, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ){
    this.authUsuario$ = this.store.select(selectUsuarioAutenticado);
    this.usuario$ = this.store.select(selectUsuarios);
   }

  ngOnInit(): void {
    this.listarUsuario();
  }

  //ABM USUARIOS
  listarUsuario(): void {
    this.store.dispatch(UsuarioActions.loadUsuarios());
  }
  eliminarUsuario(usuario: Usuario): void {
    this.toast.confirmarToast().then((confirmed) => {
      if (confirmed) {
        this.usuariosService.delete(usuario.id).subscribe({
          next: () => { this.listarUsuario(); }
        });
      }
    }).catch(() => {
      console.error('Error al confirmar la eliminación');
    });
  }
  modificarUsuario(id: string, usuarioModificado: Usuario): void {
    this.usuariosService.update(id, usuarioModificado).subscribe({
      next: () => { this.listarUsuario(); }
    });
  }

  //MANEJO DE MODAL
  openModal(usuarioModificado?: Usuario): void {
    this.matDialog.open(CrearEditarUsuariosComponent, {
      data: {
        usuarioModificado
      },
      height: '450px',
      width: '600px',
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if (!!result) {
          if (usuarioModificado) {
            this.modificarUsuario(usuarioModificado.id, result);            
          } else {
            this.usuariosService.add(result).subscribe({ next: () => this.store.dispatch(UsuarioActions.loadUsuarios())});          
          }
          this.toast.show();          
        }
      }
    });
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarAlumnosComponent } from './listar-alumnos/listar-alumnos.component';
import { DetalleAlumnosComponent } from './detalle-alumnos/detalle-alumnos.component';

const routes: Routes = [
    { path: '', component: ListarAlumnosComponent },
    { path: ':id/detalle', component: DetalleAlumnosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}

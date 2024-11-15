import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';

const routes: Routes = [
    { path: '', component: ListarCursosComponent },
    { path: ':id/detalle', component: DetalleCursosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}

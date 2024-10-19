import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListarAlumnosComponent } from './features/listar-alumnos/listar-alumnos.component';
import { CrearEditarAlumnosComponent } from './features/crear-editar-alumnos/crear-editar-alumnos.component';
import { ToastsComponent } from './shared/utils/toasts/toasts.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthModule } from './features/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    ListarAlumnosComponent,
    ToastsComponent,
    CrearEditarAlumnosComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule
  ],
  providers: [
    provideAnimationsAsync('noop'),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

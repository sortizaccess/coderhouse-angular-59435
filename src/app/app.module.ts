import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListarAlumnosComponent } from './components/listar-alumnos/listar-alumnos.component';
import { CrearEditarAlumnosComponent } from './components/crear-editar-alumnos/crear-editar-alumnos.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToastsComponent } from './utils/toasts/toasts.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    ListarAlumnosComponent,
    ToolbarComponent,
    ToastsComponent,
    CrearEditarAlumnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    provideAnimationsAsync('noop'),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

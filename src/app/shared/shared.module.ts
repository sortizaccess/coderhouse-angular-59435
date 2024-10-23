import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; 

import { TitulosDirective } from './directives/titulos.directive';
import { NombreCompletoPipe } from './pipes/nombreCompleto.pipe';
import { MatCardModule } from '@angular/material/card';
import { ToastsComponent } from './utils/toasts/toasts.component';

@NgModule({
  declarations: [
    TitulosDirective,
    NombreCompletoPipe,
    ToastsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    
    TitulosDirective,
    NombreCompletoPipe,
    ToastsComponent
  ]
})
export class SharedModule { }

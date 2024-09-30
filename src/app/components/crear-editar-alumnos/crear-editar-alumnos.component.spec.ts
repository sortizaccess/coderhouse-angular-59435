import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarAlumnosComponent } from './crear-editar-alumnos.component';

describe('CrearEditarAlumnosComponent', () => {
  let component: CrearEditarAlumnosComponent;
  let fixture: ComponentFixture<CrearEditarAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearEditarAlumnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEditarAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

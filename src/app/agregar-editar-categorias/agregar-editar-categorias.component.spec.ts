import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarCategoriasComponent } from './agregar-editar-categorias.component';

describe('AgregarEditarCategoriasComponent', () => {
  let component: AgregarEditarCategoriasComponent;
  let fixture: ComponentFixture<AgregarEditarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarCategoriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

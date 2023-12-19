import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarProductosComponent } from './agregar-editar-productos.component';

describe('AgregarEditarProductosComponent', () => {
  let component: AgregarEditarProductosComponent;
  let fixture: ComponentFixture<AgregarEditarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

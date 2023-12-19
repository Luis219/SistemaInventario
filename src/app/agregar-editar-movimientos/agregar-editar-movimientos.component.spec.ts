import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarMovimientosComponent } from './agregar-editar-movimientos.component';

describe('AgregarEditarMovimientosComponent', () => {
  let component: AgregarEditarMovimientosComponent;
  let fixture: ComponentFixture<AgregarEditarMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarEditarMovimientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEditarMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

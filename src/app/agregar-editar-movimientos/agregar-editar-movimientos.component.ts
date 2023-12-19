import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Movimientos } from '../interfaces/movimientos';
import { MovimientosService } from '../service/movimientos.service';
import { ProductoService } from '../service/productos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-agregar-editar-movimientos',
  templateUrl: './agregar-editar-movimientos.component.html',
  styleUrls: ['./agregar-editar-movimientos.component.css'],
})
export class AgregarEditarMovimientosComponent implements OnInit {

  form:FormGroup;
  operacion: string = 'Agregar ';
  id: number | undefined;
  productos: any[] = [];


  constructor(public dialogRef: MatDialogRef<AgregarEditarMovimientosComponent>,private cdr: ChangeDetectorRef,
    private fb:FormBuilder, private _movimientosService: MovimientosService, private _productoService: ProductoService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any){
      this.form = this.fb.group({
        ProductoID: ['', Validators.required],
        Cantidad: ['', Validators.required],
        FechaMovimiento: ['', Validators.required],
        TipoMovimiento: ['', Validators.required]
      })
      this.id = data?.id;
      this.productos = data?.productos || [];
    }

 


  ngOnInit(): void {
    this.esEditar(this.id);
    
    if (this.productos.length === 0) {
      this.loadProductos();
    }
  }

  esEditar(id:number | undefined){
    if(id !== undefined){
        this.operacion = 'Editar';
        this.getMovimiento(id);
    }

  }

  getMovimiento(id: number) {
    this._movimientosService.getMovimiento(id).subscribe(data =>{
      data.FechaMovimiento = new Date(data.FechaMovimiento);
      this.form.setValue({
        ProductoID: data.ProductoID,
        Cantidad: data.Cantidad,
        FechaMovimiento: data.FechaMovimiento,
        TipoMovimiento:  data.TipoMovimiento || ''
      })
    })
  }
  loadProductos() {
    this._productoService.getProductos().subscribe((data) => {
    this.productos = data;
    console.log(this.productos);
    this.form.get('ProductoID')?.setValue(this.productos.length > 0 ? this.productos[0].id : '');
    this.cdr.detectChanges(); 
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditMovimiento() {

    if (this.form.invalid) {
      return;
    }

    const movimientos: Movimientos ={
      ProductoID: this.form.value.ProductoID,
      Cantidad: this.form.value.Cantidad,
      FechaMovimiento: this.form.value.FechaMovimiento,
      TipoMovimiento: this.form.value.TipoMovimiento
    }

    if (this.id == undefined) {
      // Es agregar
      this._movimientosService.addMovimiento(movimientos).subscribe( () => {
        this.mensajeExito("agregado");
      });

    }else{
      // Es editar
      this._movimientosService.updateMovimiento(this.id,movimientos).subscribe( data =>{
        this.mensajeExito("actualizado");
      })
    }
    this.dialogRef.close(true);
  }

  mensajeExito(operacion:string) {
    this._snackBar.open(`El movimiento fue ${operacion} con exito`, '', {
      duration: 2000,
    });
  }
}

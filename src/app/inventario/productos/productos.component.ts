import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Productos } from '../../interfaces/productos';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarProductosComponent } from '../../agregar-editar-productos/agregar-editar-productos.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ProductoService } from '../../service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit, AfterViewInit {
  listProductos: Productos[] = [];

  dataSource = new MatTableDataSource<Productos>(this.listProductos);
  displayedColumns: string[] = ['position','CategoriaID', 'Nombre', 'Precio', 'Stock', 'acciones'];
  loading:boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _productoService: ProductoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerProductos() {
    this.loading = true;
    setTimeout(() => {
      this._productoService.getProductos().subscribe( data => {
        this.loading = false;
        this.listProductos = data;
        this.dataSource.data = this.listProductos.map((category, index) => {
          return { ...category, position: index + 1 };
        } );
      })
    }, 500);
  }

  eliminarProducto(id: number) {
    this.loading = true;
    this._productoService.deleteProducto(id).subscribe( () => {
      this.loading = false;
      this.obtenerProductos();
      this.mensajeExito();
    })
  }

  mensajeExito() {
    this._snackBar.open('Producto eliminado con exito', '', {
      duration: 2000,
    });
  }

  addEditProductos(id? : number) {
    const dialogRef = this.dialog.open(AgregarEditarProductosComponent, {
      width: '550px',
      disableClose: true,
      data:{id:id},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.obtenerProductos();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

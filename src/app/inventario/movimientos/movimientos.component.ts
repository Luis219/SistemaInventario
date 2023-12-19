import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Movimientos } from '../../interfaces/movimientos';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarMovimientosComponent } from '../../agregar-editar-movimientos/agregar-editar-movimientos.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovimientosService } from '../../service/movimientos.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
})
export class MovimientosComponent implements OnInit, AfterViewInit {
  listMovimientos: Movimientos[] = [];
  dataSource = new MatTableDataSource<Movimientos>(this.listMovimientos);
  displayedColumns: string[] = ['position', 'ProductoID', 'Cantidad', 'FechaMovimiento', 'TipoMovimiento', 'acciones'];
  loading:boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _movimientoService: MovimientosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obtenerMovimientos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerMovimientos() {
    this.loading = true;
    setTimeout(() => {
      this._movimientoService.getMovimientos().subscribe( data => {
        this.loading = false;
        this.listMovimientos = data;
        this.dataSource.data = this.listMovimientos.map((movimiento, index) => {
          return { ...movimiento, position: index + 1 };
        });
      })
    }, 500);
  }

  eliminarMovimiento(id: number) {
    this.loading = true;
    this._movimientoService.deleteMovimiento(id).subscribe( () => {
      this.loading = false;
      this.obtenerMovimientos();
      this.mensajeExito();
    })
  }

  mensajeExito() {
    this._snackBar.open('Movimiento eliminado con exito', '', {
      duration: 2000,
    });
  }

  addEditMovimientos(id? : number) {
    const dialogRef = this.dialog.open(AgregarEditarMovimientosComponent, {
      width: '550px',
      disableClose: true,
      data:{id:id},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.obtenerMovimientos();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

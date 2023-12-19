import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Categorias } from '../../interfaces/categorias';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoriaService } from '../../service/categoria.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarCategoriasComponent } from '../../agregar-editar-categorias/agregar-editar-categorias.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit, AfterViewInit {
  listCategorias: Categorias[] = [];

  dataSource = new MatTableDataSource<Categorias>(this.listCategorias);
  displayedColumns: string[] = ['position', 'nombre', 'acciones'];
  loading:boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _categoriaService: CategoriaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.obtenerCategoria();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  obtenerCategoria() {
    this.loading = true;
    setTimeout(() => {

      this._categoriaService.getCategorias().subscribe( data => {
        this.loading = false;
        this.listCategorias = data;
        this.dataSource.data = this.listCategorias.map((category, index) => {
          return { ...category, position: index + 1 };
        });
      })

    }, 500);

  }


  eliminarUsuario(id: number) {
    this.loading = true;
    this._categoriaService.deleteCategoria(id).subscribe( () => {
      this.loading = false;
      this.obtenerCategoria();
      this.mensajeExito();
    })
  }
  mensajeExito() {
    this._snackBar.open('Categoria eliminada con exito', '', {
      duration: 2000,

    });
  }





  addEditCategorias(id? : number) {
    
    const dialogRef = this.dialog.open(AgregarEditarCategoriasComponent, {
      width: '550px',
      disableClose: true,
      data:{id:id},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.obtenerCategoria();
      }

    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

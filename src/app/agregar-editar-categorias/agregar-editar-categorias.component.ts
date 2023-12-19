import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categorias } from '../interfaces/categorias';
import { CategoriaService } from '../service/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-agregar-editar-categorias',
  templateUrl: './agregar-editar-categorias.component.html',
  styleUrls:[ './agregar-editar-categorias.component.css'],
})
export class AgregarEditarCategoriasComponent implements OnInit {

  form:FormGroup;
  operacion: string = 'Agregar ';
  id: number | undefined;


  constructor(public dialogRef: MatDialogRef<AgregarEditarCategoriasComponent>,
    private fb:FormBuilder, private _categoriaService: CategoriaService, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any){
      this.form = this.fb.group({
        nombre: ['', [Validators.required, Validators.maxLength(20)]]
      })
      this.id = data?.id;
    }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id:number | undefined){
    if(id !== undefined){
        this.operacion = 'Editar';
        this.getCategoria(id);
    }

  }

  getCategoria(id: number) {
    this._categoriaService.getCategoria(id).subscribe(data =>{
      this.form.setValue({
        nombre: data.Nombre
      })
    })
  }



  cancelar() {
    this.dialogRef.close(false);
  }

  addEditCategoria() {

    if (this.form.invalid) {
      return;
    }


    const categorias: Categorias ={
      Nombre: this.form.value.nombre
    }


    if (this.id == undefined) {
      // Es agregar
      this._categoriaService.addCategoria(categorias).subscribe( () => {
        this.mensajeExito("agregada");
      });

    }else{
      // Es editar
      this._categoriaService.updateCategoria(this.id,categorias).subscribe( data =>{
        this.mensajeExito("actualizada");
      })
    }
    this.dialogRef.close(true);


  }

  mensajeExito(operacion:string) {
    this._snackBar.open(`La categoría fue ${operacion} con exito`, '', {
      duration: 2000,

    });
  }
}

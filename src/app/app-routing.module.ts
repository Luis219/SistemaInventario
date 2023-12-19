import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientosComponent } from './inventario/movimientos/movimientos.component';
import { CategoriasComponent } from './inventario/categorias/categorias.component';
import { ProductosComponent } from './inventario/productos/productos.component';

const routes: Routes = [
  { path: '', redirectTo: 'movimientos', pathMatch: 'full' },
  { path: 'movimientos', component: MovimientosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'productos', component: ProductosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

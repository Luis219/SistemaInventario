import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './inventario/productos/productos.component';
import { CategoriasComponent } from './inventario/categorias/categorias.component';
import { MovimientosComponent } from './inventario/movimientos/movimientos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './inventario/navbar/navbar.component';

// Angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { AgregarEditarCategoriasComponent } from './agregar-editar-categorias/agregar-editar-categorias.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


// Forms
import { ReactiveFormsModule } from '@angular/forms';

// Http Client
import { HttpClientModule } from '@angular/common/http';
import { AgregarEditarProductosComponent } from './agregar-editar-productos/agregar-editar-productos.component';
import { AgregarEditarMovimientosComponent } from './agregar-editar-movimientos/agregar-editar-movimientos.component';





@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    CategoriasComponent,
    MovimientosComponent,
    NavbarComponent,
    AgregarEditarCategoriasComponent,
    AgregarEditarProductosComponent,
    AgregarEditarMovimientosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule

  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}

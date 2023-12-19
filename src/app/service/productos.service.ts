import { Injectable } from '@angular/core';
import { Productos } from '../interfaces/productos';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'products/';
  }

  // Método para obtener todos los productos mediante una solicitud HTTP GET
  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // Método para eliminar un producto por su identificador mediante una solicitud HTTP DELETE
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  // Método para agregar un nuevo producto mediante una solicitud HTTP POST
  addProducto(producto: Productos): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, producto);
  }

  // Método para obtener un producto por su identificador mediante una solicitud HTTP GET
  getProducto(id: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  // Método para actualizar un producto por su identificador mediante una solicitud HTTP PUT
  updateProducto(id: number, producto: Productos): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, producto);
  }
}

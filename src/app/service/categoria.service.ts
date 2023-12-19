import { Injectable } from '@angular/core';
import { Categorias } from '../interfaces/categorias';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'categories/';
  }

  getCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addCategoria(categoria: Categorias): Observable<void>{

    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,categoria);
  }

  getCategoria(id: number): Observable<Categorias> {
    return this.http.get<Categorias>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateCategoria(id: number, categoria: Categorias): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,categoria);
  }

}

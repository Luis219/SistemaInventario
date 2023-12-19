import { Injectable } from '@angular/core';
import { Movimientos } from '../interfaces/movimientos';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovimientosService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'movimientos/';
  }

  getMovimientos(): Observable<Movimientos[]> {
    return this.http.get<Movimientos[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteMovimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addMovimiento(movimiento: Movimientos): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, movimiento);
  }

  getMovimiento(id: number): Observable<Movimientos> {
    return this.http.get<Movimientos>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateMovimiento(id: number, movimiento: Movimientos): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, movimiento);
  }

}

export interface Movimientos{
  ProductoID: number;
  Cantidad: number;
  FechaMovimiento: Date;
  TipoMovimiento: "Entrada" | "Salida";
}

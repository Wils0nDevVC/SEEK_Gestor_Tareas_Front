export interface ProductResponse {
    Data: Product[];
    IsSuccess: boolean;
    Message: string;
    Code: number;
    Errors: any;
  }
  
export interface Product {
    Id: number;
    Nombre: string;
    Descripcion: string;
    Precio: number;
    CantidadInventario: number;
    CategoryId: number;
  }
  

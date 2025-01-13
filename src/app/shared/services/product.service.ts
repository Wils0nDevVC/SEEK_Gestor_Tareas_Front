import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from 'src/app/core/interfaces/product.interface';
import { LocalService } from './local-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:58832/api/product/FindAll';

  constructor( private http: HttpClient,
    private localService: LocalService ) {}



  
  getProducts(): Observable<ProductResponse[]> {
    const token = this.localService.getJsonValue('token');

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
    return this.http.get<ProductResponse[]>(this.apiUrl,{headers});
  }
}

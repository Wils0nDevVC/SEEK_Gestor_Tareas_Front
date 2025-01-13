import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import {
  Product,
  ProductResponse,
} from 'src/app/core/interfaces/product.interface';
import { LocalService } from './local-service.service';
import { environment } from 'src/environments/environments.prod';
import { EndPointBase, EndPointsProduct } from '../constant';
import { ErrorService } from './error-control.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient, private localService: LocalService, private httpError : ErrorService) {}

  getProducts(): Observable<ProductResponse[]> {
    const token = this.localService.getJsonValue('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<ProductResponse[]>(
      `${this.baseUrl + EndPointBase.Product + EndPointsProduct.FindAll}`,
      { headers }
    );
  }

  deleteProduct(product: Product): Observable<any> {
    const token = this.localService.getJsonValue('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .delete<any>(
        `${this.baseUrl + EndPointBase.Product + EndPointsProduct.Delete}`,
        {
          body: product,
          headers
        }
      )
      .pipe(retry(0), catchError(this.httpError.messageError));
  }
}

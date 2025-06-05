// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from '../models/product.dto';
import { Observable, map } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';
  
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductDTO[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response =>
        response.products.map((prod: any) =>
          Object.assign(new ProductDTO(), prod)
        )
      )
    );
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(data => new Product(data))
    );
  }
}

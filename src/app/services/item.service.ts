import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  // Buscar todos os produtos
  getItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Adicionar um novo produto
  addItem(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Deletar um produto
  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Buscar um produto por ID
  getItemById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Atualizar um produto existente
  updateItem(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }
}
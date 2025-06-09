// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs'; // Importar BehaviorSubject e Observable

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // BehaviorSubject para manter o estado atual do carrinho e emitir atualizações
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  // Observable para outros componentes se inscreverem
  public cartItems$: Observable<Product[]> = this.cartItemsSubject.asObservable();

  constructor() {
    // Ao iniciar o serviço, carrega o carrinho do localStorage
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('carrinho') || '[]');
    this.cartItemsSubject.next(cart); // Emite o estado inicial do carrinho
  }

  // Método para adicionar um produto ao carrinho
  addItem(product: Product) {
    const currentCart = this.cartItemsSubject.getValue(); // Pega o valor atual do carrinho
    const existingItem = currentCart.find(item => item.id === product.id);

    if (!existingItem) { // Se o item não existir, adiciona
      const updatedCart = [...currentCart, product]; // Cria um novo array (imutabilidade)
      localStorage.setItem('carrinho', JSON.stringify(updatedCart)); // Salva no localStorage
      this.cartItemsSubject.next(updatedCart); // Emite a nova lista de itens
      return true; // Indica que o item foi adicionado
    }
    return false; // Indica que o item já existia
  }

  // Método para remover um produto do carrinho (opcional, mas útil)
  removeItem(productId: number) {
    const currentCart = this.cartItemsSubject.getValue();
    const updatedCart = currentCart.filter(item => item.id !== productId);
    localStorage.setItem('carrinho', JSON.stringify(updatedCart));
    this.cartItemsSubject.next(updatedCart);
  }

  // Método para obter todos os itens do carrinho (estado atual, sem ser Observable)
  getCartItems(): Product[] {
    return this.cartItemsSubject.getValue();
  }

  // Método para limpar o carrinho (opcional)
  clearCart() {
    localStorage.removeItem('carrinho');
    this.cartItemsSubject.next([]);
  }
}
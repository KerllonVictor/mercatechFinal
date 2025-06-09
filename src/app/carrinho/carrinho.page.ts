// src/app/carrinho/carrinho.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../interfaces/product';
import { CartService } from '../services/cart.service'; // Importa o CartService
import { Subscription } from 'rxjs'; // Para gerenciar a inscrição
import { ToastController } from '@ionic/angular'; // Para mensagens de notificação

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit, OnDestroy {
  // Agora a lista de itens do carrinho se chama 'itensCarrinho' e é observada
  itensCarrinho: Product[] = [];
  total: number = 0; // Propriedade para calcular e exibir o total
  private cartSubscription: Subscription | undefined; // Para gerenciar a inscrição do Observable

  constructor(
    private cartService: CartService,
    private toastCtrl: ToastController // Injeta o ToastController
  ) {}

  ngOnInit() {
    // Inscreve-se no Observable do carrinho do serviço.
    // Sempre que o carrinho for atualizado no serviço, este callback será executado.
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.itensCarrinho = items; // Atualiza a lista de itens na página
      this.calcularTotal(); // Recalcula o total sempre que os itens mudam
      console.log('Carrinho na página de carrinho atualizado:', this.itensCarrinho);
    });
  }

  ngOnDestroy() {
    // É crucial desinscrever para evitar vazamentos de memória
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  calcularTotal() {
    this.total = this.itensCarrinho.reduce((sum, item) => sum + item.price, 0);
  }

  // Método para remover um produto do carrinho
  async removerDoCarrinho(produto: Product) {
    this.cartService.removeItem(produto.id!); // Chama o método do serviço
    const toast = await this.toastCtrl.create({
      message: `"${produto.title}" removido do carrinho.`,
      duration: 1500,
      color: 'danger',
      position: 'top',
      icon: 'trash'
    });
    toast.present();
  }

  // Método para finalizar a compra (exemplo básico)
  async finalizarCompra() {
    if (this.itensCarrinho.length === 0) {
      const toast = await this.toastCtrl.create({
        message: 'Seu carrinho está vazio!',
        duration: 2000,
        color: 'warning',
        position: 'top',
        icon: 'alert'
      });
      toast.present();
      return;
    }

    // Lógica para finalizar a compra (ex: enviar para um backend, limpar carrinho)
    console.log('Finalizando compra com os itens:', this.itensCarrinho);
    this.cartService.clearCart(); // Limpa o carrinho após a "compra"
    const toast = await this.toastCtrl.create({
      message: 'Compra finalizada com sucesso! Seu carrinho foi esvaziado.',
      duration: 2000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle'
    });
    toast.present();
  }
}
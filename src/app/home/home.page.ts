// src/app/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Product } from '../interfaces/product';
import { ToastController } from '@ionic/angular';
import { CartService } from '../services/cart.service'; // Importa o CartService

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  produtosEmDestaque: Product[] = [];

  constructor(
    private itemService: ItemService,
    private toastCtrl: ToastController,
    private cartService: CartService // Injeta o CartService
  ) {}

  ngOnInit() {
    this.carregarProdutosEmDestaque();
  }

  carregarProdutosEmDestaque() {
    this.itemService.getItems().subscribe({
      next: (data: Product[]) => {
        this.produtosEmDestaque = data.filter(p => p.isFeatured === true);
      },
      error: (err) => {
        console.error('Erro ao carregar produtos em destaque:', err);
      }
    });
  }

  async adicionarCarrinho(produto: Product) {
    // Usa o CartService para adicionar o item
    const added = this.cartService.addItem(produto); 

    if (added) {
      const toast = await this.toastCtrl.create({
        message: 'Produto adicionado ao carrinho!',
        duration: 1500,
        color: 'success',
        position: 'top',
        icon: 'cart'
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Este produto já está no carrinho.',
        duration: 1500,
        color: 'warning',
        position: 'top',
        icon: 'alert'
      });
      toast.present();
    }
  }
}
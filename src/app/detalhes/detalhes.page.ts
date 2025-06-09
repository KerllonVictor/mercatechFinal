// src/app/detalhes/detalhes.page.ts
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Product } from '../interfaces/product';
import { ToastController } from '@ionic/angular';
import { CartService } from '../services/cart.service'; // Importa o CartService

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: false
})
export class DetalhesPage implements OnInit {
  categoriaSelecionada: string = 'Todos';
  produtos: Product[] = [];
  produtosFiltrados: Product[] = [];
  categorias: string[] = [];

  constructor(
    private itemService: ItemService,
    private toastCtrl: ToastController,
    private cartService: CartService // Injeta o CartService
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe((data: Product[]) => {
      this.produtos = data;
      this.categorias = ['Todos', ...Array.from(new Set(data.map(p => p.category)))];
      this.filtrarPorCategoria();
    });
  }

  filtrarPorCategoria() {
    if (this.categoriaSelecionada === 'Todos') {
      this.produtosFiltrados = this.produtos;
    } else {
      this.produtosFiltrados = this.produtos.filter(
        p => p.category === this.categoriaSelecionada
      );
    }
  }

  // getProductImage (mantenha ou remova conforme sua decisão anterior)
  // Se você está usando caminhos de imagem no db.json, esta função não é estritamente necessária
  // mas pode ser útil como fallback se o 'image' do produto for nulo.
  getProductImage(produto: Product): string {
    const images: {[key: string]: string} = {
      'Monitores': 'assets/produtos/1 Monitor Gamer 24 Polegadas.JPG', // Exemplo com o novo caminho
      'Mouses': 'assets/produtos/2 Mouse Óptico RGB.JPG',
      // ... mapeie todas as suas categorias com os caminhos corretos se for usar esta função
    };
    return images[produto.category] || 'assets/placeholder.jpg'; // Adicione um placeholder genérico
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
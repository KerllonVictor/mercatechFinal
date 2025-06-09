// src/app/interfaces/product.ts
export interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isFeatured?: boolean; // ADICIONADO: Propriedade opcional para produtos em destaque
}
// src/domain/entities/Product.ts

export interface Product {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  tag: string;
  image: string;
  colors?: string[];
  quickSpecs?: {
    cpu?: string;
    ram?: string;
    vga?: string;
    storage?: string;
    display?: string;
    os?: string;
  };
  details?: {
    brand?: string;
    warranty?: string;
    series?: string;
    partNumber?: string;
  };
  description?: string;
}
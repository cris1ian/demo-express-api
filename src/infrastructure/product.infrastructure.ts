// src/infrastructure/product.mockdb.ts

import { IProduct } from "../models/product";

export class ProductInfrastructure {
    private products: IProduct[] = [];
    private idCounter: number = 1;

    public async create(product: Omit<IProduct, 'id'>): Promise<IProduct> {
        const newProduct = { ...product, id: this.idCounter++, stock: product.stock || 0 };
        this.products.push(newProduct);
        return newProduct;
    }

    public async getAll(): Promise<IProduct[]> {
        return this.products;
    }

    public async update(id: number, updatedProduct: Partial<IProduct>): Promise<IProduct | null> {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return null;

        this.products[productIndex] = { ...this.products[productIndex], ...updatedProduct };
        return this.products[productIndex];
    }

    public async delete(id: number): Promise<boolean> {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) return false;

        this.products.splice(productIndex, 1);
        return true;
    }
}


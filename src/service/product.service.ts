import { ProductInfrastructure } from '../infrastructure/product.infrastructure'
import { IProduct } from '../models/product'

export class ProductService {
    productInfrastructure: ProductInfrastructure;

    constructor() {
        this.productInfrastructure = new ProductInfrastructure();
    }

    async createProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
        if (!product.description) throw new Error('Field description is required in order to create a product')
        if (!product.price) throw new Error('Field price is required in order to create a product')
        console.log(Number.isNaN(Number(product.price)))
        if (Number.isNaN(Number(product.price))) throw new Error('Field price should be a number')

        return this.productInfrastructure.create(product)
    }

    async getProduct(): Promise<IProduct[]> {
        return this.productInfrastructure.getAll()
    }

    async updateProduct(id: number, product: Partial<IProduct>): Promise<IProduct | null> {
        return this.productInfrastructure.update(id, product)
    }

    async deleteProduct(id: number): Promise<boolean> {
        if (Number.isNaN(Number(id))) throw new Error('ID should be a number')
        return this.productInfrastructure.delete(id)
    }

}

import { Application, Router } from "express";
import { IProduct } from "../models/product";
import { ProductService } from '../service/product.service';

export class ProductController {
    private baseUrl: string = '/products';
    private readonly productService = new ProductService();

    constructor(router: Router, app: Application) {
        this.productService = new ProductService();
        this.initializeRoutes(router, app);
    }

    // Method to initialize routes
    private initializeRoutes(router: Router, app: Application) {
        router.post('/', this.createProduct);
        router.get('/', this.getProducts);
        router.put('/:id', this.updateProduct);
        router.delete('/:id', this.deleteProduct);
        app.use('/api/products', router)
    }

    private readonly createProduct = async (req: any, res: any) => {
        try {
            const newProduct: IProduct = await this.productService.createProduct(req.body);
            return res.status(201).json({ message: 'Product created successfully', data: newProduct })
        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }

    private readonly getProducts = async (req: any, res: any) => {
        try {
            const products: IProduct[] = await this.productService.getProduct();
            return res.status(200).json({ message: 'Products obtained', data: products })
        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }

    private readonly updateProduct = async (req: any, res: any) => {
        try {
            const updatedProduct: IProduct | null = await this.productService.updateProduct(parseInt(req.params.id), req.body);
            return res.status(200).json({ message: 'Product updated successfully', data: updatedProduct })
        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }

    private readonly deleteProduct = async (req: any, res: any) => {
        try {
            const result: boolean = await this.productService.deleteProduct(parseInt(req.params.id));
            return result ?
                res.status(200).json({ message: 'Product deleted successfully' }) :
                res.status(400).json({ message: 'Product not found, no records where deleted' })
        } catch (error: any) {
            return res.status(400).json({ message: error.message })
        }
    }
}

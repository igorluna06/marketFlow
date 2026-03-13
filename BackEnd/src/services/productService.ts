import { ProductRepository } from "../repository/ProductRepository";
import { Product } from "../entities/Product";
import { productIdGenerator } from "../utils/generators/productIdGenerator";
import { productCodeGenerator } from "../utils/generators/productCodeGenerator";

export class ProductService{

    private productRepository: ProductRepository;

    constructor(){

        this.productRepository = new ProductRepository();
    }

    createProduct(name: string, price: number, stock: number){

        const product: Product = new Product(productIdGenerator(), productCodeGenerator(), name, price, stock);
        
        this.productRepository.addProduct(product);
    }
}
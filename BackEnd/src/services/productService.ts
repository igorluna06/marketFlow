import { ProductRepository } from "../repository/ProductRepository";
import { Product } from "../entities/Product";
import { productIdGenerator } from "../utils/generators/productIdGenerator";
import { productCodeGenerator } from "../utils/generators/productCodeGenerator";
import { nameValidator } from "../utils/validators/nameValidator";

export class ProductService{

    private productRepository: ProductRepository;

    constructor(){

        this.productRepository = new ProductRepository();
    }

    createProduct(code: string, name: string, price: number, stock: number){

        nameValidator(name);

        if(price <= 0){
            throw new Error("Preço não pode ser 0 ou negativo")
        }
        if(stock <= 0){
            throw new Error("Quantidade não pode ser 0 ou negativo")
        }

        const product: Product = new Product(productIdGenerator(), code, name, price, stock);

        this.productRepository.addProduct(product);
    }
}
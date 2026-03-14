import { ProductRepository } from "../repository/ProductRepository";
import { Product } from "../entities/Product";
import { productIdGenerator } from "../utils/generators/productIdGenerator";
import { nameValidator } from "../utils/validators/nameValidator";
import { codeValidator } from "../utils/validators/codeValidator";

export class ProductService{

    private productRepository: ProductRepository;

    constructor(){

        this.productRepository = new ProductRepository();
    }

    createProduct(code: string, name: string, price: number, stock: number){

        codeValidator(code);
        nameValidator(name);

        if(price <= 0){
            throw new Error("Preço não pode ser 0 ou negativo")
        }
        if(stock <= 0){
            throw new Error("Quantidade não pode ser 0 ou negativo")
        }

        const productFound: Product | undefined = this.productRepository.findByCode(code);

        if(productFound){
            productFound.increaseStock(stock);
            
        }else{
            const product: Product = new Product(productIdGenerator(), code, name, price, stock);

            this.productRepository.addProduct(product);
        }

    }

    updateProduct(product: Product){

        this.productRepository.update(product);
    }

    addStock(quantity: number, code: string){

        codeValidator(code);

        const productFound: Product | undefined = this.productRepository.findByCode(code);

        if(!productFound){
            throw new Error("Produto não encontrado!");
        }

        productFound.increaseStock(quantity);

        this.updateProduct(productFound);
    }

    removeStock(quantity: number, code: string){

        codeValidator(code);

        const productFound: Product | undefined = this.productRepository.findByCode(code);

        if(!productFound){
            throw new Error("Produto não encontrado!");
        }

        productFound.decreaseStock(quantity);

        this.updateProduct(productFound);
    }


    deleteProduct(code: string){

        codeValidator(code);

        const productFound: Product | undefined = this.productRepository.findByCode(code);

        if(!productFound){
            throw new Error("Produto não encontrado!");
        }

        this.productRepository.delete(productFound);

    }

    takeAllProducts(): Product[]{
        return this.productRepository.findAll();;
    }
}
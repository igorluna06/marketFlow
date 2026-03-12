import { Product } from "../entities/Product"

export class ProductRepository{

    private products: Product[];

    constructor(){
        this.products = [];
    }

    addProduct(product: Product){this.products.push(product);}

    findByCode(code: string): Product | undefined{

        const productFound: Product | undefined = this.products.find(product => product.code === code);

        return productFound;
    }

    findById(id: number): Product | undefined{

        const productFound: Product | undefined = this.products.find(product => product.id === id);

        return productFound;
    }

    delete(productDelete: Product){

        const productIndexRemove: number= this.products.findIndex(product => product.id === productDelete.id);

        this.products.splice(productIndexRemove, 1);

    }

    updateProduct(productUpdate: Product){

        const productIndexUpdate: number= this.products.findIndex(product => product.id === productUpdate.id);

        this.products[productIndexUpdate] = productUpdate;
    }

    findAll(): Product[]{

        const copyProducts: Product[] = this.products.slice();

        return copyProducts;
    }
}
import { Product } from "../entities/Product";
import fs from "fs";
import path from "path";

export class ProductRepository{

    private products: Product[];
    private filePath: string;

    constructor(){
        this.filePath = path.join(__dirname, "../data/products.json");

        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        this.products = JSON.parse(fileContent);
    }

    private saveJson(){

        fs.writeFileSync(
            this.filePath,
            JSON.stringify(this.products, null, 2)
        );

    }

    addProduct(product: Product){
        this.products.push(product);
        this.saveJson();
    }

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

        this.saveJson();

    }

    update(productUpdate: Product){

        const productIndexUpdate: number= this.products.findIndex(product => product.id === productUpdate.id);

        this.products[productIndexUpdate] = productUpdate;

        this.saveJson();
    }

    findAll(): Product[]{

        const copyProducts: Product[] = this.products.slice();

        return copyProducts;
    }
}
import { Sale } from "../entities/Sale";
import fs from "fs";
import path from "path";
import { SaleItem } from "../entities/saleItem";
import { Product } from "../entities/Product";
import { reconstructEntities } from "../utils/reconstructors/entityReconstructor";


export class SaleRepository{

    private sales: Sale[];

    private filePath: string;

    constructor(){
        this.filePath = path.join(__dirname, "../data/sale.json");
    
        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        const rawArray = JSON.parse(fileContent);

        this.sales = reconstructEntities(rawArray, Sale);
    }

    
    private saveJson(){
    
        fs.writeFileSync(
            this.filePath,
            JSON.stringify(this.sales, null, 2)
        );
    
    }

    addSale(sale: Sale){
        this.sales.push(sale);
        this.saveJson();
    }

    findById(saleId: number): Sale | undefined{
    
        const saleFound: Sale | undefined = this.sales.find(sale => sale.saleId === saleId);
    
        return saleFound;
    }

    delete(saleDelete: Sale){
    
        const saleIndexRemove: number = this.sales.findIndex(sale => sale.saleId === saleDelete.saleId);

        if(saleIndexRemove === -1){
            throw new Error("Venda não encontrada!")
        }
    
        this.sales.splice(saleIndexRemove, 1);
    
        this.saveJson();
    
    }
    
    update(saleUpdate: Sale){
    
        const saleIndexUpdate: number = this.sales.findIndex(sale => sale.saleId === saleUpdate.saleId);

        this.sales[saleIndexUpdate] = saleUpdate;
    
        this.saveJson();
    }

    findAll(): Sale[]{

        const copySales: Sale[] = this.sales.slice();

        return copySales;
    }


}
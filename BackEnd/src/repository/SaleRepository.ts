import { Sale } from "../entities/Sale";
import fs from "fs";
import path from "path";
import { reconstructEntities } from "../utils/reconstructors/entityReconstructor";
import { SaleNotFoundError } from "../utils/errors/SaleErrors/SaleNotFoundError";


export class SaleRepository{

    private sales: Sale[];

    private filePath: string;

    /**
     * Inicializa o repositório de vendas.
     * 
     * Lê os dados do arquivo JSON e reconstrói
     * as entidades de venda na memória.
     */
    constructor(){

        let rawArray: any[] = [];

        this.filePath = path.join(__dirname, "../data/sale.json");
        
        try{
            const fileContent = fs.readFileSync(this.filePath, "utf-8");
            const parsed = fileContent ? JSON.parse(fileContent) : [];
            rawArray = Array.isArray(parsed) ? parsed : [];
        }
        catch (error){
            rawArray = []
        }

        this.sales = reconstructEntities(rawArray, Sale.fromJSON);
    }

    /**
     * Persiste o estado atual das vendas no arquivo JSON.
     * 
     * Converte as entidades em formato serializável
     * e salva no disco.
     */
    private saveJson(){
    
        fs.writeFileSync(
            this.filePath,
            JSON.stringify(this.sales, null, 2)
        );
    
    }

    /**
     * Adiciona uma nova venda ao repositório.
     * 
     * @param sale venda a ser adicionada
     */
    addSale(sale: Sale){
        this.sales.push(sale);
        this.saveJson();
    }

    /**
     * Busca uma venda pelo identificador.
     * 
     * @param saleId identificador da venda
     * @returns venda encontrada ou undefined
     */
    findById(saleId: number): Sale | undefined{
    
        const saleFound: Sale | undefined = this.sales.find(sale => sale.getSaleId() === saleId);
    
        return saleFound;
    }

    /**
     * Remove uma venda do repositório.
     * 
     * @param saleDelete venda a ser removida
     * 
     * @throws SaleNotFoundError se a venda não for encontrada
     */
    delete(saleDelete: Sale){
    
        const saleIndexRemove: number = this.sales.findIndex(sale => sale.getSaleId() === saleDelete.getSaleId());

        if(saleIndexRemove === -1){
            throw new SaleNotFoundError();
        }
    
        this.sales.splice(saleIndexRemove, 1);
    
        this.saveJson();
    
    }
    
    /**
     * Atualiza uma venda existente no repositório.
     * 
     * @param saleUpdate venda atualizada
     * 
     * @throws SaleNotFoundError se a venda não for encontrada
     */
    update(saleUpdate: Sale){
    
        const saleIndexUpdate: number = this.sales.findIndex(sale => sale.getSaleId() === saleUpdate.getSaleId());

        if(saleIndexUpdate === -1){
            throw new SaleNotFoundError();
        }

        this.sales[saleIndexUpdate] = saleUpdate;
    
        this.saveJson();
    }

    /**
     * Retorna todas as vendas cadastradas.
     * 
     * @returns lista de vendas
     */
    findAll(): Sale[]{

        const copySales: Sale[] = this.sales.slice();

        return copySales;
    }


}
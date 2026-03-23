import { Sale } from "../entities/Sale";
import { SaleRepository } from "../repository/SaleRepository";
import { idGenerator } from "../utils/generators/IdGenerator";
import { ProductService } from "./productService";

export class SaleService{

    private saleRepository: SaleRepository;
    private productService: ProductService;

    constructor(){

        this.saleRepository = new SaleRepository();
        this.productService = new ProductService();
    }

    createSale(date: string){

        const id: number = idGenerator(this.getAllSales().reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.saleId), 0));

        const sale: Sale = new Sale(id, date);

        this.saleRepository.addSale(sale);
    }

    addItemToSale(saleId: number, code: string, quantity: number){

        const product = this.productService.getByCode(code);

        const saleFound: Sale | undefined = this.saleRepository.findById(saleId);

        if(!saleFound){
            throw new Error("Venda não encontrada!");
        }

        saleFound.addItem(product, quantity);

        this.saleRepository.update(saleFound);
    }

    removeItemFromSale(saleId: number, saleItemId: number){

        const saleFound: Sale | undefined = this.saleRepository.findById(saleId);

        if(!saleFound){
            throw new Error("Venda não encontrada!");
        }

        saleFound.removeItem(saleItemId);
    }

    increaseItemQuantity(saleId: number, saleItemId: number, quantity: number){

        const saleFound: Sale | undefined = this.saleRepository.findById(saleId);

        if(!saleFound){
            throw new Error("Venda não encontrada!");
        }

        saleFound.increaseQuantity(saleItemId, quantity);

        this.saleRepository.update(saleFound);

    }

    decreaseItemQuantity(saleId: number, saleItemId: number, quantity: number){

        const saleFound: Sale | undefined = this.saleRepository.findById(saleId);

        if(!saleFound){
            throw new Error("Venda não encontrada!");
        }

        saleFound.decreaseQuantity(saleItemId, quantity);

        this.saleRepository.update(saleFound);

    }

    confirmSale(saleId: number){

        const saleFound: Sale | undefined = this.saleRepository.findById(saleId);

        if(!saleFound){
            throw new Error("Venda não encontrada!");
        }

        saleFound.confirmSale();

        this.saleRepository.update(saleFound);
    }

    getSaleById(saleId: number): Sale{

        const saleFound: Sale | undefined = this.saleRepository.findById(saleId);

        if(!saleFound){
            throw new Error("Venda não encontrada!");
        }

        return saleFound;
    }

    getAllSales(): Sale[]{

        return this.saleRepository.findAll();
    }
}
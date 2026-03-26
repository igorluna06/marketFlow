import { Sale } from "../entities/Sale";
import { SaleRepository } from "../repository/SaleRepository";
import { SaleNotFoundError } from "../utils/errors/SaleErrors/SaleNotFoundError";
import { idGenerator } from "../utils/generators/IdGenerator";
import { ProductService } from "./ProductService";

export class SaleService{

    private saleRepository: SaleRepository;
    private productService: ProductService;

    constructor(productService: ProductService){

        this.saleRepository = new SaleRepository();
        this.productService = productService;
    }

    /**
     * Cria uma nova venda no sistema.
     * 
     * Gera automaticamente um identificador único
     * e persiste a venda no repositório.
     * 
     * @param date data da venda
     */
    createSale(): Sale{

        const id: number = idGenerator(this.getAllSales().reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.getSaleId()), 0));

        const date : string = new Date().toLocaleDateString("pt-BR");

        const sale: Sale = new Sale(id, date);

        this.saleRepository.addSale(sale);

        return sale;
    }

    /**
     * Adiciona um item a uma venda existente.
     * 
     * @param saleId identificador da venda
     * @param code código do produto
     * @param quantity quantidade a ser adicionada
     * 
     * @throws SaleNotFoundError se a venda não existir
     */
    addItemToSale(saleId: number, code: string, quantity: number){

        const product = this.productService.getByCode(code);

        const saleFound: Sale = this.getSaleById(saleId);

        saleFound.addItem(product, quantity);

        this.saleRepository.update(saleFound);
    }

    /**
     * Remove um item de uma venda.
     * 
     * @param saleId identificador da venda
     * @param saleItemId identificador do item da venda
     * 
     * @throws SaleNotFoundError se a venda não existir
     */
    removeItemFromSale(saleId: number, saleItemId: number){

        const saleFound: Sale = this.getSaleById(saleId);

        saleFound.removeItem(saleItemId);

        this.saleRepository.update(saleFound);
    }

    /**
     * Aumenta a quantidade de um item dentro de uma venda.
     * 
     * @param saleId identificador da venda
     * @param saleItemId identificador do item
     * @param quantity quantidade a ser adicionada
     * 
     * @throws SaleNotFoundError se a venda não existir
     */
    increaseItemQuantity(saleId: number, saleItemId: number, quantity: number){

        const saleFound: Sale = this.getSaleById(saleId);

        saleFound.increaseQuantity(saleItemId, quantity);

        this.saleRepository.update(saleFound);

    }

    /**
     * Diminui a quantidade de um item dentro de uma venda.
     * 
     * @param saleId identificador da venda
     * @param saleItemId identificador do item
     * @param quantity quantidade a ser removida
     * 
     * @throws SaleNotFoundError se a venda não existir
     */
    decreaseItemQuantity(saleId: number, saleItemId: number, quantity: number){

        const saleFound: Sale = this.getSaleById(saleId);

        saleFound.decreaseQuantity(saleItemId, quantity);

        this.saleRepository.update(saleFound);

    }

    /**
     * Confirma uma venda.
     * 
     * Após a confirmação:
     * - o estoque dos produtos é atualizado
     * - a venda não pode mais ser alterada
     * 
     * @param saleId identificador da venda
     * 
     * @throws SaleNotFoundError se a venda não existir
     */
    confirmSale(saleId: number){

        const saleFound: Sale = this.getSaleById(saleId);

        saleFound.confirmSale();

        saleFound.getAllSaleItems().forEach(item => {
        this.productService.updateProduct(item.getProduct());
        });

        this.saleRepository.update(saleFound);
    }

    /**
     * Retorna uma venda pelo identificador.
     * 
     * @param saleId identificador da venda
     * @returns venda encontrada
     * 
     * @throws SaleNotFoundError se a venda não existir
     */
    getSaleById(saleId: number): Sale{

        const saleFound: Sale | undefined = this.saleRepository.findById(saleId);

        if(!saleFound){
            throw new SaleNotFoundError();
        }

        return saleFound;
    }

    /**
     * Retorna todas as vendas cadastradas no sistema.
     * 
     * @returns lista de vendas
     */
    getAllSales(): Sale[]{

        return this.saleRepository.findAll();
    }
}
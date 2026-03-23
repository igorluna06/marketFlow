import { InsufficientStockError } from "../utils/errors/productErrors/InsufficientStockError";
import { EmptySaleError } from "../utils/errors/SaleErrors/EmptySaleError";
import { SaleAlreadyConfirmedError } from "../utils/errors/SaleErrors/SaleAlreadyConfirmedError";
import { SaleItemNotFoundError } from "../utils/errors/SaleItemErrors/SaleItemNotFoundError";
import { idGenerator } from "../utils/generators/IdGenerator";
import { Product } from "./Product";
import { SaleItem } from "./saleItem";

/**
 * Representa uma venda no sistema.
 * 
 * Uma venda possui:
 * - um identificador único
 * - uma lista de itens vendidos
 * - um valor total
 * - uma data de realização
 * 
 * Cada item da venda é representado por um SaleItem.
 */
export class Sale{

    /** Identificador da venda */
    private _saleId: number;

    /** Lista de itens presentes na venda */
    private _items: SaleItem[];

     /** Valor total da venda */
    private _total: number;

    /** Data em que a venda foi realizada */
    private _date: string;

    private _isConfirmed: boolean;

    /**
     * Cria uma nova venda.
     * 
     * @param saleId identificador da venda
     * @param date data da venda
     */
    constructor(saleId: number, date: string){
        this._saleId = saleId;
        this._items = [];
        this._total = 0;
        this._date = date;
        this._isConfirmed = false;
    }

    /** Retorna o identificador da venda */
    getSaleId(): number{return this._saleId;}

    /** Retorna os itens da venda */
    getTotal(): number{return this._total;}

    /** Retorna o valor total da venda */
    getDate(): string{return this._date;}

    /**
     * Adiciona um novo item à venda.
     * 
     * Cria um SaleItem baseado no produto e quantidade
     * e adiciona à lista de itens da venda.
     * 
     * @param product produto que será vendido
     * @param quantity quantidade vendida
     * 
     * @throws SaleAlreadyConfirmedError se a venda já estiver finalizada
     * @throws InsufficientStockError se não houver estoque suficiente
     */
    addItem(product: Product, quantity: number){

        if(this._isConfirmed){
            throw new SaleAlreadyConfirmedError();
        }

        if((product.getStock() - quantity) < 0){
            throw new InsufficientStockError();
        }

        const id: number = idGenerator(this.getAllSaleItems().reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.getSaleItemId()), 0));

        const saleItem: SaleItem = new SaleItem(id,product, quantity);

        this._items.push(saleItem);

        this.calculateTotal();

    }

    /**
     * Remove um item da venda pelo identificador.
     * 
     * @param saleItemId identificador do item da venda
     * 
     * @throws SaleAlreadyConfirmedError se a venda já estiver finalizada
     * @throws SaleItemNotFoundError se o item não for encontrado
     */
    removeItem(saleItemId: number){

        if(this._isConfirmed){
            throw new SaleAlreadyConfirmedError();
        }

        const saleItemIndex: number = this._items.findIndex(saleItem => saleItem.getSaleItemId() === saleItemId);

        if(saleItemIndex === -1){
            throw new SaleItemNotFoundError();
        }
        this._items.splice(saleItemIndex, 1);

        this.calculateTotal();
    }

    /**
     * Aumenta a quantidade de um item da venda.
     * 
     * @param saleItemId identificador do item da venda
     * @param quantity quantidade a ser adicionada
     * 
     * @throws SaleAlreadyConfirmedError se a venda já estiver finalizada
     * @throws SaleItemNotFoundError se o item não for encontrado
     * @throws InsufficientStockError se não houver estoque suficiente
     */
    increaseQuantity(saleItemId: number, quantity: number){

        if(this._isConfirmed){
            throw new SaleAlreadyConfirmedError();
        }

        const saleItemFound: SaleItem | undefined = this._items.find(saleItem => saleItem.getSaleItemId() === saleItemId);

        if(!saleItemFound){
            throw new SaleItemNotFoundError();
        }

        if((saleItemFound.getQuantity() + quantity) > saleItemFound.getProduct().getStock()){
            throw new InsufficientStockError();
        }

        saleItemFound.increaseQuantity(quantity);

        this.calculateTotal();
    }

    /**
     * Diminui a quantidade de um item da venda.
     * 
     * Caso a quantidade do item chegue a zero,
     * o item é automaticamente removido da venda.
     * 
     * @param saleItemId identificador do item da venda
     * @param quantity quantidade a ser removida
     * 
     * @throws SaleAlreadyConfirmedError se a venda já estiver finalizada
     * @throws SaleItemNotFoundError se o item não for encontrado
     */
    decreaseQuantity(saleItemId: number, quantity: number){

        if(this._isConfirmed){
            throw new SaleAlreadyConfirmedError();
        }

        const saleItemFound: SaleItem | undefined = this._items.find(saleItem => saleItem.getSaleItemId() === saleItemId);

        if(!saleItemFound){
            throw new SaleItemNotFoundError();
        }

        saleItemFound.decreaseQuantity(quantity);

        if(saleItemFound.getQuantity() === 0){

            this.removeItem(saleItemFound.getSaleItemId());
        }else{

            this.calculateTotal();
        }

    }

    /**
     * Recalcula o valor total da venda com base
     * na soma dos preços totais dos itens.
     */
    private calculateTotal(){

        this._total = this._items.reduce((accumulator, currentValue) => accumulator + currentValue.getTotalPrice(), 0);

    }

    /**
     * Retorna uma cópia da lista de itens da venda.
     * 
     * @returns lista de itens da venda
     */
    getAllSaleItems(): SaleItem[]{

        const copyItems: SaleItem[] = this._items.slice();

        return copyItems;
    }

    /**
     * Confirma a venda.
     * 
     * Valida se todos os itens possuem estoque suficiente
     * e realiza a baixa no estoque dos produtos.
     * 
     * @throws SaleAlreadyConfirmedError se a venda já estiver finalizada
     * @throws EmptySaleError se a venda não possuir itens
     * @throws InsufficientStockError se algum item não possuir estoque suficiente
     */
    confirmSale(){

        if(this._isConfirmed){
            throw new SaleAlreadyConfirmedError();
        }

        if(this._items.length === 0){
            throw new EmptySaleError();
        }

        this._items.forEach(saleItem => { 
            if(saleItem.getQuantity() > saleItem.getProduct().getStock()){
                throw new InsufficientStockError(saleItem.getProduct().getName());
            }
        });

        this._items.forEach(saleItem => {
        saleItem.getProduct().decreaseStock(saleItem.getQuantity());
        });

        this._isConfirmed = true;
    }
}
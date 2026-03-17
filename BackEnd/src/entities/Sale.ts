import { saleItemIdGenerator } from "../utils/generators/saleItemIdGenerator";
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
    get saleId(): number{return this._saleId;}

    /** Retorna os itens da venda */
    get items(): SaleItem[]{return this._items;}

    /** Retorna os itens da venda */
    get total(): number{return this._total;}

    /** Retorna o valor total da venda */
    get date(): string{return this._date;}

    /**
     * Adiciona um novo item à venda.
     * 
     * Cria um SaleItem baseado no produto e quantidade
     * e adiciona ele à lista de itens da venda.
     * 
     * @param product produto que será vendido
     * @param quantity quantidade vendida
     */
    addItem(product: Product, quantity: number){

        if(this._isConfirmed){
            throw new Error("Venda já finalizada!")
        }

        if((product.stock - quantity) < 0){
            throw new Error("Produto com estoque insuficiente!")
        }

        const saleItem: SaleItem = new SaleItem(saleItemIdGenerator(),product, quantity);

        this._items.push(saleItem);

        this.calculateTotal();

    }

    removeItem(saleItemId: number){

        if(this._isConfirmed){
            throw new Error("Venda já finalizada!")
        }

        const saleItemIndex: number = this._items.findIndex(saleItem => saleItem.saleItemId === saleItemId);

        if(saleItemIndex === -1){
            throw new Error("Produto da venda não encontrado!");
        }
        this._items.splice(saleItemIndex, 1);

        this.calculateTotal();
    }

    increaseQuantity(saleItemId: number, quantity: number){

        if(this._isConfirmed){
            throw new Error("Venda já finalizada!")
        }

        const saleItemFound: SaleItem | undefined = this._items.find(saleItem => saleItem.saleItemId === saleItemId);

        if(!saleItemFound){
            throw new Error("Produto da venda não encontrado!");
        }

        if((saleItemFound.quantity + quantity) > saleItemFound.product.stock){
            throw new Error("Produto com estoque insuficiente!")
        }

        saleItemFound.increaseQuantity(quantity);

        this.calculateTotal();
    }

    decreaseQuantity(saleItemId: number, quantity: number){

        if(this._isConfirmed){
            throw new Error("Venda já finalizada!")
        }

        const saleItemFound: SaleItem | undefined = this._items.find(saleItem => saleItem.saleItemId === saleItemId);

        if(!saleItemFound){
            throw new Error("Produto da venda não encontrado!");
        }

        saleItemFound.decreaseQuantity(quantity);

        if(saleItemFound.quantity === 0){

            this.removeItem(saleItemFound.saleItemId);
        }else{

            this.calculateTotal();
        }

    }

    private calculateTotal(){

        this._total = this._items.reduce((accumulator, currentValue) => accumulator + currentValue.totalPrice, 0);

    }

    confirmSale(){

        if(this._isConfirmed){
            throw new Error("Venda já finalizada!")
        }

        if(this._items.length === 0){
            throw new Error("Venda vazia!")
        }

        this._items.forEach(saleItem => { 
            if(saleItem.quantity > saleItem.product.stock){
                throw new Error(saleItem.product.name + " com estoque insuficiente para venda!")
            }
        });

        this._items.forEach(saleItem => {
        saleItem.product.decreaseStock(saleItem.quantity);
        });

        this._isConfirmed = true;
    }
}
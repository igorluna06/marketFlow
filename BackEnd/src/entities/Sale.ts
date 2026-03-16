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

        const saleItem: SaleItem = new SaleItem(product, quantity);

        this._items.push(saleItem);

    }

}
import { Product } from "./Product";
import { SaleItem } from "./saleItem";

export class Sale{

    private _saleId: number;
    private _items: SaleItem[];
    private _total: number;
    private _date: string;

    constructor(saleId: number, date: string){
        this._saleId = saleId;
        this._items = [];
        this._total = 0;
        this._date = date;
    }

    
    get saleId(): number{return this._saleId;}
    get items(): SaleItem[]{return this._items;}
    get total(): number{return this._total;}
    get date(): string{return this._date;}

    addItem(product: Product, quantity: number){

        const saleItem: SaleItem = new SaleItem(product, quantity);

        this._items.push(saleItem);

    }

}
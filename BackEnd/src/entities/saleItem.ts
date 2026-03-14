import { Product } from "./Product";

export class SaleItem {

    private _product: Product;
    private _quantity: number = 0;
    private _totalPrice: number = 0;

    constructor(product: Product, quantity: number){
        this._product = product;
        this.increaseQuantity(quantity);
    }

    get product(): Product{return this._product;}

    get quantity(): number{return this._quantity;}

    get totalPrice(): number{return this._totalPrice};

    increaseQuantity(quantity: number){
        if(quantity <= 0){
            throw new Error("Quantidade não pode ser 0 ou negativo!")
        }

        this._quantity += quantity;
        this._totalPrice = this._product.price * this._quantity;
    }

    decreaseQuantity(quantity: number){
        if(quantity <= 0){
            throw new Error("Quantidade não pode ser 0 ou negativo!")
        }
        this._quantity -= quantity;
        this._totalPrice = this._product.price * this._quantity;
    }

}
import { CartItemNotFoundError } from "../utils/errors/CartItemErrors/CartItemNotFound";
import { idGenerator } from "../utils/generators/IdGenerator";
import { CartItem } from "./CartItem";
import { Product } from "./Product";

export class Cart{

    private _items: CartItem[];
    private _total: number;

    constructor(){
        this._items = [];
        this._total = 0;
    }

    getTotal(): number{return this._total;}

    getAllCartItems(): CartItem[]{
    
        const copyItems: CartItem[] = this._items.slice();
    
        return copyItems;
    }

    addItem(product: Product){

        const cartItemFound: CartItem | undefined = this._items.find(cartItem => cartItem.getProduct().getCode() === product.getCode());

        if(cartItemFound){

            cartItemFound.increaseQuantity();
        }
        else{

            const id: number = idGenerator(this.getAllCartItems().reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.getCartItemId()), 0));

            const cartItem: CartItem = new CartItem(id, product);
        
            this._items.push(cartItem);

        }

        this.calculateTotal();
    }

    increaseQuantityCartItem(cartItemId: number){

        const cartItemFound: CartItem | undefined = this._items.find(cartItem => cartItem.getCartItemId() === cartItemId);

        if(!cartItemFound){
            throw new CartItemNotFoundError();
        }

        cartItemFound.increaseQuantity();

        this.calculateTotal();
    }

    decreaseQuantityCartItem(cartItemId: number){

        const cartItemFound: CartItem | undefined = this._items.find(cartItem => cartItem.getCartItemId() === cartItemId);

        if(!cartItemFound){
            throw new CartItemNotFoundError();
        }

        cartItemFound.decreaseQuantity();

        if(cartItemFound.getQuantity() === 0){
            this.removeCartItem(cartItemFound.getCartItemId());
        }

        this.calculateTotal();
        
    }

    removeCartItem(cartItemId: number){

        const cartItemIndex: number = this._items.findIndex(cartItem => cartItem.getCartItemId() === cartItemId);

        if(cartItemIndex === -1 ){
            throw new CartItemNotFoundError();
        }

        this._items.splice(cartItemIndex, 1);

        this.calculateTotal();

    }

    private calculateTotal(){

        this._total = this._items.reduce((accumulator, currentValue) => accumulator + currentValue.getTotalPrice(), 0);

    }

    clearCart(){

        this._items = [];

        this.calculateTotal();
    }
}
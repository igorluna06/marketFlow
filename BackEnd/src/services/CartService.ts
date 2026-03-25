import { Cart } from "../entities/Cart";

export class CartService{

    private cart: Cart;

    constructor(){
        this.cart = new Cart();
    }

}
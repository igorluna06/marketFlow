export class CartItemNotFoundError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Cart Item not Found");
        this.name = "CartItemNotFoundError";
        this.code = "CART_ITEM_001";
        this.statusCode = 400;
    }
}
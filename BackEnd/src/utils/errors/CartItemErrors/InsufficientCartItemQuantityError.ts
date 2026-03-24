export class InsufficientCartItemQuantityError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Insufficient cart item quantity for this operation");
        this.name = "InsufficientCartItemQuantityError";
        this.code = "CART_ITEM_002";
        this.statusCode = 400;
    }
}
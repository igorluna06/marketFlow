export class InvalidCartItemQuantityError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Invalid cart item quantity for this operation");
        this.name = "InvalidCartItemQuantityError";
        this.code = "CART_ITEM_002";
        this.statusCode = 400;
    }
}
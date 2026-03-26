export class EmptyCartError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Cannot confirm an empty cart");
        this.name = "EmptyCartError";
        this.code = "CART_002";
        this.statusCode = 400;
    }
}
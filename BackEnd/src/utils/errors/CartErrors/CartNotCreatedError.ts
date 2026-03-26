export class CartNotCreatedError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Cart not created");
        this.name = "CartNotCreatedError";
        this.code = "CART_001";
        this.statusCode = 400;
    }
}
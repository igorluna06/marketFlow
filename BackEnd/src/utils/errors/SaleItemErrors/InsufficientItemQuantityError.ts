export class InsufficientItemQuantityError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Insufficient item quantity for this operation");
        this.name = "InsufficientItemQuantityError";
        this.code = "QUANTITY_002";
        this.statusCode = 400;
    }
}
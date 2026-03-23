export class InvalidQuantityError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Quantity must be greater than 0");
        this.name = "InvalidQuantityError";
        this.code = "QUANTITY_001";
        this.statusCode = 400;
    }
}
export class InvalidPriceError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Price must be greater than 0");
        this.name = "InvalidPriceError";
        this.code = "PRICE_001";
        this.statusCode = 400;
    }
}
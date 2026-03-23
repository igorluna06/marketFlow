export class SaleNotFoundError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Sale not Found");
        this.name = "SaleNotFoundError";
        this.code = "SALE_003";
        this.statusCode = 400;
    }
}
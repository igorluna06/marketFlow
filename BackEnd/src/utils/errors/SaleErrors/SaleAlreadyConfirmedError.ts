export class SaleAlreadyConfirmedError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Cannot modify a confirmed sale");
        this.name = "SaleAlreadyConfirmedError";
        this.code = "SALE_001";
        this.statusCode = 400;
    }
}
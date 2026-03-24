export class InsufficientStockError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(nameProduct?: string){

        const message = nameProduct
        ? `Insufficient stock for product: ${nameProduct}`
        : "Insufficient stock for this operation";

        super(message);
        this.name = "InsufficientStockError";
        this.code = "STOCK_002";
        this.statusCode = 400;
    }
}
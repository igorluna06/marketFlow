export class SaleItemNotFoundError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Sale Item not Found");
        this.name = "SaleItemNotFoundError";
        this.code = "SALE_ITEM_001";
        this.statusCode = 400;
    }
}
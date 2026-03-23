export class ProductNotFoundError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Product not Found");
        this.name = "ProductNotFoundError";
        this.code = "PRODUCT_001";
        this.statusCode = 400;
    }
}
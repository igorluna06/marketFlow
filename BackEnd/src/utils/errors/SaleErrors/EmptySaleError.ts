export class EmptySaleError extends Error{

    public readonly code: string;
    public readonly statusCode: number;

    constructor(){

        super("Cannot confirm an empty sale");
        this.name = "EmptySaleError";
        this.code = "SALE_002";
        this.statusCode = 400;
    }
}
export class Product{

    private _id: number;
    readonly _code: string;
    readonly _name: string;
    private _price: number = 0;
    private _stock: number = 0;

    constructor(id: number, code: string, name: string, price: number, stock: number){

        this._id = id;
        this._code = code; 
        this._name = name;
        this.changePrice(price);
        this.increaseStock(stock);
    }

    get id(): number{return this._id;}
    
    get code(): string{return this._code;}

    get name(): string{return this._name;}

    get price(): number{return this._price;}

    get stock(): number{return this._stock;}

    changePrice(newPrice: number){
        if(newPrice <= 0){throw new Error("Preço não pode ser 0 ou negativo!");}
        this._price = newPrice;
    }

    increaseStock(quantity: number){
        if(quantity <= 0){throw new Error("Quantidade não pode ser 0 ou negativa!");}
        this._stock += quantity;
    }

    decreaseStock(quantity: number){
        if(quantity <= 0){throw new Error("Quantidade não pode ser 0 ou negativa!");}
        if((this._stock - quantity) < 0){throw new Error("Estoque insuficiente pra essa quantidade");}
        this._stock -= quantity;
    }

}
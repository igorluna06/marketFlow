/**
 * Representa um produto no sistema.
 *
 * Um produto possui:
 * - id (identificador interno)
 * - código (identificador externo)
 * - nome
 * - preço
 * - estoque (quantidade disponível)
 */

export class Product{

    /** Identificador interno do produto */
    private _id: number;

    /** Código externo do produto */
    private _code: string;

    /** Nome do produto */
    private _name: string;

    /** Preço atual do produto */
    private _price: number = 0;

    /** Quantidade disponível em estoque */
    private _stock: number = 0;

    /**
     * Cria um novo produto.
     *
     * @param id identificador interno
     * @param code código externo do produto
     * @param name nome do produto
     * @param price preço inicial
     * @param stock quantidade inicial em estoque
     */
    constructor(id: number, code: string, name: string, price: number, stock: number){

        this._id = id;
        this._code = code; 
        this._name = name;
        this.changePrice(price);
        this.increaseStock(stock);
    }

    /** Retorna o id do produto */
    get id(): number{return this._id;}

    /** Retorna o código do produto */
    get code(): string{return this._code;}

    /** Retorna o código do produto */
    get name(): string{return this._name;}

    /** Retorna o preço atual do produto */
    get price(): number{return this._price;}

    /** Retorna a quantidade disponível em estoque */
    get stock(): number{return this._stock;}

    /**
     * Altera o preço do produto.
     *
     * @param newPrice novo preço do produto
     * @throws Error se o preço for menor ou igual a zero
     */
    changePrice(newPrice: number){
        if(newPrice <= 0){throw new Error("Preço não pode ser 0 ou negativo!");}
        this._price = newPrice;
    }

    /**
     * Aumenta a quantidade em estoque.
     *
     * @param quantity quantidade adicionada ao estoque
     * @throws Error se a quantidade for menor ou igual a zero
     */
    increaseStock(quantity: number){
        if(quantity <= 0){throw new Error("Quantidade não pode ser 0 ou negativa!");}
        this._stock += quantity;
    }

    /**
     * Diminui a quantidade em estoque.
     *
     * @param quantity quantidade removida do estoque
     * @throws Error se a quantidade for inválida ou se o estoque for insuficiente
     */
    decreaseStock(quantity: number){
        if(quantity <= 0){throw new Error("Quantidade não pode ser 0 ou negativa!");}
        if((this._stock - quantity) < 0){throw new Error("Estoque insuficiente pra essa quantidade");}
        this._stock -= quantity;
    }

}
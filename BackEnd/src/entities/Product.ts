import { InsufficientStockError } from "../utils/errors/ProductErrors/InsufficientStockError";
import { InvalidPriceError } from "../utils/errors/ProductErrors/InvalidPriceError";
import { InvalidQuantityError } from "../utils/errors/ProductErrors/InvalidQuantityError";

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
        this.setPrice(price);
        this.increaseStock(stock);
    }

    /** Retorna o id do produto */
    getId(): number{return this._id;}

    /** Retorna o código do produto */
    getCode(): string{return this._code;}

    /** Retorna o nome do produto */
    getName(): string{return this._name;}

    /** Retorna o preço atual do produto */
    getPrice(): number{return this._price;}

    /** Retorna a quantidade disponível em estoque */
    getStock(): number{return this._stock;}

    /**
     * Altera o preço do produto.
     *
     * @param newPrice novo preço do produto
     * @throws InvalidPriceError se o preço for menor ou igual a zero
     */
    setPrice(newPrice: number){
        if(newPrice <= 0){throw new InvalidPriceError();}
        this._price = newPrice;
    }

    /**
     * Aumenta a quantidade em estoque.
     *
     * @param quantity quantidade adicionada ao estoque
     * @throws InvalidQuantityError se a quantidade for menor ou igual a zero
     */
    increaseStock(quantity: number){
        if(quantity <= 0){throw new InvalidQuantityError();}
        this._stock += quantity;
    }

    /**
     * Diminui a quantidade em estoque.
     *
     * @param quantity quantidade removida do estoque
     * @throws InvalidQuantityError se a quantidade for menor ou igual a zero
     * @throws InsufficientStockError se não houver estoque suficiente
     */
    decreaseStock(quantity: number){
        if(quantity <= 0){throw new InvalidQuantityError();}
        if((this._stock - quantity) < 0){throw new InsufficientStockError();}
        this._stock -= quantity;
    }

    static fromJSON(data: any): Product{

        return new Product(
            data._id,
            data._code,
            data._name,
            data._price,
            data._stock
        );
    }

}
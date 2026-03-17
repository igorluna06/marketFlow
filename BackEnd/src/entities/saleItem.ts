import { Product } from "./Product";

/**
 * Representa um item dentro de uma venda.
 * 
 * Cada item possui:
 * - um produto associado
 * - uma quantidade
 * - um preço total baseado na quantidade e no preço do produto
 * 
 * O preço total do item é recalculado sempre que a quantidade muda.
 */
export class SaleItem {

    private _saleItemId: number;

    /**
     * Produto associado ao item da venda
     */
    private _product: Product;

    /**
     * Quantidade do produto na venda
     */
    private _quantity: number = 0;

    /**
     * Preço total do item (preço do produto * quantidade)
     */
    private _totalPrice: number = 0;

    /**
     * Cria um novo item de venda
     * 
     * @param product produto associado ao item
     * @param quantity quantidade inicial do produto
     */
    constructor(saleItemId: number, product: Product, quantity: number){
        this._product = product;
        this.increaseQuantity(quantity);
        this._saleItemId = saleItemId;
    }

    /**
     * Retorna o produto associado ao item
     */
    get product(): Product{return this._product;}

    /**
     * Retorna a quantidade do produto na venda
     */
    get quantity(): number{return this._quantity;}

    /**
     * Retorna o preço total do item
     */
    get totalPrice(): number{return this._totalPrice};

    get saleItemId(): number{return this._saleItemId};

    /**
     * Aumenta a quantidade do item na venda.
     * 
     * O preço total é recalculado automaticamente
     * baseado no preço do produto.
     * 
     * @param quantity quantidade que será adicionada
     * @throws Error se a quantidade for menor ou igual a zero
     */
    increaseQuantity(quantity: number){
        if(quantity <= 0){
            throw new Error("Quantidade não pode ser 0 ou negativo!")
        }

        this._quantity += quantity;
        this._totalPrice = this._product.price * this._quantity;
    }

    /**
     * Aumenta a quantidade do item na venda.
     * 
     * O preço total é recalculado automaticamente
     * baseado no preço do produto.
     * 
     * @param quantity quantidade que será adicionada
     * @throws Error se a quantidade for menor ou igual a zero
     */
    decreaseQuantity(quantity: number){
        if(quantity <= 0){
            throw new Error("Quantidade não pode ser 0 ou negativo!")
        }

        if((this._quantity - quantity) < 0){
            throw new Error("Quantidade insuficiente!")
        }
        
        this._quantity -= quantity;
        this._totalPrice = this._product.price * this._quantity;
    }

}
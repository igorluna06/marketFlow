import { InvalidQuantityError } from "../utils/errors/productErrors/InvalidQuantityError";
import { InsufficientItemQuantityError } from "../utils/errors/SaleItemErrors/InsufficientItemQuantityError";
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
     * Cria um novo item de venda.
     * 
     * @param saleItemId identificador do item da venda
     * @param product produto associado ao item
     * @param quantity quantidade inicial do produto
     * 
     * @throws InvalidQuantityError se a quantidade for menor ou igual a zero
     */
    constructor(saleItemId: number, product: Product, quantity: number){
        this._saleItemId = saleItemId;
        this._product = product;
        this.increaseQuantity(quantity);
        
    }

    /**
     * Retorna o produto associado ao item
     */
    getProduct(): Product{return this._product;}

    /**
     * Retorna a quantidade do produto na venda
     */
    getQuantity(): number{return this._quantity;}

    /**
     * Retorna o preço total do item
     */
    getTotalPrice(): number{return this._totalPrice};

    /**
     * Retorna o identificador do item da venda
     */
    getSaleItemId(): number{return this._saleItemId};

    /**
     * Aumenta a quantidade do item na venda.
     * 
     * O preço total é recalculado automaticamente
     * com base no preço do produto.
     * 
     * @param quantity quantidade que será adicionada
     * 
     * @throws InvalidQuantityError se a quantidade for menor ou igual a zero
     */
    increaseQuantity(quantity: number){
        if(quantity <= 0){
            throw new InvalidQuantityError();
        }

        this._quantity += quantity;
        this.calculateTotal();
    }

    /**
     * Diminui a quantidade do item na venda.
     * 
     * O preço total é recalculado automaticamente
     * com base no preço do produto.
     * 
     * @param quantity quantidade que será removida
     * 
     * @throws InvalidQuantityError se a quantidade for menor ou igual a zero
     * @throws InsufficientItemQuantityError se a quantidade a remover for maior que a disponível
     */
    decreaseQuantity(quantity: number){
        if(quantity <= 0){
            throw new InvalidQuantityError();
        }

        if((this._quantity - quantity) < 0){
            throw new InsufficientItemQuantityError();
        }
        
        this._quantity -= quantity;
        this.calculateTotal();
    }

    /**
     * Recalcula o preço total do item com base
     * no preço do produto e na quantidade atual.
     */
    private calculateTotal(){

        this._totalPrice = this._product.getPrice() * this._quantity;
    }

}
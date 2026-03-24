import { InsufficientCartItemQuantityError } from "../utils/errors/CartItemErrors/InsufficientCartItemQuantityError";
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
export class CartItem {

    private _cartItemId: number;

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
    constructor(cartItemId: number, product: Product){
        this._cartItemId = cartItemId;
        this._product = product;
        this.increaseQuantity();
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
    getCartItemId(): number{return this._cartItemId};

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
    increaseQuantity(){

        this._quantity ++;
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
    decreaseQuantity(){

        if((this._quantity - 1) < 0){
            throw new InsufficientCartItemQuantityError();
        }

        this._quantity--;
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
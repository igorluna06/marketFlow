import { CartNotCreatedError } from "../utils/errors/CartErrors/CartNotCreatedError";
import { CartItemNotFoundError } from "../utils/errors/CartItemErrors/CartItemNotFound";
import { idGenerator } from "../utils/generators/IdGenerator";
import { CartItem } from "./CartItem";
import { Product } from "./Product";
/**
 * Representa um carrinho de compras temporário.
 * 
 * O carrinho permite adicionar, remover e alterar a quantidade de itens
 * antes da confirmação de uma venda.
 * 
 * Não possui persistência e não altera estoque de produtos.
 */
export class Cart{

    private _items: CartItem[] | null;
    private _total: number;

    /**
     * Inicializa um novo carrinho vazio.
     */
    constructor(){
        this._items = [];
        this._total = 0;
    }

    /**
     * Retorna o valor total do carrinho.
     */
    getTotal(): number{return this._total;}

    /**
     * Retorna todos os itens do carrinho.
     * 
     * @returns cópia da lista de itens
     * @throws CartNotCreatedError se o carrinho não estiver disponível
     */
    getAllCartItems(): CartItem[]{

        if(!this._items){
            throw new CartNotCreatedError();
        }
    
        const copyItems: CartItem[] = this._items.slice();
    
        return copyItems;
    }

    /**
     * Retorna todos os itens do carrinho.
     * 
     * @returns cópia da lista de itens
     * @throws CartNotCreatedError se o carrinho não estiver disponível
     */
    addItem(product: Product){

        if(!this._items){
            throw new CartNotCreatedError();
        }

        const cartItemFound: CartItem | undefined = this._items.find(cartItem => cartItem.getProduct().getCode() === product.getCode());

        if(cartItemFound){

            cartItemFound.increaseQuantity();
        }
        else{

            const id: number = idGenerator(this.getAllCartItems().reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.getCartItemId()), 0));

            const cartItem: CartItem = new CartItem(id, product);
        
            this._items.push(cartItem);

        }

        this.calculateTotal();
    }

    /**
     * Adiciona um produto ao carrinho.
     * 
     * Se o produto já existir no carrinho, sua quantidade é incrementada.
     * Caso contrário, um novo item é criado.
     * 
     * @param product produto a ser adicionado
     * @throws CartNotCreatedError se o carrinho não estiver disponível
     */
    increaseQuantityCartItem(cartItemId: number){

        if(!this._items){
            throw new CartNotCreatedError();
        }

        const cartItemFound: CartItem | undefined = this._items.find(cartItem => cartItem.getCartItemId() === cartItemId);

        if(!cartItemFound){
            throw new CartItemNotFoundError();
        }

        cartItemFound.increaseQuantity();

        this.calculateTotal();
    }

    /**
     * Aumenta a quantidade de um item do carrinho.
     * 
     * @param cartItemId identificador do item
     * @throws CartNotCreatedError se o carrinho não estiver disponível
     * @throws CartItemNotFoundError se o item não for encontrado
     */
    decreaseQuantityCartItem(cartItemId: number){

        if(!this._items){
            throw new CartNotCreatedError();
        }

        const cartItemFound: CartItem | undefined = this._items.find(cartItem => cartItem.getCartItemId() === cartItemId);

        if(!cartItemFound){
            throw new CartItemNotFoundError();
        }

        cartItemFound.decreaseQuantity();

        if(cartItemFound.getQuantity() === 0){
            this.removeCartItem(cartItemFound.getCartItemId());
        }

        this.calculateTotal();
        
    }

    /**
     * Remove um item do carrinho.
     * 
     * @param cartItemId identificador do item
     * @throws CartNotCreatedError se o carrinho não estiver disponível
     * @throws CartItemNotFoundError se o item não for encontrado
     */
    removeCartItem(cartItemId: number){

        if(!this._items){
            throw new CartNotCreatedError();
        }

        const cartItemIndex: number = this._items.findIndex(cartItem => cartItem.getCartItemId() === cartItemId);

        if(cartItemIndex === -1 ){
            throw new CartItemNotFoundError();
        }

        this._items.splice(cartItemIndex, 1);

        this.calculateTotal();

    }

    /**
     * Recalcula o valor total do carrinho com base nos itens atuais.
     * 
     * @throws CartNotCreatedError se o carrinho não estiver disponível
     */
    private calculateTotal(){

        if(!this._items){
            throw new CartNotCreatedError();
        }

        this._total = this._items.reduce((accumulator, currentValue) => accumulator + currentValue.getTotalPrice(), 0);

    }

    /**
     * Limpa o carrinho removendo todos os itens.
     * 
     * Após a limpeza, o carrinho deixa de estar disponível.
     */
    clearCart(){

        this._items = null;

    }
}
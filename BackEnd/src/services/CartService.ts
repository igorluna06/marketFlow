import { Cart } from "../entities/Cart";
import { CartNotCreatedError } from "../utils/errors/CartErrors/CartNotCreatedError";
import { EmptyCartError } from "../utils/errors/CartErrors/EmptyCartError";
import { ProductService } from "./ProductService";
import { SaleService } from "./SaleService";

/**
 * Service responsável por gerenciar o carrinho de compras.
 * 
 * Atua como camada de orquestração entre o carrinho (Cart),
 * produtos (ProductService) e vendas (SaleService).
 * 
 * O carrinho é temporário e não possui persistência.
 */
export class CartService{

    private cart: Cart | null = null;
    private saleService: SaleService;
    private productService: ProductService;

    /**
     * Inicializa o serviço de carrinho com suas dependências.
     * 
     * @param productService serviço de produtos
     * @param saleService serviço de vendas
     */
    constructor(productService: ProductService, saleService: SaleService){
        this.saleService = saleService;
        this.productService = productService;
    }

    /**
     * Cria um novo carrinho.
     * 
     * Substitui qualquer carrinho existente.
     */
    createCart(){

        this.cart = new Cart();

    }

    /**
     * Adiciona um produto ao carrinho com base no código.
     * 
     * @param code código do produto
     * @throws CartNotCreatedError se o carrinho não existir
     */
    addItemToCart(code: string){

        if(!this.cart){
            throw new CartNotCreatedError();
        }

        const productFound = this.productService.getByCode(code);

        this.cart.addItem(productFound);

    }

    /**
     * Adiciona um produto ao carrinho com base no código.
     * 
     * @param code código do produto
     * @throws CartNotCreatedError se o carrinho não existir
     */
    removeItemFromCart(cartItemId: number){

        if(!this.cart){
            throw new CartNotCreatedError();
        }

        this.cart.removeCartItem(cartItemId);

    }

    updateItemQuantity(cartItemId: number, quantity: number){

        if(!this.cart){
            throw new CartNotCreatedError();
        }

        this.cart.updateCartItemQuantity(cartItemId, quantity);
    }

    /**
     * Retorna o carrinho atual.
     * 
     * @returns carrinho
     * @throws CartNotCreatedError se o carrinho não existir
     */
    getCart(): Cart{

        if(!this.cart){
            throw new CartNotCreatedError();
        }

        return this.cart;
    }

    clearCart(){

        if(!this.cart){
            throw new CartNotCreatedError();
        }

        this.cart.clearCart();
    }

    /**
     * Confirma o carrinho atual e o transforma em uma venda.
     * 
     * Fluxo:
     * - valida se o carrinho existe
     * - valida se possui itens
     * - cria uma nova venda
     * - transfere os itens do carrinho para a venda
     * - confirma a venda (validação e atualização de estoque)
     * - limpa o carrinho
     * 
     * @throws CartNotCreatedError se o carrinho não existir
     * @throws EmptyCartError se o carrinho estiver vazio
     */
    confirmCart(){

        if(!this.cart){
            throw new CartNotCreatedError();
        }

        if(this.cart.getAllCartItems().length === 0){
            throw new EmptyCartError();
        }

        const sale = this.saleService.createSale();

        this.cart.getAllCartItems().forEach(item => {
            sale.addItem(item.getProduct(), item.getQuantity());
        })

        this.saleService.confirmSale(sale.getSaleId());

        this.clearCart();
    }



}
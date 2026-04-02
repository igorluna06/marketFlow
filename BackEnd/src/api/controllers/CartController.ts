import { CartService } from "../../services/CartService";
import { Request, Response } from "express";
import { formatCode } from "../../utils/formatter/formatCode";

/**
 * Controller responsável por gerenciar as requisições relacionadas ao carrinho.
 * Atua como intermediário entre as rotas (HTTP) e a lógica de negócio (CartService).
 */
export class CartController{

    private cartService: CartService;
    /**
     * Injeta a dependência do CartService.
     * @param cartService Serviço responsável pelas regras de negócio do carrinho
     */
    constructor(cartService: CartService){
        this.cartService = cartService;
    }

    /**
     * Cria um novo carrinho.
     * @route POST /cart
     */
    createCart(req: Request, res: Response){

        try{
            this.cartService.createCart();
            return res.status(201).json({message: "Carrinho criado com sucesso"});
        }
        catch(error: any){

            return res.status(400).json({message: error.message});
        }
    }

    /**
     * Retorna os dados do carrinho atual.
     * @route GET /cart
     */
    getCart(req: Request, res: Response){

        try{
            
            const cart = this.cartService.getCart();
            return res.json(cart)
        }
        catch(error: any){

            return res.status(400).json({message: error.message});
        }
    }

    /**
     * Remove um item do carrinho com base no ID.
     * @route DELETE /cart/item/:id
     * @param req.params.id ID do item a ser removido
     */
    removeItemFromCart(req: Request, res: Response){

        try{

            const id = Number(req.params.id)
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }
            this.cartService.removeItemFromCart(id);
            return res.status(200).json({message: "Item removido do carrinho com sucesso"});
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }

    /**
     * Remove todos os itens do carrinho.
     * @route DELETE /cart
     */
    clearCart(req: Request, res: Response){

        try{
            this.cartService.clearCart();
            return res.status(200).json({message: "Carrinho limpo com sucesso"});
        }
        catch(error: any){

            return res.status(400).json({message: error.message});
        }
    }

    /**
     * Adiciona um item ao carrinho com base no código do produto.
     * @route POST /cart/item/:code
     * @param req.params.code Código do produto (sem o #, que é adicionado internamente)
     */
    addItemToCart(req: Request, res: Response){

        try{
            const codeParam= String(req.params.code);
            const code = formatCode(codeParam);

            this.cartService.addItemToCart(code);

            return res.status(201).json({message: "Item adicionado ao carrinho com sucesso"});
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }

    /**
     * Atualiza a quantidade de um item no carrinho.
     * @route PUT /cart/item
     * @param req.body.id ID do item
     * @param req.body.quantity Nova quantidade
     */
    updateItemQuantity(req: Request, res: Response){

        try{

            const { id, quantity } = req.body;
            const parsedId = Number(id);
            const parsedQuantity = Number(quantity);
            if (isNaN(parsedId) || isNaN(parsedQuantity)) {
                return res.status(400).json({ message: "id ou quantidade inválidos!" });
            }
            this.cartService.updateItemQuantity(parsedId, parsedQuantity);
            return res.status(200).json({message: "Quantidade do item atualizada com sucesso"});
            
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }

    /**
     * Confirma a compra do carrinho.
     * Converte o carrinho em uma venda.
     * @route POST /cart/confirm
     */
    confirmCart(req: Request, res: Response){

        try{
            this.cartService.confirmCart();
            return res.status(200).json({message: "Compra do carrinho confirmada"});
        }
        catch(error: any){

            return res.status(400).json({message: error.message});
        }
    }
}
import { CartService } from "../../services/CartService";
import { Request, Response } from "express";

export class CartController{

    private cartService: CartService;

    constructor(cartService: CartService){
        this.cartService = cartService;
    }

    createCart(req: Request, res: Response){

        try{
            this.cartService.createCart();
            return res.status(201).json({message: "Carrinho criado com sucesso"});
        }
        catch(error: any){

            return res.status(400).json({message: error.message});
        }
    }

    getCart(req: Request, res: Response){

        try{
            
            const cart = this.cartService.getCart();
            return res.json(cart)
        }
        catch(error: any){

            return res.status(400).json({message: error.message});
        }
    }

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

    clearCart(req: Request, res: Response){

        try{
            this.cartService.clearCart();
            return res.status(200).json({message: "Carrinho limpo com sucesso"});
        }
        catch(error: any){

            return res.status(400).json({message: error.message});
        }
    }

    addItemToCart(req: Request, res: Response){

        try{
            const codeParam= String(req.params.code);
            const code = "#" + codeParam;

            this.cartService.addItemToCart(code);

            return res.status(201).json({message: "Item adicionado ao carrinho com sucesso"});
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }

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
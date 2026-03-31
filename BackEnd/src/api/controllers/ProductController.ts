import { Request, Response } from "express";
import { ProductService } from "../../services/ProductService";

export class ProductController{

    private productService: ProductService;

    constructor(productService: ProductService){
        this.productService = productService;
    }

    getAllProducts(req: Request, res: Response){

        try{
            const products = this.productService.takeAllProducts();
            return res.json(products);
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
        
    }

    createProduct(req: Request, res: Response){

        try{
            const {name, price, quantity} = req.body;

            this.productService.createProduct(name, price, quantity);

            return res.status(201).json({message: "Produto criado com sucesso"});
        }
        catch(error: any){

            return res.status(400).json({ message: error.message });
        }
    }

    getProductByCode(req: Request, res: Response){

        try{

            const codeParam = String(req.params.code);
            const code = "#" + codeParam;

            const product = this.productService.getByCode(code);

            return res.json(product);

        }
        catch(error: any){

            return res.status(400).json({ message: error.message });
        }
    }

    removeProduct(req: Request, res: Response){

        try{

            const codeParam = String(req.params.code);
            const code = "#" + codeParam;
            this.productService.deleteProduct(code);
            return res.status(200).json({message: "Produto removido com sucesso"});;
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }

    addStock(req: Request, res: Response){

        try{

            const codeParam = req.params.code;
            const {quantity} = req.body;
            const parsedCode = String(codeParam);
            const code = "#" + parsedCode;
            const parsedQuantity = Number(quantity);
            if (isNaN(parsedQuantity)) {
                return res.status(400).json({ message: "Quantidade inválida" });
            }
            this.productService.addStock(parsedQuantity,code);
            return res.status(200).json({message: "Estoque adicionado com sucesso"});
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }

    removeStock(req: Request, res: Response){

        try{

            const codeParam = req.params.code;
            const {quantity} = req.body;
            const parsedCode = String(codeParam);
            const code = "#" + parsedCode;
            const parsedQuantity = Number(quantity);
            if (isNaN(parsedQuantity)) {
                return res.status(400).json({ message: "Quantidade inválida" });
            }
            this.productService.removeStock(parsedQuantity,code);
            return res.status(200).json({message: "Estoque removido com sucesso"});
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }

}
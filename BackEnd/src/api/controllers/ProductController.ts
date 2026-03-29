import { Request, Response } from "express";
import { ProductService } from "../../services/ProductService";

export class ProductController{

    private productService: ProductService;

    constructor(productService: ProductService){
        this.productService = productService;
    }

    getAll(req: Request, res: Response){

        try{
            const products = this.productService.takeAllProducts();
            return res.json(products);
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
        
    }

    create(req: Request, res: Response){

        try{
            const {name, price, quantity} = req.body;

            this.productService.createProduct(name, price, quantity);

            return res.status(201).json({message: "Produto criado com sucesso"});
        }
        catch(error: any){

            return res.status(400).json({ message: error.message });
        }
    }

    getByCode(req: Request<{code: string}>, res: Response){

        try{

            const code = req.params.code;

            const product = this.productService.getByCode(code);

            return res.json(product);

        }
        catch(error: any){

            return res.status(400).json({ message: error.message });
        }
    }

}
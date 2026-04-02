import { Request, Response } from "express";
import { ProductService } from "../../services/ProductService";
import { formatCode } from "../../utils/formatter/formatCode";
import { CreateProductDTO } from "../Dto/productDTO/CreateProductDTO";
import { StockDTO } from "../Dto/productDTO/StockDTO";

/**
 * Controller responsável por gerenciar as requisições relacionadas aos produtos.
 * Faz a ponte entre as rotas HTTP e a lógica de negócio (ProductService).
 */
export class ProductController{

    private productService: ProductService;
    /**
     * Injeta a dependência do ProductService.
     * @param productService Serviço responsável pelas regras de negócio dos produtos
     */
    constructor(productService: ProductService){
        this.productService = productService;
    }
    /**
     * Retorna todos os produtos cadastrados.
     * @route GET /products
     */
    getAllProducts(req: Request, res: Response){

        try{
            const products = this.productService.takeAllProducts();
            return res.json(products);
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
        
    }
    /**
     * Cria um novo produto.
     * @route POST /products
     * @param req.body.name Nome do produto
     * @param req.body.price Preço do produto
     * @param req.body.quantity Quantidade inicial em estoque
     */
    createProduct(req: Request, res: Response){

        try{
            const {name, price, quantity}: CreateProductDTO = req.body;

            this.productService.createProduct(name, price, quantity);

            return res.status(201).json({message: "Produto criado com sucesso"});
        }
        catch(error: any){

            return res.status(400).json({ message: error.message });
        }
    }
    /**
     * Remove um produto com base no código.
     * @route DELETE /products/:code
     * @param req.params.code Código do produto (sem o #)
     */
    removeProduct(req: Request, res: Response){

        try{

            const codeParam = String(req.params.code);
            const code = formatCode(codeParam);
            this.productService.deleteProduct(code);
            return res.status(200).json({message: "Produto removido com sucesso"});;
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }
    /**
     * Busca um produto pelo código.
     * @route GET /products/:code
     * @param req.params.code Código do produto (sem o #)
     */
    getProductByCode(req: Request, res: Response){

        try{

            const codeParam = String(req.params.code);
            const code = formatCode(codeParam);

            const product = this.productService.getByCode(code);

            return res.json(product);

        }
        catch(error: any){

            return res.status(400).json({ message: error.message });
        }
    }
    /**
     * Adiciona quantidade ao estoque de um produto.
     * @route PATCH /products/:code/add-stock
     * @param req.params.code Código do produto
     * @param req.body.quantity Quantidade a ser adicionada
     */
    addStock(req: Request, res: Response){

        try{

            const codeParam = String(req.params.code);
            const {quantity}: StockDTO = req.body;
            const code = formatCode(codeParam);
            if (isNaN(quantity)) {
                return res.status(400).json({ message: "Quantidade inválida" });
            }
            this.productService.addStock(quantity,code);
            return res.status(200).json({message: "Estoque adicionado com sucesso"});
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }
    /**
     * Remove quantidade do estoque de um produto.
     * @route PATCH /products/:code/remove-stock
     * @param req.params.code Código do produto
     * @param req.body.quantity Quantidade a ser removida
     */
    removeStock(req: Request, res: Response){

        try{

            const codeParam = String(req.params.code);
            const {quantity}: StockDTO = req.body;
            const code = formatCode(codeParam);
            if (isNaN(quantity)) {
                return res.status(400).json({ message: "Quantidade inválida" });
            }
            this.productService.removeStock(quantity,code);
            return res.status(200).json({message: "Estoque removido com sucesso"});
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }

}
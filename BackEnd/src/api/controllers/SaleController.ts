import { Request, Response } from "express";
import { SaleService } from "../../services/SaleService";

/**
 * Controller responsável por gerenciar as requisições relacionadas às vendas.
 * Atua como intermediário entre as rotas HTTP e a lógica de negócio (SaleService).
 */
export class SaleController{

    private saleService: SaleService;
    /**
     * Injeta a dependência do SaleService.
     * @param saleService Serviço responsável pelas regras de negócio das vendas
     */
    constructor(saleService: SaleService){
        this.saleService = saleService;
    }
    /**
     * Retorna todas as vendas registradas.
     * @route GET /sales
     */
    getAllSales(req: Request, res: Response){

        try{

            const sales = this.saleService.getAllSales();
            return res.json(sales);
        }
        catch(error: any){

            return res.status(400).json({message: error.message});
        }

    }
    /**
     * Retorna uma venda específica com base no ID.
     * @route GET /sales/:id
     * @param req.params.id ID da venda
     */
    getSaleById(req: Request, res: Response){

        try{

            const id = Number(req.params.id);
            const sale = this.saleService.getSaleById(id);
            return res.json(sale);
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }
}
import { Request, Response } from "express";
import { SaleService } from "../../services/SaleService";

export class SaleController{

    private saleService: SaleService;

    constructor(saleService: SaleService){
        this.saleService = saleService;
    }

    getAllSales(req: Request, res: Response){

        try{

            const sales = this.saleService.getAllSales();
            return res.json(sales);
        }
        catch(error: any){

            return res.status(400).json({message: error.message});
        }

    }

    getSaleById(req: Request, res: Response){

        try{

            const id = Number(req.params.id);
            const sale = this.saleService.getSaleById(id);
            res.json(sale);
        }
        catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }
}
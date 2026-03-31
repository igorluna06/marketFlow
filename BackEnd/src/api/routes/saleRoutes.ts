import { Router } from "express";
import { SaleController } from "../controllers/SaleController";
import { saleService } from "../container/services";

const router = Router();
const service = saleService;
const controller = new SaleController(service);

router.get("/", (req,res) => controller.getAllSales(req,res));
router.get("/:id", (req,res) => controller.getSaleById(req,res));

export default router;
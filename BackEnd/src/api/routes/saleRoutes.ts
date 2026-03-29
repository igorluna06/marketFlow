import { Router } from "express";
import { SaleController } from "../controllers/SaleController";
import { saleService } from "../container/services";

const router = Router();
const service = saleService
const controller = new SaleController(service);

router.get("/", controller.getAllSales)
router.get("/:id", controller.getSaleById)
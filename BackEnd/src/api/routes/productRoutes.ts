import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { productService } from "../container/services";

const router = Router();
const service = productService
const controller = new ProductController(service);

router.get("/", controller.getAll)
router.post("/", controller.create)
router.get("/:code", controller.getByCode)
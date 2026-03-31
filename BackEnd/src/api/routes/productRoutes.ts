import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { productService } from "../container/services";

const router = Router();
const service = productService;
const controller = new ProductController(service);

router.get("/", (req,res) => controller.getAll(req,res));
router.post("/", (req,res) => controller.create(req,res));
router.get("/:code", (req,res) => controller.getByCode(req,res));

export default router;
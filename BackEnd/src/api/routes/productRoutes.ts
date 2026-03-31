import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { productService } from "../container/services";

const router = Router();
const service = productService;
const controller = new ProductController(service);

router.get("/", (req,res) => controller.getAllProducts(req,res));
router.post("/", (req,res) => controller.createProduct(req,res));
router.get("/:code", (req,res) => controller.getProductByCode(req,res));
router.patch("/:code/stock/add", (req,res) => controller.addStock(req,res));
router.patch("/:code/stock/remove", (req,res) => controller.removeStock(req,res));
router.delete("/:code", (req,res) => controller.removeProduct(req,res));


export default router;
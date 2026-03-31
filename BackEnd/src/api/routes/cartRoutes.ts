import { Router } from "express";
import { CartController } from "../controllers/CartController";
import { cartService } from "../container/services";

const router = Router();
const service = cartService;
const controller = new CartController(service);

router.post("/", (req,res) => controller.createCart(req, res));
router.get("/", (req,res) => controller.getCart(req, res));
router.delete("/", (req,res) => controller.clearCart(req, res));

router.post("/items/:code", (req,res) => controller.addItemToCart(req, res));
router.put("/items", (req,res) => controller.updateItemQuantity(req, res));
router.delete("/items/:id", (req,res) => controller.removeItemFromCart(req, res));

export default router;

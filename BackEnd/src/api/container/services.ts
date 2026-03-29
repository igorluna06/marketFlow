import { ProductService } from "../../services/ProductService";
import { SaleService } from "../../services/SaleService";
import { CartService } from "../../services/CartService";


const productService = new ProductService();
const saleService = new SaleService(productService);
const cartService = new CartService(productService, saleService);


export {
    productService,
    saleService,
    cartService
};
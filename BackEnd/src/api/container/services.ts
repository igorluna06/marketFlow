import { ProductService } from "../../services/ProductService";
import { SaleService } from "../../services/SaleService";
import { CartService } from "../../services/CartService";

/**
 * Instância do serviço de produtos.
 * Responsável por gerenciar operações relacionadas aos produtos.
 */
const productService = new ProductService();

/**
 * Instância do serviço de vendas.
 * Depende do ProductService para validar e acessar dados dos produtos.
 */
const saleService = new SaleService(productService);

/**
 * Instância do serviço de carrinho.
 * Depende do ProductService para manipulação de produtos
 * e do SaleService para finalização das vendas.
 */
const cartService = new CartService(productService, saleService);

/**
 * Exportação centralizada das instâncias dos serviços.
 * Facilita a reutilização e evita múltiplas instanciações.
 */
export {
    productService,
    saleService,
    cartService
};
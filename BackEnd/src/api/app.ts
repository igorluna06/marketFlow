import express from "express";
import productRoutes from "./routes/productRoutes";
import saleRoutes from "./routes/saleRoutes";
import cartRoutes from "./routes/cartRoutes";
/**
 * Instância principal da aplicação Express.
 */
const app = express();
/**
 * Middleware responsável por permitir o uso de JSON no corpo das requisições.
 */
app.use(express.json());
/**
 * Registro das rotas da aplicação.
 * Cada grupo de rotas é responsável por um recurso específico.
 */
app.use("/products", productRoutes); // Rotas relacionadas a produtos
app.use("/sales", saleRoutes); // Rotas relacionadas a vendas
app.use("/cart", cartRoutes); // Rotas relacionadas ao carrinho

/**
 * Exporta a aplicação configurada para ser utilizada no server.
 */
export default app;
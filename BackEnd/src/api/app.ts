import express from "express";
import productRoutes from "./routes/productRoutes";
import saleRoutes from "./routes/saleRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/sales", saleRoutes);
app.use("/cart", cartRoutes);

export default app;
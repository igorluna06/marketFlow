import { ProductService } from "./services/ProductService";
import { SaleService } from "./services/SaleService";

function main(){

    const productService = new ProductService();
    const saleService = new SaleService(productService);

    console.log(productService.takeAllProducts());
    console.log(saleService.getAllSales());

}

main();

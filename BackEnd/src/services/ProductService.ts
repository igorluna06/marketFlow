import { ProductRepository } from "../repository/ProductRepository";
import { Product } from "../entities/Product";
import { idGenerator} from "../utils/generators/IdGenerator";
import { nameValidator } from "../utils/validators/nameValidator";
import { codeValidator } from "../utils/validators/codeValidator";
import { InvalidPriceError } from "../utils/errors/ProductErrors/InvalidPriceError";
import { InvalidQuantityError } from "../utils/errors/ProductErrors/InvalidQuantityError";
import { ProductNotFoundError } from "../utils/errors/ProductErrors/ProductNotFoundError";

/**
 * Serviço responsável por gerenciar operações relacionadas a produtos.
 * 
 * Atua como camada de aplicação entre:
 * - validações
 * - geração de id
 * - repositório de produtos
 * - entidade Product
 * 
 * Responsabilidades:
 * - validar dados de entrada
 * - criar produtos
 * - atualizar estoque
 * - remover produtos
 * - consultar produtos
 */
export class ProductService{

    /**
     * Repositório utilizado para persistência dos produtos
     */
    private productRepository: ProductRepository;

    /**
     * Inicializa o serviço criando uma instância do repositório
     */
    constructor(){

        this.productRepository = new ProductRepository();
    }

    /**
     * Cria um novo produto no sistema.
     * 
     * Caso já exista um produto com o mesmo código,
     * o sistema apenas incrementa o estoque.
     * 
     * @param code código do produto
     * @param name nome do produto
     * @param price preço do produto
     * @param quantity quantidade inicial em estoque
     * 
     * @throws InvalidPriceError se o preço for menor ou igual a zero
     * @throws InvalidQuantityError se a quantidade for menor ou igual a zero
     */
    createProduct(code: string, name: string, price: number, quantity: number){

        codeValidator(code);
        nameValidator(name);

        if(price <= 0){
            throw new InvalidPriceError();
        }
        if(quantity <= 0){
            throw new InvalidQuantityError();
        }

        const productFound: Product | undefined = this.productRepository.findByCode(code);

        if(productFound){
            productFound.increaseStock(quantity);
            
        }else{

            const id: number= idGenerator(this.takeAllProducts().reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.getId()), 0));
            const product: Product = new Product(id, code, name, price, quantity);

            this.productRepository.addProduct(product);
        }

    }

    /**
     * Busca um produto pelo código.
     * 
     * @param code código do produto
     * @returns produto encontrado
     * 
     * @throws ProductNotFoundError se o produto não existir
     */
    getByCode(code: string): Product{

        codeValidator(code);

        const productFound: Product | undefined = this.productRepository.findByCode(code);

        if(!productFound){
            throw new ProductNotFoundError();
        }

        return productFound;

    }

    /**
     * Atualiza um produto existente no repositório.
     * 
     * @param product produto atualizado
     */
    updateProduct(product: Product){

        this.productRepository.update(product);
    }

    /**
     * Adiciona quantidade ao estoque de um produto.
     * 
     * @param quantity quantidade a ser adicionada
     * @param code código do produto
     * 
     * @throws ProductNotFoundError se o produto não existir
     * @throws InvalidQuantityError se a quantidade for menor ou igual a zero
     */
    addStock(quantity: number, code: string){

        codeValidator(code);

        const productFound: Product = this.getByCode(code);

        productFound.increaseStock(quantity);

        this.updateProduct(productFound);
    }

    /**
     * Remove quantidade do estoque de um produto.
     * 
     * @param quantity quantidade a ser removida
     * @param code código do produto
     * 
     * @throws ProductNotFoundError se o produto não existir
     * @throws InvalidQuantityError se a quantidade for menor ou igual a zero
     * @throws InsufficientStockError se não houver estoque suficiente
     */
    removeStock(quantity: number, code: string){

        codeValidator(code);

        const productFound: Product = this.getByCode(code);

        productFound.decreaseStock(quantity);

        this.updateProduct(productFound);
    }

    /**
     * Remove um produto do sistema.
     * 
     * @param code código do produto
     * 
     * @throws ProductNotFoundError se o produto não existir
     */
    deleteProduct(code: string){

        codeValidator(code);

        const productFound: Product = this.getByCode(code);

        this.productRepository.delete(productFound);

    }

    /**
     * Retorna todos os produtos cadastrados no sistema.
     * 
     * @returns lista de produtos
     */
    takeAllProducts(): Product[]{
        return this.productRepository.findAll();;
    }
}
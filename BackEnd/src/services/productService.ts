import { ProductRepository } from "../repository/ProductRepository";
import { Product } from "../entities/Product";
import { idGenerator} from "../utils/generators/IdGenerator";
import { nameValidator } from "../utils/validators/nameValidator";
import { codeValidator } from "../utils/validators/codeValidator";

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
     * @param stock quantidade inicial em estoque
     * 
     * @throws Error se o preço ou estoque forem menores ou iguais a zero
     */
    createProduct(code: string, name: string, price: number, stock: number){

        codeValidator(code);
        nameValidator(name);

        if(price <= 0){
            throw new Error("Preço não pode ser 0 ou negativo")
        }
        if(stock <= 0){
            throw new Error("Quantidade não pode ser 0 ou negativo")
        }

        const productFound: Product | undefined = this.productRepository.findByCode(code);

        if(productFound){
            productFound.increaseStock(stock);
            
        }else{

            const id: number= idGenerator(this.takeAllProducts().reduce((accumulator, currentValue) => Math.max(accumulator, currentValue.id), 0));
            const product: Product = new Product(id, code, name, price, stock);

            this.productRepository.addProduct(product);
        }

    }

    /**
     * Atualiza um produto existente no repositório
     * 
     * @param product produto atualizado
     */
    updateProduct(product: Product){

        this.productRepository.update(product);
    }

    /**
     * Adiciona estoque a um produto existente
     * 
     * @param quantity quantidade a ser adicionada
     * @param code código do produto
     * 
     * @throws Error se o produto não existir
     */
    addStock(quantity: number, code: string){

        codeValidator(code);

        const productFound: Product | undefined = this.productRepository.findByCode(code);

        if(!productFound){
            throw new Error("Produto não encontrado!");
        }

        productFound.increaseStock(quantity);

        this.updateProduct(productFound);
    }

    /**
     * Remove quantidade do estoque de um produto
     * 
     * @param quantity quantidade a ser removida
     * @param code código do produto
     * 
     * @throws Error se o produto não existir
     */
    removeStock(quantity: number, code: string){

        codeValidator(code);

        const productFound: Product | undefined = this.productRepository.findByCode(code);

        if(!productFound){
            throw new Error("Produto não encontrado!");
        }

        productFound.decreaseStock(quantity);

        this.updateProduct(productFound);
    }

    /**
     * Remove um produto do sistema
     * 
     * @param code código do produto
     * 
     * @throws Error se o produto não existir
     */
    deleteProduct(code: string){

        codeValidator(code);

        const productFound: Product | undefined = this.productRepository.findByCode(code);

        if(!productFound){
            throw new Error("Produto não encontrado!");
        }

        this.productRepository.delete(productFound);

    }

    /**
     * Retorna todos os produtos cadastrados no sistema
     * 
     * @returns lista de produtos
     */
    takeAllProducts(): Product[]{
        return this.productRepository.findAll();;
    }
}
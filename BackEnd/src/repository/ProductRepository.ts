import { Product } from "../entities/Product";
import fs from "fs";
import path from "path";
import { reconstructEntities } from "../utils/reconstructors/entityReconstructor";

/**
 * Repositório responsável por persistir e recuperar produtos.
 * 
 * Os produtos são armazenados em um arquivo JSON localizado em /data/products.json.
 * 
 * Responsabilidades:
 * - carregar produtos do arquivo ao iniciar
 * - salvar alterações no arquivo
 * - adicionar, atualizar e remover produtos
 * - buscar produtos por id ou código
 */

export class ProductRepository{

    /**
     * Lista de produtos carregados do arquivo JSON
     */
    private products: Product[];

    /**
     * Caminho absoluto do arquivo onde os produtos são armazenados
     */
    private filePath: string;


    /**
     * Inicializa o repositório carregando os produtos do arquivo JSON
     */
    constructor(){
        this.filePath = path.join(__dirname, "../data/products.json");

        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        const rawArray = JSON.parse(fileContent);

        this.products = reconstructEntities(rawArray, Product);
    }

     /**
     * Salva o estado atual da lista de produtos no arquivo JSON
     */
    private saveJson(){

        fs.writeFileSync(
            this.filePath,
            JSON.stringify(this.products, null, 2)
        );

    }

    /**
     * Adiciona um novo produto ao repositório
     * 
     * @param product produto a ser adicionado
     */
    addProduct(product: Product){
        this.products.push(product);
        this.saveJson();
    }

    /**
     * Busca um produto pelo código
     * 
     * @param code código do produto
     * @returns produto encontrado ou undefined caso não exista
     */
    findByCode(code: string): Product | undefined{

        const productFound: Product | undefined = this.products.find(product => product.getCode() === code);

        return productFound;
    }

    /**
     * Busca um produto pelo id
     * 
     * @param id identificador interno do produto
     * @returns produto encontrado ou undefined caso não exista
     */
    findById(id: number): Product | undefined{

        const productFound: Product | undefined = this.products.find(product => product.getId() === id);

        return productFound;
    }

    /**
     * Remove um produto do repositório
     * 
     * @param productDelete produto que será removido
     */
    delete(productDelete: Product){

        const productIndexRemove: number= this.products.findIndex(product => product.getId() === productDelete.getId());

        this.products.splice(productIndexRemove, 1);

        this.saveJson();

    }

    /**
     * Atualiza um produto existente
     * 
     * @param productUpdate produto com os novos dados
     */
    update(productUpdate: Product){

        const productIndexUpdate: number= this.products.findIndex(product => product.getId() === productUpdate.getId());

        this.products[productIndexUpdate] = productUpdate;

        this.saveJson();
    }

    /**
     * Retorna todos os produtos cadastrados
     * 
     * Retorna uma cópia da lista para evitar alterações diretas
     * no estado interno do repositório.
     * 
     * @returns lista de produtos
     */
    findAll(): Product[]{

        const copyProducts: Product[] = this.products.slice();

        return copyProducts;
    }
}
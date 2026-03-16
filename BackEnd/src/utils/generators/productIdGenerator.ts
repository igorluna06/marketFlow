/**
 * Contador interno utilizado para gerar identificadores únicos
 * para produtos dentro da aplicação.
 */
let countProduct = 0;

/**
 * Gera um novo identificador incremental para produtos.
 * 
 * Cada chamada da função incrementa o contador interno
 * e retorna um novo número único.
 * 
 * Este gerador é utilizado no momento da criação de um produto
 * dentro do ProductService.
 * 
 * @returns número identificador único do produto
 */
export function productIdGenerator(): number{

    countProduct++;
    return countProduct;

}

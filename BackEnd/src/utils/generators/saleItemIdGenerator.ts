/**
 * Contador interno utilizado para gerar identificadores únicos
 * para produtos dentro da aplicação.
 */
let countSaleItem = 0;

/**
 * Gera um novo identificador incremental para produtos da venda.
 * 
 * Cada chamada da função incrementa o contador interno
 * e retorna um novo número único.
 * 
 * Este gerador é utilizado no momento da criação de um produto da vendo
 * dentro do Sale
 * 
 * @returns número identificador único do produto da venda
 */
export function saleItemIdGenerator(): number{

    countSaleItem++;
    return countSaleItem;

}

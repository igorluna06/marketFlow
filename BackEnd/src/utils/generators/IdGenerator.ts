
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
export function idGenerator(id: number): number{

    id++ 
    return id;

}

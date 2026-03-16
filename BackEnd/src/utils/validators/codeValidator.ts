import { containsOnlyNumbers } from "./stringValidator";
/**
 * Valida o formato do código de um produto.
 * 
 * Regras do código:
 * - deve possuir exatamente 5 caracteres
 * - deve começar com "#"
 * - os 4 caracteres restantes devem ser números
 * 
 * Exemplo válido:
 *#1234
 * 
 * @param code código do produto a ser validado
 * @throws Error caso o código não esteja no formato esperado
 */
export function codeValidator(code: string){

    if(code.length !== 5){
        throw new Error("Código deve ter apenas 5 caracteres");
    }

    if(code[0] !== "#"){
        throw new Error("Código deve começar com #");
    }

    if(!containsOnlyNumbers(code.slice(1))){
        throw new Error("Código deve conter 4 números");
    }
}
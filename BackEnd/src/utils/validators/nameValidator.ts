import {containsOnlyLettersAndSpaces} from "./stringValidator";

/**
 * Valida o nome de um produto.
 * 
 * Regras:
 * - não pode ser vazio
 * - deve conter apenas letras e espaços
 * - deve possuir pelo menos 3 caracteres
 * 
 * @param name nome do produto a ser validado
 * @throws Error caso o nome não respeite as regras definidas
 */
export function nameValidator(name: string): void{

    if(!name || name.trim().length === 0){
        throw new Error("Nome não pode ser vazio!");
    }

    if(!containsOnlyLettersAndSpaces(name)){
        throw new Error("Nome apenas pode conter letras e espaços!")
    }

    if(name.length < 3){
        throw new Error("Mínimo 3 caracteres!");
    }

};


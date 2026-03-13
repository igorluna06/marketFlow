import { containsOnlyNumbers } from "./stringValidator";

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
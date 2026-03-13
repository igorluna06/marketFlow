import {containsOnlyLettersAndSpaces} from "./stringValidator";

export function nameValidator(name: string): void{

    if(!name || name.trim().length === 0){
        throw new Error("Nome não pode ser vazio!");
    }

    if(!containsOnlyLettersAndSpaces){
        throw new Error("Nome apenas pode conter letras e espaços!")
    }

    if(name.length < 3){
        throw new Error("Mínimo 3 caracteres!");
    }

};


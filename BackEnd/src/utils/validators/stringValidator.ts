/**
 * Verifica se um texto contém apenas letras e espaços.
 * 
 * A função permite caracteres acentuados comuns no português.
 * 
 * @param text texto que será validado
 * @returns true se o texto contiver apenas letras e espaços, caso contrário false
 */
export function containsOnlyLettersAndSpaces(text: string){

        const justLetterAndSpace = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/;

        return justLetterAndSpace.test(text);
};

/**
 * Verifica se um texto contém apenas números.
 * 
 * @param text texto que será validado
 * @returns true se o texto contiver apenas números, caso contrário false
 */
export function containsOnlyNumbers(text: string){

        const justNumbers = /^\d+$/;

        return justNumbers.test(text);
};
export function containsOnlyLettersAndSpaces(text: string){

        const justLetterAndSpace = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/;

        return justLetterAndSpace.test(text);
};
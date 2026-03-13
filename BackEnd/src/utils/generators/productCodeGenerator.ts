export function productCodeGenerator(): string{

    let randomNumber: string = Math.floor(Math.random() * 99999).toString();

    const randomCode: string = "#" + randomNumber;

    return randomCode;
}
export function codeGenerator(lastCodeNumber: number): string {
    const newCodeNumber = lastCodeNumber + 1;

    const formattedNumber = newCodeNumber
        .toString()
        .padStart(4, '0');

    return `#${formattedNumber}`;
}
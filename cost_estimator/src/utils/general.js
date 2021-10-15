export const roundUpTo2Decimals = (number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}
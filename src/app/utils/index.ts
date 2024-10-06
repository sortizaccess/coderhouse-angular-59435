// Falta validar que no se repitan los Ids
export function generarIdRandom(): number {
    return Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
}
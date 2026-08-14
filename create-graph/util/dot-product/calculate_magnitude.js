import { dot_product } from "./dot_product.js"




export function calculate_magnitude({vector}) {

    return Math.sqrt( dot_product({vector1: vector, vector2: vector}) )
}
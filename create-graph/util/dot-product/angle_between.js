import { calculate_magnitude } from "./calculate_magnitude.js"
import { dot_product } from "./dot_product.js"









export function angle_between({vector1, vector2}) {

    return Math.acos( 
        dot_product({vector1, vector2}) / ( calculate_magnitude({vector: vector1}) * calculate_magnitude({vector: vector2}) )
    ) * (180 / Math.PI)
}
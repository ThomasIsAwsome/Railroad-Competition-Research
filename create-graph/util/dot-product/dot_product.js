












export function dot_product({vector1, vector2}) {

    let result = 0

    for (let i = 0; i < vector1.length; i++) {
        result += vector1[i] * vector2[i]
    }

    return result
}
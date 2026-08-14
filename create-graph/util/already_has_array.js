









export function already_has_array({array, array_of_arrays}) {

    let has = false

    for (let i = 0; i < array_of_arrays.length; i++) {
        if (JSON.stringify(array) === JSON.stringify(array_of_arrays[i])) {
            has = true
        }
    }

    return has
}
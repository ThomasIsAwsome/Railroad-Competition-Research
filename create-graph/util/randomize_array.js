







export function randomize_array({array}) {

    let array_length = array.length
    let randomized_array = []

    for (let i = 0; i < array_length; i++) {

        let randomIndex = Math.floor( Math.random() * array.length )

        randomized_array.push(array[randomIndex])
        array.splice(randomIndex, 1)
    }

    return randomized_array
}
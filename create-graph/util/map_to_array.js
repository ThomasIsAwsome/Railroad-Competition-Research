









export function map_to_array({map}) {

    let nodes = []

    for (const [key, value] of map) {

        let split = key.split('_')

        nodes.push([
            parseFloat( split[0] ), 
            parseFloat( split[1] )
        ])
    }

    return nodes
}
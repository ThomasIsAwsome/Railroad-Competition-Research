










export function remove_repeats({nodes}) {

    let map = new Map()

    let unique_nodes = []

    for (let i = 0; i < nodes.length; i++) {

        //if we already have the node in our array
        let already_in_array = map.has( `${nodes[i][0]}_${nodes[i][1]}` ) === true

        if (already_in_array === false) {

            map.set( `${nodes[i][0]}_${nodes[i][1]}`, 0)
            unique_nodes.push(nodes[i])       
        }

        // console.log(`${(i / nodes.length) * 100}%`)
    }

    return unique_nodes
}
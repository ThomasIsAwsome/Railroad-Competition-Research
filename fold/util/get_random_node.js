









//this function gets a random node within an array of nodes
export function get_random_node({nodes}) {    

    //get a random node
    let random_index = Math.floor( Math.random() * nodes.length )
    let random_node = nodes[ random_index ]

    //if the node is null, keep searching for another node
    if (random_node === null) {

        let counter = random_index

        while (3 === 3) {

            if (counter > nodes.length - 1) {
                counter = 0
            }

            if (nodes[counter] !== null) {
                random_node = nodes[counter]
                break
            }

            counter ++
        }
    }

    return random_node
}
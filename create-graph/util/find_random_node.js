









//this function finds a random node within a map of blocks
export function find_random_node({blocks}) {

    let keys = Array.from(blocks.keys())
    let random_index = Math.floor( Math.random() * keys.length )
    let index = random_index
    let counter = 0

    while (3 === 3) {

        let block = blocks.get(keys[index]) //get a random block

        //if the block has nodes in it, get a random node from that block
        if (block.size > 0) {

            let nodes = Array.from( block.keys() )
            let random_node = nodes[ Math.floor( Math.random() * nodes.length ) ]

            return {
                random_node: [
                    parseFloat( random_node.split('_')[0] ),
                    parseFloat( random_node.split('_')[1] )
                ]
            }
        }

        //if it has no nodes, keep searching for another node
        else if (block.size === 0) {
            
            counter ++
            index ++

            //if we have serached through all of the blocks, return null
            if (counter === keys.length) {
                return { random_node: null }
            }

            //if the index becomes equal to the amount of blcoks, restart the index and put it at the beginning
            if (index === keys.length) {
                index = 0
            }
        }
    }
}
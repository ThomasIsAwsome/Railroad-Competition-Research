import { find_random_node } from "../../create-graph/util/find_random_node.js"
import { get_node_location } from "../../create-graph/util/get_node_location.js"
import { remove_node } from "../../create-graph/util/remove_node.js"
import { find_closest_node } from "./find_closest_node.js"
import { get_random_node } from "./get_random_node.js"
import { get_surrounding_nodes } from "./get_surrounding_nodes.js"
import { round_to } from "./round_to.js"







//this function requires there to be no repeats within an array
export function fold_once({blocks, nodes, block_size}) {

    let folded_nodes = []
    let original_nodes_length = nodes.length

    let nodes_map = new Map(nodes.map((node, index) => [ `${node[0]}_${node[1]}`, index ]));

    for (let i = 0; i < Math.floor( original_nodes_length / 2 ); i++) {

        let random_node = get_random_node({nodes})

        let surrounding_nodes = get_surrounding_nodes({ 
            node: random_node, 
            blocks, 
            block_size
        })

        let { closest_node } = find_closest_node({
            node: random_node,
            nodes: surrounding_nodes
        })

        if (closest_node !== null) {

            let midpoint = [
                (random_node[0] + closest_node[0]) / 2,
                (random_node[1] + closest_node[1]) / 2
            ]

            folded_nodes.push(midpoint)
            
            remove_node({ node: random_node, blocks, block_size })
            remove_node({ node: closest_node, blocks, block_size })

            let random_node_key = `${random_node[0]}_${random_node[1]}`
            let closest_node_key = `${closest_node[0]}_${closest_node[1]}`

            nodes[ nodes_map.get(random_node_key) ] = null 
            nodes[ nodes_map.get(closest_node_key) ] = null
        }

        // console.log(`${ (100 - (nodes.length / original_nodes_length)) * 100 }%`)

        console.log(i, original_nodes_length)
    }

    return folded_nodes
}
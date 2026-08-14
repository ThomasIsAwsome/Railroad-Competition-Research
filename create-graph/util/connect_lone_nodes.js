import { find_closest_node } from "../../fold/util/find_closest_node.js"
import { get_surrounding_nodes } from "../../fold/util/get_surrounding_nodes.js"
import { blockify_nodes } from "./blockify_nodes.js"










export function connect_lone_nodes({graph, nodes, blocks, original_blocks, block_size}) {

    //make a new set of blocks that are larger
    let larger_block_size = block_size * 2
    let larger_blocks = blockify_nodes({ nodes, block_size: larger_block_size }).blocks

    //loop throught only the nodes that are lonely to find a nearby node to connect it to
    for (const [key, value] of blocks) {

        if (value.size > 0) {

            let [firstKey] = value.keys()

            let node = [
                parseFloat(firstKey.split('_')[0]),
                parseFloat(firstKey.split('_')[1])
            ]

            let surrounding_nodes = get_surrounding_nodes({
                node, 
                blocks: larger_blocks, 
                block_size: larger_block_size
            })

            let { closest_node, distance } = find_closest_node({ node, nodes: surrounding_nodes })

            if (closest_node !== null) {
                
                graph.get(`${node[0]}_${node[1]}`).push(closest_node)
            }
        }
    }    
}
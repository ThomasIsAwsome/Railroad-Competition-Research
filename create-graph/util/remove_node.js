import { get_node_location } from "./get_node_location.js"







export function remove_node({node, blocks, block_size}) {
  
    let block_location = get_node_location({ node, block_size })

    let node_key = `${node[0]}_${node[1]}`

    blocks.get(`${block_location.x_location}_${block_location.y_location}`).delete(node_key)
}
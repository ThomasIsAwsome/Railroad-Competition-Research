import { get_node_location } from "../../create-graph/util/get_node_location.js"
import { round_to } from "./round_to.js"






export function get_surrounding_nodes({node, blocks, block_size}) {

    let { x_location, y_location } = get_node_location({ node, block_size })

    let center_block = blocks.get(`${x_location}_${y_location}`)

    let surrounding_blocks = new Map([
        ...blocks.get(`${x_location}_${y_location - block_size}`) || new Map(), //bottom
        ...blocks.get(`${x_location}_${y_location + block_size}`) || new Map(), //top
        ...blocks.get(`${x_location - block_size}_${y_location}`) || new Map(), //left
        ...blocks.get(`${x_location + block_size}_${y_location}`) || new Map(), //right
        ...blocks.get(`${x_location + block_size}_${y_location - block_size}`) || new Map(), //top right
        ...blocks.get(`${x_location - block_size}_${y_location - block_size}`) || new Map(), //top left
        ...blocks.get(`${x_location + block_size}_${y_location + block_size}`) || new Map(), //bottom right
        ...blocks.get(`${x_location - block_size}_${y_location + block_size}`) || new Map() //bottom left
    ])

    let surrounding_nodes = new Map([...center_block, ...surrounding_blocks])

    return surrounding_nodes
}
import { find_closest_node } from "../../../fold/util/find_closest_node.js"
import { get_surrounding_nodes } from "../../../fold/util/get_surrounding_nodes.js"
import { round_to } from "../../../fold/util/round_to.js"
import { blockify_nodes } from "../blockify_nodes.js"




export function get_dist_stats({nodes}) {

    let block_size = 50 //this is an estamate
    let { blocks } = blockify_nodes({ nodes, block_size })

    let total_distances = 0
    let distances = []
    let distribution = new Map()

    //find the average distance of the closest node
    for (let i = 0; i < nodes.length; i++) {

        let surrounding_nodes = get_surrounding_nodes({ node: nodes[i], blocks, block_size })
        let { closest_node, distance } = find_closest_node({ node: nodes[i], nodes: surrounding_nodes })
        
        if (closest_node !== null) {

            distances.push(distance)

            //sum up the total distances to find the average later
            total_distances += distance
        }

        else {
            console.log('null')
        }
    }

    //go through our disribution
    distances = distances.slice().sort((a, b) => a - b);

    return {
        average: total_distances / nodes.length,
        distances
    }
}
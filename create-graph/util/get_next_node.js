import { get_surrounding_nodes } from "../../fold/util/get_surrounding_nodes.js"
import { calculate_dist } from "./calculate_dist.js"
import { angle_between } from "./dot-product/angle_between.js"
import { map_to_array } from "./map_to_array.js"
import { organize_node_distances } from "./organize_node_distances.js"







export function get_next_node({node, previous_node, blocks, block_size, max_node_distance}) {

    let max_turn_angle = 60

    //get surrounding nodes
    let surrounding_nodes = get_surrounding_nodes({node: node, blocks, block_size})
    let nodes = map_to_array({ map: surrounding_nodes })

    //organize the surrounding ndoes into an array where the first is the closest and the last is the farthest
    let organized = organize_node_distances({ 
        node,
        nodes,
    })

    let next_node = organized[0] || null // get the closest one. if the array is empty, return null.

    //go through each node in our array and determin if it is within the given turn angle
    for (let i = 0; i < organized.length; i++) {

        let vector1 = [
            (node[0] - previous_node[0]) ,
            (node[1] - previous_node[1]),
        ]

        let vector2 = [
            organized[i][0] - node[0],
            organized[i][1] - node[1],
        ]               


        let angle = angle_between({ 
            vector1,
            vector2
        })


        if (angle > max_turn_angle) {
            next_node = organized[i + 1] || null
        }

        else {
            break
        }
    }

    if (next_node !== null) {
        let distance = calculate_dist({
            x1: node[0],
            x2: next_node[0],
            y1: node[1],
            y2: next_node[1]
        })

        if (distance > max_node_distance) {
            
            console.log(`too long at ${next_node}`)
            next_node = null 
        }
    }


    return next_node
}

// (0.09563202420927795 * 2)
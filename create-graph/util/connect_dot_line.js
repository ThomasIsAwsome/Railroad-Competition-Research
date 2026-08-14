import { find_closest_node } from "../../fold/util/find_closest_node.js"
import { get_surrounding_nodes } from "../../fold/util/get_surrounding_nodes.js"
import { get_next_node } from "./get_next_node.js"
import { map_to_array } from "./map_to_array.js"
import { remove_node } from "./remove_node.js"








export function connect_dot_line({graph, start_node, previous_node, blocks, block_size, max_node_distance}) {

    let keep_running = false
    let dead_end_node;
    let current_node = start_node
    let on_occupied = false
    let times_since_on_occupied = 0
    let max_times_on_occupied = 15
    let traversed_nodes = new Map()

    traversed_nodes.set(`${previous_node[0]}_${previous_node[1]}`, 0)
    traversed_nodes.set(`${start_node[0]}_${start_node[1]}`, 0)

    while (6 !== 7) {

        //find our next node from our unexplored list
        let next_node = get_next_node({ 
            node: current_node, 
            previous_node,
            blocks,
            block_size,
            max_node_distance
        })

        //if we have no next node, top this loop entirely
        if (next_node === null)  {
            dead_end_node = current_node
            break
        }

        //keep running and add to our graph
        else {

            //see if the next node has already been traversed
            let traversed = traversed_nodes.get(`${next_node[0]}_${next_node[1]}`) === 0

            //if we have already traversed this
            if (traversed === true) {
                break
            }

            else if (traversed === false) {
                graph.get(`${current_node[0]}_${current_node[1]}`).push(next_node)
                traversed_nodes.set(`${next_node[0]}_${next_node[1]}`, 0)
                previous_node = current_node
                current_node = next_node
            }
        }        
    }


    return {  
        dead_end_node,
        traversed_nodes
    }
}
import { find_closest_node } from "../../fold/util/find_closest_node.js"
import { get_random_node } from "../../fold/util/get_random_node.js"
import { get_surrounding_nodes } from "../../fold/util/get_surrounding_nodes.js"
import { remove_repeats } from "../../fold/util/remove_repeats.js"
import { blockify_nodes } from "./blockify_nodes.js"
import { connect_dot_line } from "./connect_dot_line.js"
import { find_random_node } from "./find_random_node.js"
import { get_node_location } from "./get_node_location.js"
import { remove_node } from "./remove_node.js"




export function connect_dots({nodes, blocks, block_size, max_node_distance}) {

    let graph = new Map()
    let searchable_graph = new Map()
    let dead_ends = []

    nodes.forEach(([x, y]) => {
        graph.set(`${x}_${y}`, [])
        searchable_graph.set(`${x}_${y}`, 0)
    });

    console.log("/////////// connecting dots //////////////")

    let round_count = 0
    while (searchable_graph.size > 0) {

        let first_node = get_random_node_from_map({map: searchable_graph})

        //if there is a random node
        if (first_node !== null) {

            let surrounding_nodes = get_surrounding_nodes({ node: first_node, blocks, block_size })
            let second_node = find_closest_node({ node: first_node, nodes: surrounding_nodes }).closest_node
            
            //if there is also as second node
            if (second_node !== null) {

                let line1 = connect_dot_line({
                    start_node: second_node,
                    previous_node: first_node,
                    graph,
                    nodes,
                    blocks,
                    block_size,
                    max_node_distance
                })

                let line2 = connect_dot_line({
                    start_node: first_node,
                    previous_node: second_node,
                    graph,
                    nodes,
                    blocks,
                    block_size,
                    max_node_distance
                })

                graph.get(`${first_node[0]}_${first_node[1]}`).push(second_node)
                dead_ends.push(line1.dead_end_node)
                dead_ends.push(line2.dead_end_node)

                remove_searchable_nodes({nodes_graph: searchable_graph, nodes_to_remove: line1.traversed_nodes})
                remove_searchable_nodes({nodes_graph: searchable_graph, nodes_to_remove: line2.traversed_nodes})
                
                console.log(`line1_length: ${line1.traversed_nodes.size}, line2_length: ${line2.traversed_nodes.size}`)
            }
        }        

        console.log(`round_count: ${round_count}, searched_nodes_count: ${searchable_graph.size}, nodes_length: ${nodes.length}`)
        round_count += 1
    }

    console.log(`dead_ends_length: ${dead_ends.length}`)

    return { 
        graph
    }
}


function remove_searchable_nodes({nodes_graph, nodes_to_remove}) {

    for (const [key, value] of nodes_to_remove) {
        nodes_graph.delete(key)  
    }

    // return nodes_graph
}

function get_random_node_from_map({map}) {
  if (map.size === 0) return null;
  const randomIndex = Math.floor(Math.random() * map.size);
  
  const iterator = map.keys();
  for (let i = 0; i < randomIndex; i++) {
    iterator.next();
  }
  
  let key = iterator.next().value

  return [parseFloat(key.split('_')[0]), parseFloat(key.split('_')[1])];
}
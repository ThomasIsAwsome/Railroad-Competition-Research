import { stringify_node_to_key } from "./stringify_node_to_key.js";



export function update_table({table, nearby_nodes, current_node}) {

    let current_path_dist = table.get(stringify_node_to_key({ node: current_node })).shortest_distance

    nearby_nodes.forEach(({node, distance}, index) => {
        
        let nearby_node = node
        let nearby_node_distance = distance
        let nearby_node_key = stringify_node_to_key({ node: nearby_node })
        let { shortest_distance, previous_node } = table.get(nearby_node_key)
        let proposed_distance = nearby_node_distance + current_path_dist

        if (proposed_distance < shortest_distance) {

            table.get(nearby_node_key).shortest_distance = proposed_distance
            table.get(nearby_node_key).previous_node = current_node
        }
    });

    return table
}
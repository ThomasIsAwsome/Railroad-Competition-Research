import { get_graph } from "./util/get_graph.js"
import { remove_visitted } from "./util/remove_visitted.js"
import { sortPointsByDistance } from "./util/sortPointsByDistance.js"
import { stringify_node_to_key } from "./util/stringify_node_to_key.js"
import { update_table } from "./util/update_table.js"






function Dijkstra({graph, starter_node}) {

    let table = new Map()

    let starter_node_key = stringify_node_to_key({node: starter_node})
    let current_node = starter_node
    let visited = new Set([starter_node_key]); // initialize at this point
    let nodes_array = []

    // construct the table and the nodes array
    for (const key of graph.keys()) {
        let node = [parseFloat(key.split('_')[0]), parseFloat(key.split('_')[1])]
        nodes_array.push(node)
        table.set(key, {shortest_distance: Infinity, previous_node: null})
    }

    //initialize the starter node
    table.get(starter_node_key).shortest_distance = 0
    
    let original_graph_length = graph.size
    let last_node_key;
    let round = 0

    while (visited.size < original_graph_length - 2) {

        let current_node_key = stringify_node_to_key({node: current_node})
        let connected_to = graph.get(current_node_key)
        let remaining = remove_visitted({ nodes: connected_to, visitedSet: visited })
        let current_node_distance = table.get(current_node_key).shortest_distance

        round += 1

        if (remaining.length > 0) {

            let sorted = sortPointsByDistance({
                node: current_node, 
                nodes: remaining
            })

            update_table({ table, nearby_nodes: sorted, current_node })
        }

        let next_node = get_next_node({table, visited})
        visited.add(stringify_node_to_key({node: current_node}))
        current_node = next_node
    }


    return table
}



let graph = get_graph({ file_location: "test-graphs/test_graph_9.json" })
let table =  Dijkstra({ graph, starter_node: [ 95, 90 ] })

console.log(table)






function get_next_node({table, visited}) {

    let smallest = Infinity
    let next_node;

    for (const [key, value] of table) {

        let node = [parseFloat(key.split('_')[0]), parseFloat(key.split('_')[1])]
        let { shortest_distance } = value 

        if (visited.has(key) === false && shortest_distance < smallest) {

            smallest = shortest_distance
            next_node = node
        }
    }

    return next_node
}
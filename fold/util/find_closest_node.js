import { calculate_dist } from "../../create-graph/util/calculate_dist.js";












export function find_closest_node({node, nodes}) {

    let shortest_dist = 100
    let closest_node = null
    let distance;

    nodes.delete(`${node[0]}_${node[1]}`)

    for (let key of nodes.keys()) {

        let longitude = parseFloat( key.split('_')[0] )
        let latitude = parseFloat( key.split('_')[1] )
    
        let dist = calculate_dist({
            x1: longitude,
            x2: node[0],
            y1: latitude,
            y2: node[1]
        })
        
        if (dist < shortest_dist) {

            shortest_dist = dist
            closest_node = [longitude, latitude]
            distance = dist
        }
    }

    return {closest_node, distance}
}
import { calculate_dist } from "./calculate_dist.js";








export function organize_node_distances({node, nodes}) {

    let organized = []

    //loop through the nodes array to remove any node that is the same as the node passed into this function
    nodes.forEach((element, index) => {
        if (JSON.stringify(element) === JSON.stringify(node)) {
            nodes.splice(index, 1)
        }
    });

    let original_nodes_length = nodes.length

    //nested loop to loop through the array to find the nodes
    for (let i = 0; i < original_nodes_length; i++) {

        let shortest = 1_000_000
        let closest;
        let index;

        for (let j = 0; j < nodes.length; j++) {

            let dist = calculate_dist({ x1: node[0], y1: node[1], x2: nodes[j][0], y2: nodes[j][1] })

            if (dist < shortest) {

                shortest = dist 
                closest = nodes[j]
                index = j
            }

        }

        nodes.splice(index, 1)
        organized.push(closest)
    }

    return organized
}
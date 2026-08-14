import { Mercator } from "./Mercator.js"




export function project_graph({graph, width, height}) {

    let projected_graph = new Map()

    for (let [key, connected_to] of graph) {

        //change the lat, lon to x, y for the main node
        let latitude = parseFloat(key.split('_')[0])
        let longitude = parseFloat(key.split('_')[1])

        let { x, y } = Mercator({ latitude, longitude })

        x += 15_000
        y = height - y

        let node = [x, y]

        //loop through the connecting nodes to map them to Mercator
        let connecting = []
        
        for (let i = 0; i < connected_to.length; i++) {

            let { x, y } = Mercator({ latitude: connected_to[i][0], longitude: connected_to[i][1] })

            x += 15_000
            y = height - y

            connecting.push([ x, y ])
        }
        
        projected_graph.set(`${node[0]}_${node[1]}`, connecting)
    }

    return {
        projected_graph
    }
}
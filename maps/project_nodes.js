import { Mercator } from "./Mercator.js";




export function project_nodes({nodes, width, height}) {

    console.log('projecting nodes')

    let radius = 63_78.1
    let projected = []

    nodes.forEach(([latitude, longitude], index) => {
        
        let { x, y } = Mercator({ latitude, longitude })

        x += 15_000
        y = height - y

        projected.push([ x, y ])
    });


    return {
        projected
    }
}
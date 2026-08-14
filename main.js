import fs from 'fs'
import { draw_nodes } from './draw/draw_nodes.js';
import { draw_graph } from './draw/draw_graph.js';
import { create_graph } from './create-graph/create_graph.js';
import { project_nodes } from './maps/project_nodes.js';
import { Mercator } from './maps/Mercator.js';
import { project_graph } from './maps/project_graph.js';
import { remove_wild_nodes } from './create-graph/util/remove-wild-nodes/remove_wild_nodes.js';
import { create_usable_railway_dataset } from './format-data/create_usable_railway_dataset.js';
import { fold } from './fold/fold.js';






// let width = 10_000
// let height = 10_000
// let nodes = JSON.parse( fs.readFileSync('railways/northfolk-southern/folded/folded6.json', 'utf-8') )

// let { projected } = project_nodes({nodes, width, height})
// draw_nodes({
//     width,
//     height,
//     nodes: projected,
//     save_to: 'test-pictures/northfolk-southern-dotted.png'
// })

// let { graph } = create_graph({ nodes })
// let { projected_graph } = project_graph({ graph, width, height })

// draw_graph({
//     width,
//     height,
//     graph: projected_graph,
//     save_to: 'test-pictures/northfolk-southern-graph.png'
// })







let nodes = JSON.parse(fs.readFileSync('test-data/test15.json', 'utf-8'))

let { graph } = create_graph({ nodes })

draw_graph({
    width: 1000,
    height: 1000,
    graph,
    save_to: 'test-pictures/test-graph.png'
})

draw_nodes({
    width: 1000,
    height: 1000,
    nodes,
    save_to: 'test-pictures/test-dotted.png'
})










// let nodes = JSON.parse( fs.readFileSync('railways/northfolk-southern/northfolk-southern-track-locations.json', 'utf-8') )

// let folded = fold({
//     nodes,
//     rounds: 10
// })

// folded.forEach((fold, index) => {

//     fs.writeFileSync(`railways/northfolk-southern/folded/folded${index + 1}.json`, JSON.stringify(fold, null, 2))
// })
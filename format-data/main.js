import { draw_nodes } from "../draw/draw_nodes.js"
import { project_nodes } from "../maps/project_nodes.js"
import { create_usable_railway_dataset } from "./create_usable_railway_dataset.js"
import fs from 'fs'

let file_paths = [
    // 'railways/bnsf/raw-bnsf.geojson',
    // 'railways/cpkc/raw-cpkc.geojson',
    // 'railways/csx/raw-csx.geojson',
    // 'railways/national/raw-national.geojson',
    // 'railways/northfolk-southern/raw-northfolk-southern.geojson',
    // 'railways/union-pacific/raw-union-pacific.geojson',
]

//go through everysingle file path and reformat the geo json data into proper, usable json data
for (let i = 0; i < file_paths.length; i++) {

    let railway_name = file_paths[i].split('/')[1].trim()

    create_usable_railway_dataset({
        file_path: file_paths[i],
        railway_name
    })
}


let width = 10_000
let height = 10_000
let railway_names = [
    'bnsf',
    'cpkc',
    'csx',
    'northfolk-southern',
    'union-pacific'
]

//go through each of the railways dataeset and perform a folding operation on each one and create a photo of each one
for (let i = 0; i < railway_names.length; i++) {

    let name = railway_names[i]

    let folded = fold({
        nodes: JSON.parse( fs.readFileSync(`railways/${name}/${name}-track-locations.json`, 'utf-8') ),
        rounds: 10,
    })

    folded.forEach((folded_nodes, index) => {

        fs.writeFileSync(`railways/${name}/folded/folded${index + 1}.json`, JSON.stringify(folded_nodes, null, 2), 'utf-8')
        
        let { projected } = project_nodes({
            nodes: folded_nodes,
            width,
            height
        })

        draw_nodes({
            width,
            height,
            nodes: projected,
            save_to: `railways/${name}/photos/folded-photo${index + 1}.png`
        })
    });
}
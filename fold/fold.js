import { draw_nodes } from "../draw/draw_nodes.js"
import { blockify_nodes } from "../create-graph/util/blockify_nodes.js"
import { fold_once } from "./util/fold_once.js"
import { remove_repeats } from "./util/remove_repeats.js"
import fs from 'fs'






export function fold({nodes, rounds}) {

    let block_size = 0.5
    let folded = nodes

    let list = []

    for (let i = 0; i < rounds; i++) {
    
        folded = remove_repeats({ nodes: folded })

        let { blocks } = blockify_nodes({ 
            nodes: folded, 
            block_size
        })

        folded = fold_once({ 
            nodes: folded,
            blocks,
            block_size
        }) 

        list.push(folded)
    }

    return list
}
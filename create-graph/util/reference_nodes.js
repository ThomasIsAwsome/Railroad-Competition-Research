import { already_has_array } from "./already_has_array.js"










export function reference_nodes({graph}) {

    for (let [key, connected_to] of graph) {

        let node = [parseFloat(key.split('_')[0]), parseFloat(key.split('_')[1])]

        for (let i = 0; i < connected_to.length; i++) {

            let search = `${connected_to[i][0]}_${connected_to[i][1]}`
            let insertable_value = [node[0], node[1]]

            let has = already_has_array({ 
                array: insertable_value, 
                array_of_arrays: graph.get(search) 
            })

            if (has === false) {
                graph.get(search).push(insertable_value)
            }
        }
    }
}
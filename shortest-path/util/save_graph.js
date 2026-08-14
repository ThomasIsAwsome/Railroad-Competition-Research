import fs from 'fs'








export function save_graph({graph, save_to}) {
    fs.writeFileSync(save_to, JSON.stringify(Object.fromEntries(graph), null, 2), 'utf-8')
}
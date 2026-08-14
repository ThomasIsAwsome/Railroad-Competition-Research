import fs from 'fs'





export function get_graph({file_location}) {
    const jsonObject = JSON.parse( fs.readFileSync(file_location) )
    const map = new Map(Object.entries(jsonObject));
    return map
}
import { get_node_location } from "./get_node_location.js"








export function blockify_nodes({nodes, block_size}) {

  let blocks = new Map()

  console.log("/////////// blockifying nodes //////////////")

  nodes.forEach(([x, y], index) => {

    let { x_location, y_location } = get_node_location({ node: [x, y], block_size })

    let block_location = `${x_location}_${y_location}`

    if (blocks.get(block_location)) {
        
        blocks.get(block_location).set(`${x}_${y}`, 0)
      }

      else {
          blocks.set(block_location, new Map().set(`${x}_${y}`, 0))
      }

      console.log(`${(index / nodes.length) * 100}%`)
  })


  return {
      blocks,
  }
}
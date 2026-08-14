







export function get_node_location({node, block_size}) {

  let [ x, y ] = node

  return {
    x_location: (Math.floor( x / block_size ) ) * block_size,
    y_location: (Math.floor( y / block_size ) ) * block_size
  }
} 
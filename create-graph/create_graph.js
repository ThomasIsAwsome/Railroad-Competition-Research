import fs from 'fs'
import { connect_dots } from './util/connect_dots.js'
import { blockify_nodes } from './util/blockify_nodes.js'
import { remove_repeats } from '../fold/util/remove_repeats.js'
import { find_closest_node } from '../fold/util/find_closest_node.js'
import { get_surrounding_nodes } from '../fold/util/get_surrounding_nodes.js'
import { reference_nodes } from './util/reference_nodes.js'
import { map_to_array } from './util/map_to_array.js'
import { connect_lone_nodes } from './util/connect_lone_nodes.js'
import { randomize_array } from './util/randomize_array.js'
import { remove_wild_nodes } from './util/remove-wild-nodes/remove_wild_nodes.js'
import { get_dist_stats } from './util/remove-wild-nodes/get_dist_stats.js'







export function create_graph({nodes}) {

    //prepare our data before connecting the dots into a graph like structure
    nodes = remove_repeats({ nodes })
    nodes = randomize_array({ array: nodes })

    let { average, distances } = get_dist_stats({nodes})
    let median = getMedian({numbers: distances})
    let top = getTopPercentileValue({numbers: distances, topPercent: 5})
    let largest = distances.pop()
    console.log(`average_distance: ${average}, median: ${median}, top: ${top}, largest: ${largest}`)

    let block_size = largest * 10

    console.log(`block_size: ${block_size}`)
    let { blocks } = blockify_nodes({ nodes, block_size })

    //connect the dots in a graph
    let { graph } = connect_dots({ nodes, blocks, block_size, max_node_distance: largest * 1.5 })

    //add every dot in the graph and make it universal accross the graph
    reference_nodes({ graph })

    return { graph }
}


function getMedian({numbers}) {
  if (!numbers || numbers.length === 0) return null;

  // Create a copy so we don't mutate the original array, then sort numerically
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  // If length is odd, return middle element
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }

  // If length is even, return average of the two middle elements
  return (sorted[mid - 1] + sorted[mid]) / 2;
}


function getTopPercentileValue({numbers, topPercent}) {
  if (!numbers || numbers.length === 0) return null;
  if (topPercent <= 0) return Math.max(...numbers);
  if (topPercent >= 100) return Math.min(...numbers);

  // 1. Sort numbers ascending
  const sorted = [...numbers].sort((a, b) => a - b);
  
  // 2. Convert "Top X%" to the corresponding lower percentile p (e.g., top 10% = 90th percentile)
  const p = (100 - topPercent) / 100;
  
  // 3. Compute exact fractional index using the (N - 1) * p rank formula
  const index = (sorted.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;

  // 4. Linearly interpolate between bounds if fractional
  return sorted[lower] + weight * (sorted[upper] - sorted[lower]);
}
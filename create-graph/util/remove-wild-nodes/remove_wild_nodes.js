import { find_closest_node } from "../../../fold/util/find_closest_node.js";
import { get_surrounding_nodes } from "../../../fold/util/get_surrounding_nodes.js";
import { round_to } from "../../../fold/util/round_to.js";
import { blockify_nodes } from "../blockify_nodes.js";
import { get_dist_stats } from "./get_dist_stats.js";






export function remove_wild_nodes({nodes, top_percentage}) {

   let block_size = 50 //this is an estamate

   let { blocks } = blockify_nodes({ nodes, block_size })

   let { average, distances } = get_dist_stats({ nodes, blocks, block_size })
   
   let limiting_max_distance = distances[Math.floor(distances.length - ((top_percentage / 100) * distances.length))]

   //loop through all of our nodes and remove the ones that are too far away
   let qualified = []
   
   for (let i = 0; i < nodes.length; i++) {
      
      let surrounding_nodes = get_surrounding_nodes({ node: nodes[i], blocks, block_size })
      let { closest_node, distance } = find_closest_node({ node: nodes[i], nodes: surrounding_nodes })
      
      if (closest_node !== null && distance < limiting_max_distance) {

         qualified.push(nodes[i])
      }
   }


   return {
      qualified_nodes: qualified,
      average_distance: average,
   }
}







function r_wild_nodes({nodes, top_percentage}) {

   //get 100 random nodes
   let sample_nodes = []
   let sample_size = Math.floor(nodes.length * 0.1)

   for (let i = 0; i < sample_size; i++) {
      sample_nodes.push(
         nodes[Math.floor(Math.random() * nodes.length)]
      )
   }

   let block_size = 15 //this is an estamate
   let { blocks } = blockify_nodes({ nodes, block_size })

   let total_distances = 0
   let average;

   for (let i = 0; i < sample_nodes.length; i++) {

        let surrounding_nodes = get_surrounding_nodes({ node: nodes[i], blocks, block_size })
        let { closest_node, distance } = find_closest_node({ node: nodes[i], nodes: surrounding_nodes })

        total_distances += distance
   }

   average = total_distances / sample_nodes.length





}
import fs from 'fs'
import * as PImage from "pureimage";








export function draw_nodes({width, height, nodes, save_to}) {

  console.log(`drawing nodes to save to: ${save_to}`)

  const image = PImage.make(width, height);
  const ctx = image.getContext("2d");

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, image.width, image.height);

  //for union pacific railways
  ctx.fillStyle = "green";

  nodes.forEach(node => {
      
        let x = node[0] 
        let y = node[1] 


        ctx.beginPath(); 
        ctx.arc(x, y, 2, 0, 2 * Math.PI); 
        ctx.fill();
  });


  PImage.encodePNGToStream(image, fs.createWriteStream(save_to))
  .then(() => {
  console.log(`Finsihed DRawing the nodes to ${save_to}`);
  })
  .catch((e) => {
  console.log("there was an error writing");
  });
}
import fs from 'fs'
import * as PImage from "pureimage";












export function draw_railway({railways, save_to}) {
    
  const image = PImage.make(18_000 , 18_000 / 2);
  const ctx = image.getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, image.width, image.height);

  //for union pacific railways
  ctx.fillStyle = "orange";

  railways.forEach(track => {
      
      let { coordinates } = track

      let first_vertex = coordinates[0]
      let last_vertex = coordinates[coordinates.length - 1]

      let [ longitude1, latitude1 ] = first_vertex
      let [ longitude2, latitude2 ] = last_vertex

      let x1 = ((longitude1 + 180) / 360) * image.width
      let y1 =((90 - latitude1) / 180) * image.height

      let x2 = ((longitude2 + 180) / 360) * image.width
      let y2 =((90 - latitude2) / 180) * image.height

      ctx.beginPath(); 
      ctx.arc(x1, y1, 1, 0, 2 * Math.PI); 
      ctx.fill();
      
      ctx.beginPath(); 
      ctx.arc(x2, y2, 1, 0, 2 * Math.PI); 
      ctx.fill();

      // coordinates.forEach(([longitude, latitude]) => {
          
      //     let x = ((longitude + 180) / 360) * image.width
      //     let y =((90 - latitude) / 180) * image.height

      //     ctx.beginPath(); // Start a new path
      //     ctx.arc(x, y, 1, 0, 2 * Math.PI); //
      //     ctx.fill(); // Fill the circle with the current fillStyle
      // })

  });







  PImage.encodePNGToStream(image, fs.createWriteStream(save_to))
  .then(() => {
  console.log("finished!!!!!");
  })
  .catch((e) => {
  console.log("there was an error writing");
  });
}





import fs from 'fs'
import * as PImage from "pureimage";









export function draw_graph({width, height, graph, save_to}) {

    console.log(`drawing graph to save to: ${save_to}`)

    const image = PImage.make(width, height);
    const ctx = image.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, image.width, image.height);

    //draw connecting edges
    for (let [key, connected_to] of graph) {

        let node = [parseFloat(key.split('_')[0]), parseFloat(key.split('_')[1])]

        //if there is something in our node
        if (connected_to.length > 0) {
            
            let node_x = node[0]
            let node_y =  node[1]

            //draw the connecting nodes and their lines
            for (let i = 0; i < connected_to.length; i++) {

                //draw the nodes
                let connected_x = connected_to[i][0] 
                let connected_y = (connected_to[i][1])  

                //draw line between the node and the connecting node
                draw_line({
                    x1: node_x,
                    x2: connected_x,
                    y1: node_y,
                    y2: connected_y,
                    ctx
                })
            }
        }
    }




    //draw dots
    for (let [key] of graph) {

        let node = [parseFloat(key.split('_')[0]), parseFloat(key.split('_')[1])]

        ctx.beginPath()
        ctx.arc(node[0], node[1], 1, 0, 2 * Math.PI); 
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
    }

    

    PImage.encodePNGToStream(image, fs.createWriteStream(save_to))
    .then(() => {
    console.log(`Finsihed drawing graph to ${save_to}`);
    })
    .catch((e) => {
    console.log("there was an error writing");
    });
}





function draw_line({x1, x2, y1, y2, ctx}) {

    const spacing = .3
    const radius = 1
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = distance / spacing;

    ctx.fillStyle = random_rgb()

    for (let i = 0; i <= steps; i++) {
        // Interpolate x and y coordinates
        const x = x1 + (dx * (i / steps));
        const y = y1 + (dy * (i / steps));

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill()
        ctx.closePath()
    }
}


function random_rgb() {

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const randomRgb = `rgb(${r}, ${g}, ${b})`;

    return randomRgb
}
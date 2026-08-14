





export function Mercator({latitude, longitude}) {

    let radius = 63_78.1 //radius of earth in km

    //turn longitude and latitude to radians
    longitude = longitude * (Math.PI / 180)
    latitude = latitude * (Math.PI / 180)

    return {
        x: latitude * radius,
        y: radius * Math.log( Math.abs( Math.tan( (longitude / 2) + (Math.PI / 4) ) ) )
    }
}
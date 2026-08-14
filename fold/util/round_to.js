







export function round_to({number, precision}) {

    if (number > 0) {
        const factor = Math.pow(10, precision);
        return Math.floor(number * factor) / factor;
    }

    else {
        number *= -1
        const factor = Math.pow(10, precision);
        return -1 * Math.floor(number * factor) / factor; 
    }
}
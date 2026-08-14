import fs from 'fs'








export function create_usable_railway_dataset({file_path, railway_name}) {

    let file = fs.readFileSync(file_path, 'utf-8')

    let json = JSON.parse(file)

    let railways = json.features

    let reformatted_railways = []

    let track_locations = []

    for (let i = 0; i < railways.length; i++) {
        reformatted_railways[i] = {
            id: railways[i].id,
            coordinates: railways[i].geometry.coordinates,
            properties: railways[i].properties,
        }

        track_locations = [...track_locations, ...railways[i].geometry.coordinates]

        console.log(`${railway_name} is ${(i / railways.length) * 100}% done`)
    }

    let modified_dataset_path = `railways/${railway_name}/${railway_name}.json`
    let track_locations_path = `railways/${railway_name}/${railway_name}-track-locations.json`

    fs.writeFileSync(modified_dataset_path, JSON.stringify(reformatted_railways, null, 2), 'utf-8')
    fs.writeFileSync(track_locations_path, JSON.stringify(track_locations, null, 2), 'utf-8')
}
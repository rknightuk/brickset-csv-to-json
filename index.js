import csv from 'csv-parser'
import fs, { rmSync } from 'fs'

function run() {
    let results = []

    fs.createReadStream('Brickset-Sets.csv')
    .pipe(csv())
    .on('data', (data) => {
        // handles some rows on the export having no data
        if (!data.Number)
        {
            return
        }

        const realSetNumber = data.Number.split('-')[0]

        results.push({
            id: realSetNumber,
            blId: data.Number,
            year: data.Year,
            title: data['Set name'],
            minifigs: data.Minifigs,
            pieces: data.Pieces,
            theme: data.Theme,
            subtheme: data.Subtheme,
            metadata: {
                bricklinked: data.Bricklinked === 'Yes',
                noMinifigs: data['No Minifigures'] === 'Yes',
                launch: data['Launch date'],
                exit: data['Exit date'],
                price: data['RRP (GBP)'],
            }
        })
    })
    .on('end', () => {
        const byTheme = {}
        const images = []

        results = results.sort((a,b) => (`${a.year}-${a.title}` > `${b.year}-${b.title}`) ? 1 : ((`${b.year}-${b.title}` > `${a.year}-${a.title}`) ? -1 : 0))

        results.forEach(r => {
            if (!byTheme[r.theme]) byTheme[r.theme] = []
            byTheme[r.theme].push(r)
            images.push(`https://images.brickset.com/sets/large/${r.blId}.jpg`)
        })
        fs.writeFileSync('images.txt', images.join('\n'))
        fs.writeFileSync('brickset.json', JSON.stringify({ count: results.length, theme: byTheme }, '', 2))
    })
}

run();

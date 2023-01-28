# Brickset CSV to JSON

A script to take a users collection export from [Brickset](https://brickset.com) and convert to JSON.

## Usages

- Requires [nodeJS](https://nodejs.org/en/)

1. Add your CSV export to the root as `Brickset-Sets.csv`
2. run `npm i` to install the packages (there is only one, [`csv-parser`](https://www.npmjs.com/package/csv-parser))
3. Run `node.index.js`

## Output

The script will output two files

### `brickset.json`

Note that `bricklinked` and `noMinifigs` are custom flags in my Brickset account. Edit `index.js` to include your own flags. Example output:

```json
{
  "count": 1,
  "theme": {
    "Marvel Super Heroes": [
      {
        "id": "76042",
        "blId": "76042-1",
        "year": "2015",
        "title": "The SHIELD Helicarrier",
        "minifigs": "17",
        "pieces": "2996",
        "theme": "Marvel Super Heroes",
        "subtheme": "The Avengers",
        "metadata": {
          "bricklinked": false,
          "noMinifigs": false,
          "launch": "01/03/2015",
          "exit": "31/12/2017",
          "price": "279.99"
        }
      }
    ]
  }
}
```

### `images.txt`

This outputs a list of images for the sets to a text file.

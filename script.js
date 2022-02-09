var mapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 500,
  "height": 300,
  "data": {
    "url": "data/us-10m.json",
    "format": {
      "type": "topojson",
      "feature": "counties"
    }
  },
  "projection": {
    "type": "albersUsa"
  },
  "mark": {
    "type": "geoshape",
    "fill": "blue",
    "stroke": "white"
  }
};

// setup API options
const options = {
  config: {
    // Vega-Lite default configuration
  },
  init: (view) => {
    // initialize tooltip handler
    view.tooltip(new vegaTooltip.Handler().call);
  },
  view: {
    // view constructor options
    // remove the loader if you don't want to default to vega-datasets!
    // loader: vega.loader({
    //   baseURL: "https://cdn.jsdelivr.net/npm/vega-datasets@2/",
    // }),
    renderer: "canvas",
  },
};

// register vega and vega-lite with the API
vl.register(vega, vegaLite, options);

// Population Bar
vl.markBar({ tooltip: true })
  .data('data/provinces_code_pop.csv')
  .encode(
    vl.x().fieldQ('Population, 2021'),
    vl.y().fieldN("Geographic name"),
    vl.tooltip([vl.fieldQ("Population, 2021"), vl.fieldN("Geographic name")])
  )
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('populationBar').appendChild(viewElement);
  });

// Population Pie
vl.markArc({ tooltip: true })
  .data('data/provinces_code_pop.csv')
  .encode(
    vl.theta().fieldQ('Population, 2021'),
    vl.color().fieldN("Geographic name"),
    vl.tooltip([vl.fieldQ("Population, 2021"), vl.fieldN("Geographic name")])
  )
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('populationPie').appendChild(viewElement);
  });

// Canada population Choropleth Map
vl.markGeoshape({stroke: '#aaa', strokeWidth: 0.25})
  .data(vl.topojson('data/lpr_000b21a_e_topo.json').feature('lpr_000b21a_e'))
  .transform(
    vl.lookup('properties.DGUID')
      .from(vl.data('data/provinces_code_pop.csv').key('DGUID').fields(['Population, 2021']))
  )
  .encode(
    vl.color().fieldQ('Population, 2021'),
    vl.tooltip().fieldQ('Population, 2021')
  )
  .project(vl.projection('identity').reflectY(true))
  .width(500).height(300)
  .config({view: {stroke: null}})
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('populationMap').appendChild(viewElement);
  });

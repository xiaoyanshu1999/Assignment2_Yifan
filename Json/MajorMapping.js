const visualization3 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "",
  "background": {
    "expr": "null"
  },
  "width": 900,
  "height": 500,
  "params": [{
    "name": "Year_selection",
    "value": 2021,

    "bind": {
      "input": "range",
      "min": 2015,
      "max": 2021,
      "step": 1,
      "name": "Year:"

    }
  }],
  "projection": {
    "type": "equalEarth",
    "rotate": [-75, -1, 0]
  },
  "layer": [{
      "data": {
        "url": "https://raw.githubusercontent.com/xiaoyanshu1999/YifanWeek10Homework/main/JSON/oceans.json",
        "format": {
          "type": "topojson",
          "feature": "oceans"
        }
      },
      "mark": {
        "type": "geoshape",
        "fill": "#bcd1e0",
        "opacity": 0.92
      }
    },
    {
      "data": {
        "url": "https://raw.githubusercontent.com/xiaoyanshu1999/Assignment2_Yifan/main/Json/ne_110m_admin_0_countries.json",
        "format": {
          "type": "topojson",
          "feature": "ne_110m_admin_0_countries"
        }
      },
      "transform": [{
        "calculate": "'Data is not available in ' + datum.properties.NAME +' in current year.' ",
        "as": "note"
      }],
      "mark": {
        "type": "geoshape",
        "fill": "#3b3b44c5",
        "stroke": "#78787a",
        "strokeWidth": 1
      },
      "encoding": {
        "tooltip": {
          "field": "note"
        }
      }
    },
    {
      "data": {
        "url": "https://raw.githubusercontent.com/xiaoyanshu1999/Assignment2_Yifan/main/Data/WorldHappinessScore.csv"
      },
      "transform": [{
          "lookup": "Country",
          "from": {
            "data": {
              "url": "https://raw.githubusercontent.com/xiaoyanshu1999/Assignment2_Yifan/main/Json/ne_110m_admin_0_countries.json",
              "format": {
                "type": "topojson",
                "feature": "ne_110m_admin_0_countries"
              }
            },
            "key": "properties.NAME"
          },
          "as": "geo"
        },
        {
          "filter": "datum.Date == Year_selection"
        }
      ],
      "mark": {
        "type": "geoshape",
        "stroke": "#8f4343"
      },
      "encoding": {
        "shape": {
          "field": "geo",
          "type": "geojson"
        },
        "color": {
          "field": "HappinessScore",
          "type": "quantitative",
          "scale": {
            "scheme": "lightmulti",
            "domain": [0, 9]
          },
          "legend": {
            "format": ".2s",
            "padding": 20,
            "offset": 60,
            "gradientLength": 400
          }
        },
        "tooltip": [{
            "field": "Country",
            "type": "nominal",
            "title": "Country"
          },
          {
            "field": "HappinessScore",
            "type": "quantitative",
            "title": "Happiness Performance Score",
            "format": ","
          },
          {
            "field": "HappinessRank",
            "type": "quantitative",
            "title": "Happiness Rank",
            "format": ","
          },
          {
            "field": "Date",
            "type": "quantitative",
            "title": "Year"
          }
        ]
      }
    }
  ],
  "config": {
    "axis": {
      "labelFont": "URW Chancery",
      "titleFont": "URW Chancery",
      "titleFontSize": 16,
      "labelFontSize": 14,
      "labelPadding": 1,
      "titlePadding": 9,
      "titleColor": "#282c30",
      "labelColor": "#363d45"
    },
    "legend": {
      "labelFont": "URW Chancery",
      "titleFont": "URW Chancery",
      "titleFontSize": 16,
      "labelFontSize": 14,
      "titlePadding": 20,
      "titleColor": "#282c30",
      "labelColor": "#363d45"
    },
    "header": {
      "labelFont": "URW Chancery",
      "titleFont": "URW Chancery",
      "titleFontSize": 16,
      "labelFontSize": 14,
      "titleColor": "#282c30",
      "labelColor": "#363d45"
    },
    "mark": {
      "font": "URW Chancery"
    },
    "title": {
      "font": "URW Chancery",
      "subtitleFont": "URW Chancery"
    }
  }
};

vegaEmbed('#visualizationembedded3', visualization3).then(function (result) {
  const sliders = document.getElementsByClassName('vega-bindings');
  const newparent = document.getElementById('slider');
  const oldchild = document.getElementById("oldchildslider");
  newparent.replaceChild(sliders[0], oldchild);
}).catch(console.error);
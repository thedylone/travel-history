import React from "react"
import { FC } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
const mapWidth = 800;
const mapHeight = 600;

export const MapChart: FC = () => {
  return (
    <ComposableMap
      width={mapWidth}
      height={mapHeight}
      projectionConfig={{ scale: 160 }}
    >
      <ZoomableGroup
        translateExtent={[
          [0, 0],
          [mapWidth, mapHeight]
        ]}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: geo.properties.name === "Denmark" ? "#F53" : "#D6D6DA",
                    outline: "none"
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  }
                }} />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}

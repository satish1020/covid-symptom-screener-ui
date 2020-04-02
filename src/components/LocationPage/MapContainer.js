import React, { useState } from 'react'
import { number } from 'prop-types'
import GoogleMapReact from 'google-map-react'

import { Typography } from '@material-ui/core'

import { Marker } from './Marker'

const distanceToMouse = (pt, mousePos) => {
  // pt can be undefined in some cases so override
  // default distanceToMouse to check against that.
  if (pt && mousePos) {
    return Math.sqrt(
      (pt.x - mousePos.x) * (pt.x - mousePos.x) +
        (pt.y - mousePos.y) * (pt.y - mousePos.y)
    )
  }
}

export const MapContainer = ({ latitude, longitude }) => {
  const [pending, setPending] = useState(true)

  return (
    <>
      {pending && <Typography>LOADING...</Typography>}
      <GoogleMapReact
        resetBoundsOnResize
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: latitude,
          lng: longitude,
        }}
        defaultZoom={17}
        distanceToMouse={distanceToMouse}
        onTilesLoaded={() => {
          setPending(false)
        }}
      >
        <Marker lat={latitude} lng={longitude} />
      </GoogleMapReact>
    </>
  )
}

MapContainer.propTypes = {
  latitude: number,
  longitude: number,
}

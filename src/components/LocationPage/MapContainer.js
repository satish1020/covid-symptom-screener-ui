import React from 'react'
import { number } from 'prop-types'
import GoogleMapReact from 'google-map-react'

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

export const MapContainer = ({ latitude, longitude, setPending }) => {
  return (
    <>
      <GoogleMapReact
        resetBoundsOnResize
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lat: latitude,
          lng: longitude,
        }}
        defaultZoom={17}
        distanceToMouse={distanceToMouse}
        onGoogleApiLoaded={() => setPending(false)}
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

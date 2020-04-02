import React, { createContext, useState } from 'react'
import { number, element } from 'prop-types'

export const defaultCoordinates = {
  longitude: null,
  latitude: null,
}

export const CoordinateContext = createContext(defaultCoordinates)

export const CoordinateContextProvider = ({
  longitude,
  latitude,
  children,
}) => {
  const [coords, setCoords] = useState({
    longitude,
    latitude,
  })

  return (
    <CoordinateContext.Provider value={[coords, setCoords]}>
      {children}
    </CoordinateContext.Provider>
  )
}

CoordinateContextProvider.propTypes = {
  longitude: number,
  latitude: number,
  children: element.isRequired,
}

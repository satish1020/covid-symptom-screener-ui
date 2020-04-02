import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { Typography } from '@material-ui/core'
import { CoordinateContext } from '../Shared/context/coordinateContext'

export const MeasurementPage = () => {
  const [coords] = useContext(CoordinateContext)

  if (!coords?.latitude || !coords?.longitude) {
    return <Redirect to="/location" />
  }

  return (
    <div>
      <Typography>Measurement Page</Typography>
      <Typography>longitude: {coords.longitude}</Typography>
      <Typography>latitude: {coords.latitude}</Typography>
    </div>
  )
}

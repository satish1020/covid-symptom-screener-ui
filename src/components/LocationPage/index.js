import React, { useReducer, useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PageTitle from '../Shared/components/PageTitle'
import Box from '@material-ui/core/Box'

import { Typography, Grid, Button, makeStyles } from '@material-ui/core'

import { MapContainer } from './MapContainer'
import { Spinner } from '../Shared/components/Spinner'

import { CoordinateContext } from '../Shared/context/coordinateContext'

const useStyles = makeStyles((theme) => ({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    ...theme.buttonPrimary,
    marginTop: '3rem',
    marginBottom: '3rem',
  },
}))

const SET_STATUS_TYPE = 'SET_STATUS'
const SET_COORDINATES_TYPE = 'SET_COORDINATES'

const STATUS_IDLE = 'IDLE'
const STATUS_ENABLED = 'ENABLED'
const STATUS_ERROR = 'ERROR'

const setStatusAction = (status) => ({
  type: SET_STATUS_TYPE,
  payload: {
    status,
  },
})

const setCoordinatesAction = ({ latitude, longitude }) => ({
  type: SET_COORDINATES_TYPE,
  payload: {
    latitude,
    longitude,
  },
})

const reducer = (state, action) => {
  switch (action.type) {
    case SET_STATUS_TYPE: {
      return {
        ...state,
        status: action.payload.status,
      }
    }

    case SET_COORDINATES_TYPE: {
      return {
        ...state,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
      }
    }
    default:
      return state
  }
}

export const LocationPage = () => {
  const classes = useStyles()
  const history = useHistory()

  const [state, dispatch] = useReducer(reducer, {
    status: STATUS_IDLE,
    longitude: null,
    latitude: null,
  })

  const [, setCoords] = useContext(CoordinateContext)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    if ('navigator' in window) {
      dispatch(setStatusAction(STATUS_ENABLED))
    } else {
      dispatch(setStatusAction(STATUS_ERROR))
    }
  }, [])

  useEffect(() => {
    if (state.status === STATUS_ENABLED) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setCoordinatesAction({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          )
        },
        (error) => {
          console.error(`Error getting geolocation: ${error}`)
          dispatch(setStatusAction(STATUS_ERROR))
        }
      )
    }
  }, [state.status])

  const handleClick = () => {
    if (state.longitude && state.latitude) {
      // remove local storage after dev
      window.localStorage.setItem('coords', JSON.stringify(state))
      setCoords({
        longitude: state.longitude,
        latitude: state.latitude,
      })

      history.push('/measurement')
    }
  }

  return (
    <>
      <PageTitle title="Confirm your location" />
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <div
              style={{
                height: '40vh',
                width: '100%',
                overflow: 'visible',
              }}
            >
              {(state.status === STATUS_IDLE || pending) && <Spinner />}
              {state.status === STATUS_ERROR && (
                <div className={classes.center}>
                  <Typography>Please use Safari or Chrome</Typography>
                </div>
              )}
              {state.status === STATUS_ENABLED &&
                state.latitude &&
                state.longitude && (
                  <MapContainer
                    latitude={state.latitude}
                    longitude={state.longitude}
                    setPending={setPending}
                  />
                )}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              disabled={!state.longitude && !state.latitude}
              onClick={handleClick}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

import React from 'react'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ palette }) => ({
  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 18,
    height: 18,
    backgroundColor: palette.primary.main,
    border: '2px solid #fff',
    borderRadius: '100%',
    userSelect: 'none',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    '&:hover': {
      zIndex: 1000000,
    },
  },
}))

export const Marker = () => {
  const classes = useStyles()

  return <div className={classes.marker}></div>
}

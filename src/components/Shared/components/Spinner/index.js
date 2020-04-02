import React from 'react'

import { makeStyles, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(({ spacing }) => ({
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    '& > * + *': {
      marginLeft: spacing(2),
    },
  },
}))

export const Spinner = () => {
  const classes = useStyles()

  return (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  )
}

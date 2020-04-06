import React from 'react'

import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: theme.titleText,
}))

export const SectionTitle = ({ title, total }) => {
  const classes = useStyles()

  return (
    <Typography className={classes.title} componnet="h2">
      {total} {title}
    </Typography>
  )
}

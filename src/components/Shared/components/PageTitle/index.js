import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    container: {
      margin: theme.spacing(1, 0, 3),
      padding: theme.spacing(0, 0, 1),
      borderBottom: '2px solid #ccc',
    },
    title: {
      ...theme.titleText,
    },
  }
})

function PageTitle({ title }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h2">
        {title}
      </Typography>
    </div>
  )
}

export default PageTitle

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

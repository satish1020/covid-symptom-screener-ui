import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(({ spacing }) => {
  return {
    container: {
      margin: spacing(0, 2, 3),
      padding: spacing(3, 0, 1),
      borderBottom: '2px solid #ccc',
    },
    title: {
      fontWeight: 800,
      fontSize: '1.5rem',
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

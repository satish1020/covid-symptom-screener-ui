import React from 'react'
import logo from '../../../../logo.png'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(({ spacing }) => {
  return {
    header: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: spacing(3),
    },
    text: {
      paddingTop: spacing(),
      fontWeight: '600',
    },
    logo: {
      width: '100px',
      marginRight: spacing(2),
    },
  }
})

function Header() {
  const classes = useStyles()
  return (
    <div className={classes.header}>
      <img src={logo} alt="MN Department of Health" className={classes.logo} />
      <Typography className={classes.text}>Temperature Aggregation</Typography>
    </div>
  )
}

export default Header

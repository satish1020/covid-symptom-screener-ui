import React, { useState } from 'react'
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core'
import { OrganizationsSection } from './components/OrganizationsSection'
import { MeasurementsSection } from './components/MeasurementsSection'
import { TabPanel } from './components/tabPanel'

export const ManagementPage = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <div className={classes.pageContainer}>
        <AppBar className={classes.appBar} position="static" elevation={0}>
          <Tabs
            value={value}
            onChange={handleChange}
            classes={{ indicator: classes.indicator }}
          >
            <Tab label="Organizations" classes={{ root: classes.tabRoot }} />
            <Tab label="Measurements" classes={{ root: classes.tabRoot }} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <OrganizationsSection />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MeasurementsSection />
        </TabPanel>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 -8px',
    height: '100vh',
    background:
      'linear-gradient(180deg, #9bcbeb 7%, #ffffff 90%, rgba(255,255,255,0) 3%)',
  },
  pageContainer: {
    backgroundColor: '#ffffff',
    width: '80%',
    height: '100vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '20px',
  },
  appBar: {
    backgroundColor: '#ffffff',
    color: theme.palette.primaryBlue,
    borderBottom: `1px solid #d3d3d3`,
  },
  tabRoot: {
    fontWeight: '900',
    letterSpacing: '2px',
  },
  indicator: {
    backgroundColor: theme.palette.primaryBlue,
    height: '5px',
  },
}))

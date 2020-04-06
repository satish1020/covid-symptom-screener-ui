import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { SectionTitle } from './SectionTitle'

import { EnhancedTable } from '../../Shared/components/EnhancedTable'
import { useTable } from '../../Shared/components/EnhancedTable/useTable'

import { getTemperatures } from '../../../services/temperatures'
import { DIRECTION_DESC } from '../../../constants'

const fieldList = [
  {
    key: 'organization_id',
    label: 'Organization',
    hasSort: true,
  },
  {
    label: 'Location',
    hasSort: false,
    formatCell: (item) => {
      return `Lat: ${item.latitude}, Lng: ${item.longitude}`
    },
  },
  {
    key: 'temperature',
    label: 'Temperature',
    hasSort: true,
  },
]

const initialTableState = {
  page: 0,
  perPage: 20,
  direction: DIRECTION_DESC,
  orderBy: 'organization_id',
}
export const MeasurementsSection = () => {
  const table = useTable(initialTableState)

  const [measurements, setMeasurements] = useState([])
  const [totalMeasurements, setTotalMeasurements] = useState(0)

  const [pending, setPending] = useState(false)

  const fetchOrgs = async ({ page, perPage, orderBy, direction }) => {
    setPending(true)
    const { results, total } = await getTemperatures({
      page,
      perPage,
      orderBy,
      direction,
    })

    setTotalMeasurements(total)
    setMeasurements(results)
    setPending(false)
  }

  useEffect(() => {
    fetchOrgs(table.state)
  }, [table.state])

  return (
    <div>
      <Grid container spacing={2} justify="flex-end" alignItems="center">
        <Grid item xs={12}>
          <SectionTitle total={totalMeasurements} title="Measurements" />
        </Grid>
      </Grid>
      <EnhancedTable
        data={measurements}
        fieldList={fieldList}
        isLoading={pending}
        total={totalMeasurements}
        aster
        page={table.state.page}
        rowsPerPage={table.state.perPage}
        direction={table.state.direction}
        orderBy={table.state.orderBy}
        onRequestSort={table.actions.sort}
        onRequestChangePage={table.actions.changePage}
        onRequestChangeRowsPerPage={table.actions.changePerPage}
      />
    </div>
  )
}

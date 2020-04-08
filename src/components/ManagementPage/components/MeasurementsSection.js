import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { SectionTitle } from './SectionTitle'

import { EnhancedTable } from '../../Shared/components/EnhancedTable'
import { useTable } from '../../Shared/components/EnhancedTable/useTable'

import { getFormattedTemperatures } from '../../../services/temperatures'
import { getTableFieldsByQuestion } from '../../../services/questions'
import { formatDate } from '../../../services/formatDate'

import { DIRECTION_DESC } from '../../../constants'

const initialTableState = {
  page: 0,
  perPage: 20,
  direction: DIRECTION_DESC,
  orderBy: 'created',
}
export const MeasurementsSection = () => {
  const table = useTable(initialTableState)

  const [fieldList, setFieldList] = useState([])
  const [measurements, setMeasurements] = useState([])
  const [totalMeasurements, setTotalMeasurements] = useState(0)

  const [pending, setPending] = useState(false)

  const fetchTableHeaders = async () => {
    const tableHeaders = [
      {
        key: 'organization_name',
        label: 'Organization',
        hasSort: false,
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

    const questionAnswerHeaders = await getTableFieldsByQuestion()

    tableHeaders.push(...questionAnswerHeaders)

    tableHeaders.push({
      key: 'created',
      label: 'Created On',
      hasSort: true,
      formatCell(item) {
        return formatDate(item.created)
      },
    })

    setFieldList(tableHeaders)
  }

  const fetchMeasurements = async ({ page, perPage, orderBy, direction }) => {
    setPending(true)
    const { results, total } = await getFormattedTemperatures({
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
    fetchTableHeaders()
  }, [])

  useEffect(() => {
    fetchMeasurements(table.state)
  }, [table.state])

  return (
    <div>
      <Grid container spacing={2} justify="flex-end" alignItems="center">
        <Grid item xs={12}>
          <SectionTitle total={totalMeasurements} title="Measurements" />
        </Grid>
      </Grid>
      {fieldList?.length && (
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
      )}
    </div>
  )
}

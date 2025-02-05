const stageDomain = 'https://stg.temperature-aggregator.app/temperatures/v1'
const prodDomain = `https://temperature-aggregator.app/temperatures/v1`

const stage = {
  kelvinApi: stageDomain,
}

const prod = {
  kelvinApi: prodDomain,
}

export const appConfig =
  process.env.REACT_APP_ENV === 'production' ? prod : stage

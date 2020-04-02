const stageDomain = 'https://stg.temperature-aggregator.app'
const prodDomain = `https://temperature-aggregator.app`

const stage = {
  organizations: `${stageDomain}/organizations`,
  measurements: `${stageDomain}/measurements`,
}

const prod = {
  organizations: `${prodDomain}/organizations`,
  measurements: `${prodDomain}/measurements`,
}

export const appConfig = process.env.NODE_ENV === 'production' ? prod : stage

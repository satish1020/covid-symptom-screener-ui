import { createSortString, getPageable } from '../pageable'

import { DIRECTION_ASC, DIRECTION_DESC } from '../../constants'

describe('createSortString', () => {
  it('creates a sort string', () => {
    expect(createSortString('orderBy', 'dir')).toEqual('orderBy,dir')
  })
})

describe('getPageable', () => {
  it('creates an object of pageable API parameters', () => {
    const params = {
      page: 0,
      perPage: 20,
      orderBy: 'name',
      direction: DIRECTION_DESC,
    }
    const pageable = getPageable(params)

    expect(pageable).toEqual({
      page: params.page,
      size: params.perPage,
      sort: `${params.orderBy},${params.direction}`,
    })
  })

  it('creates an object of pageable API parameters with a default direction', () => {
    const params = {
      page: 0,
      perPage: 20,
      orderBy: 'name',
    }
    const pageable = getPageable(params)

    expect(pageable).toEqual({
      page: params.page,
      size: params.perPage,
      sort: `${params.orderBy},${DIRECTION_ASC}`,
    })
  })
})

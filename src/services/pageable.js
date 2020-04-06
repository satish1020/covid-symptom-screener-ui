import { DIRECTION_ASC } from '../constants'

export const createSortString = (orderBy, direction) =>
  `${orderBy},${direction}`

export const getPageable = ({ page, perPage, orderBy, direction }) => {
  let sort

  if (orderBy) {
    const dir = direction || DIRECTION_ASC
    sort = createSortString(orderBy, dir)
  }
  return {
    size: perPage,
    page,
    sort,
  }
}

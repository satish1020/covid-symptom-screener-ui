import React from 'react'

import { DIRECTION_DESC, DIRECTION_ASC } from '../../../../constants'

const SORT = 'SORT'
const CHANGE_PAGE = 'CHANGE_PAGE'
const CHANGE_PER_PAGE = 'CHANGE_PER_PAGE'
const RESET_STATE = 'RESET_STATE'

const sort = (dispatch) => (field) =>
  dispatch({ type: SORT, payload: { field } })

const changePage = (dispatch) => (event, page) =>
  dispatch({ type: CHANGE_PAGE, payload: { event, page } })

const changePerPage = (dispatch) => (event) =>
  dispatch({ type: CHANGE_PER_PAGE, payload: { event } })

const resetState = (dispatch) => (pagingParams) =>
  dispatch({ type: RESET_STATE, payload: pagingParams })

const actions = (dispatch) => ({
  sort: sort(dispatch),
  changePage: changePage(dispatch),
  changePerPage: changePerPage(dispatch),
  resetState: resetState(dispatch),
})

/**
table state = {
  page: number
  perPage: number
  direction?: Direction
  orderBy?: string
}
*/

const defaultState = {
  page: 0,
  perPage: 20,
  direction: undefined,
  orderBy: undefined,
}

const tableReducer = (state, action) => {
  switch (action.type) {
    case SORT: {
      const {
        payload: {
          field: { key },
        },
      } = action

      const newDirection =
        state.orderBy === key && state.direction === DIRECTION_DESC
          ? DIRECTION_ASC
          : DIRECTION_DESC

      return {
        ...state,
        page: 0,
        direction: newDirection,
        orderBy: key,
      }
    }

    case CHANGE_PAGE: {
      const {
        payload: { page, event },
      } = action
      if (page === null || page === undefined || !event) {
        return state
      }

      return {
        ...state,
        page,
      }
    }

    case CHANGE_PER_PAGE: {
      const {
        payload: { event },
      } = action
      const newPerPage = event?.target.value ?? ''

      return {
        ...state,
        perPage: newPerPage ? parseInt(newPerPage, 10) : defaultState.perPage,
        page: defaultState.page,
      }
    }

    case RESET_STATE: {
      const {
        payload: { page, perPage, direction, orderBy },
      } = action
      return {
        page,
        perPage,
        direction,
        orderBy,
      }
    }

    default:
      return state
  }
}

export const useTable = (initialState = defaultState) => {
  const [state, dispatch] = React.useReducer(tableReducer, initialState)
  return {
    state,
    actions: actions(dispatch),
  }
}

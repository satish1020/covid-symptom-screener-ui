import { renderHook, act } from '@testing-library/react-hooks'

import { useTable } from './useTable'
import { DIRECTION_DESC, DIRECTION_ASC } from '../../../../constants'

describe('useTable hook', () => {
  it('has a default state', () => {
    const { result } = renderHook(() => useTable())

    expect(result.current.state).toEqual({
      page: 0,
      perPage: 20,
    })
  })

  it('takes an initial state', () => {
    const initialState = {
      page: 0,
      perPage: 20,
      direction: DIRECTION_DESC,
      orderBy: 'order_date',
    }
    const { result } = renderHook(() => useTable(initialState))
    expect(result.current.state).toEqual(initialState)
  })

  it('sorts the table on a new key', () => {
    const { result } = renderHook(() => useTable())
    act(() =>
      result.current.actions.sort({
        key: 'order_date',
        heading: 'Order Date',
      })
    )
    expect(result.current.state).toEqual({
      page: 0,
      perPage: 20,
      direction: DIRECTION_DESC,
      orderBy: 'order_date',
    })
  })

  it('sorts the table on the same key', () => {
    const initialState = {
      page: 0,
      perPage: 20,
      direction: DIRECTION_DESC,
      orderBy: 'order_date',
    }
    const { result } = renderHook(() => useTable(initialState))
    act(() =>
      result.current.actions.sort({
        key: 'order_date',
        heading: 'Order Date',
      })
    )
    expect(result.current.state).toEqual({
      page: 0,
      perPage: 20,
      direction: DIRECTION_ASC,
      orderBy: 'order_date',
    })
  })

  it('changes the page', () => {
    const { result } = renderHook(() => useTable())
    act(() => result.current.actions.changePage({}, 1))
    expect(result.current.state).toEqual({
      page: 1,
      perPage: 20,
    })
  })

  it('changes the page to 0', () => {
    const initialState = {
      page: 1,
      perPage: 20,
    }
    const { result } = renderHook(() => useTable(initialState))
    act(() => result.current.actions.changePage({}, 0))
    expect(result.current.state).toEqual({
      page: 0,
      perPage: 20,
    })
  })

  it('does not change the page if event is null', () => {
    const { result } = renderHook(() => useTable())
    act(() => result.current.actions.changePage(null, 1))
    expect(result.current.state).toEqual({
      page: 0,
      perPage: 20,
    })
  })

  it('changes the rows per page and resets the page to 0', () => {
    const { result } = renderHook(() => useTable({ page: 2, perPage: 10 }))
    const event = { target: { value: '30' } }
    act(() => result.current.actions.changePerPage(event))
    expect(result.current.state).toEqual({
      page: 0,
      perPage: 30,
    })
  })

  it('resets the initial state', () => {
    const initialState = {
      page: 1,
      perPage: 20,
    }
    const { result } = renderHook(() => useTable(initialState))
    act(() => result.current.actions.changePage({}, 3))
    expect(result.current.state).toEqual({
      page: 3,
      perPage: 20,
    })

    act(() => result.current.actions.resetState(initialState))
    expect(result.current.state).toEqual({
      page: 1,
      perPage: 20,
    })
  })
})

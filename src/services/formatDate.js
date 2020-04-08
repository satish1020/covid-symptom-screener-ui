import { format } from 'date-fns'

export const formatDate = (date) => {
  let time = typeof date === 'string' ? new Date(date) : date

  return format(time, 'MMM d yyyy, h:mm a')
}

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ spacing }) => ({
  submitButton: {
    marginBottom: spacing(2),
  },
  inputField: {
    marginBottom: spacing(2),
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  error: {
    color: '#f44336',
  },
  errorMessage: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: spacing(),
    marginBottom: spacing(2),
    borderRadius: '4px',
  },
}))

export default useStyles

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    margin: '1rem 0',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  searchButton: {
    height: '100%',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      // flexDirection: 'column-reverse',
    },
  },
}));
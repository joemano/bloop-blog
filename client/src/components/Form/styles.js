import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        // flexDirection: 'column-reverse',
        margin: 0
      },
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chipTextField: {
    margin: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      // flexDirection: 'column-reverse',
      margin: '8px 0' 
    },
  },
  fileInput: {
    width: '97%',
    margin: '5px 10px',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
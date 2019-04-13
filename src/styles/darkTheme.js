import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import deepOrange from '@material-ui/core/colors/deepOrange';

export const DarkGeekTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: deepOrange,
    secondary: grey
  },
  typography: {
    useNextVariants: true,
  },
})

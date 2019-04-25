import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import deepOrange from '@material-ui/core/colors/deepOrange';

export const GeekTheme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: grey
  },
  typography: {
    useNextVariants: true,
  },
})

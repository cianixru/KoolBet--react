import React from 'react';
import {
    createMuiTheme,
    MuiThemeProvider,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 899,
            lg: 1180,
            xl: 1440,
            xxl: 1650
        }
    }
});

export default class Theme extends React.Component {
    render() {
        return (

            <MuiThemeProvider theme={theme}>
                {this.props.children}
            </MuiThemeProvider>
        )
    }
}
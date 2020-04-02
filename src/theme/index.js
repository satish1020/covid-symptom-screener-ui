import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    typography: {
        fontFamily: [
            '"Open Sans"','"Helvetica Neue"','Helvetica','Arial','sans-serif'
        ].join(','),
        p: {
            fontWeight: '500',
            color: '#555555',
            textAlign: 'left',
            lineHeight: 'normal',
            fontSize: '1rem',
        }
    },
    palette: {
        primaryBlue: '#003865',
        secondaryGreen: '#78BE21',
        accentTeal: '#008EAA',
        accentGreen: '#0D5257',
        extendedBlue: '#9BCBEB',
        extendedRed: '#A6192E',
    },
    buttonPrimary: {
        maxWidth: '338px',
        width: '100%',
        height: '40px',
        borderRadius: '30px',
        backgroundColor: '#78be21',
        fontWeight: '500',
        fontSize: '1rem',
        textTransform: 'none',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 'normal',
        boxShadow: '0px 3px 4px rgba(0, 153, 204, 0.0980392156862745)',
        '&:active': {
            backgroundColor: '#003865',
            boxShadow: '0px 4px 12px rgba(0, 153, 204, 0.01)'
          }
    },
    buttonSecondary: {
        maxWidth: '338px',
        width: '100%',
        height: '40px',
        borderRadius: '20px',
        backgroundColor: '#ffffff',
        fontSize: '1rem',
        textTransform: 'none',
        color: '#008eaa',
        textAlign: 'center',
        lineHeight: 'normal',
        '&:active,&:hover': {
            backgroundColor: 'rgba(0, 142, 170, 0.01)'
          }
    },
    footerBar: {
        borderBottom: '18px solid #003865'
    },
    titleText: {
        fontWeight: '700',
        color: '#666666',
        textAlign: 'left',
        lineHeight: 'normal',
        fontSize: '1.375rem',
    },
    thermometerText: {

    },
    confirmationToasterText: {

    },

});

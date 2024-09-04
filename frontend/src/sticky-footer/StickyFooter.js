import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: "space-between",
          minHeight: '29vh',
        
        }}
      >
        <CssBaseline />
        {/* <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Sticky footer
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'Pin a footer to the bottom of the viewport.'}
            {'The footer will move as the main element of the page grows.'}
          </Typography>
          <Typography variant="body1">Sticky footer placeholder.</Typography>
        </Container> */}
        <Box
          component="footer"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // maxWidth: "1400px",
            py: 5,
            px: 2,
            // mr:'auto',
            mt: 'auto',
            backgroundColor:'#E1E2E7 '
                
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="body1">
             <LocationOnIcon/>  Mexico, Addis Ababa, Ethiopia
            </Typography>
            <Typography variant="body1">
             <LocalPhoneIcon/>  Hotline:  +251-902-066660
            </Typography>
            <Typography variant="body1">
             <EmailIcon/>   Email:  contact@elefegne.com
            </Typography>
          </Container>
          <Container maxWidth="xl">
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
            {/* <Copyright /> */}
          </Container>
          <Container maxWidth="xl">
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
            {/* <Copyright /> */}
          </Container>
          <Container maxWidth="xl">
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
            {/* <Copyright /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

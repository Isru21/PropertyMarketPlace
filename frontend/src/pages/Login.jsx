import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { useAuthContext } from "../hooks/useContexts";
import { Link } from "react-router-dom";

//MUI
    import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, styled } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';

export default function Login({setLoginClicked}){
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
 


    useEffect (() => {setLoginClicked('yes')});


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading(true);

        const updatedData = {...formData};
        const data = JSON.stringify({...updatedData});

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'application/json'}
            });
            
            const json = await response.json();
            if(!response.ok){
                setIsLoading(false);
                toast.error(json.error);
                setEmptyFields(json.emptyFields);
            }
            if(response.ok){
                setEmptyFields([]);
                toast.success('Logged in successfully');
    
                // save the user to local storage
                localStorage.setItem('user', JSON.stringify(json));
    
                // update the auth context
                dispatch({type: 'LOGIN', payload: json});
    
                // update loading state
                setIsLoading(false);

                navigate(-1);

            }
        } catch (err) {
            setIsLoading(false);
            toast.error(err.message);
            setEmptyFields([]);
        }
    }

    const handleReset = () => {
        navigate(-1);
    }
    const defaultTheme = createTheme();

    return ( 
        // <form className="login" onSubmit={handleSubmit} onReset={handleReset}>
        //     <h3>Log in</h3>

        //     <label>Username: </label>
        //     <input
        //         type="text"
        //         name="username"
        //         onChange={handleInputChange}
        //         value={formData.username}
        //         className={emptyFields.includes('username') ? 'error' : ''}
        //     />

        //     <label>Password: </label>
        //     <input
        //         type="password"
        //         name="password"
        //         onChange={handleInputChange}
        //         value={formData.password}
        //         className={emptyFields.includes('password') ? 'error' : ''}
        //     />
             

        //     <input className="submit" type="submit" value="Log in" disabled={isLoading} />
        //     <input className="cancel" type="reset" value="Cancel" disabled={isLoading}/>
        // </form>
        // <Grid container component="main" sx={{ 
        //   position: 'fixed',  // Set position to fixed
        //   width: '100%',      // Make it fill 100% of the screen width
        //   height: '100vh',    // Make it fill 100% of the screen height
        //   overflowY: 'auto',  // Add vertical scrollbar if content exceeds height
        //   overflowX: 'hidden', // Hide horizontal scrollbar 
        // //  mr:5
        // }} >
        <Container>
      <Grid container component="main" sx={{ position: 'fixed',width: '100%',  height: '99vh' }} >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            // backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mb:-1
          }}
        />
        <Grid item xs={12} sm={8} md={5} sx={{mb:-1}} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              
            }}
          >
            <Avatar sx={{ mt: 12, mb:1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
          
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
           
             <Grid container justifyContent="center" alignItems="center">
                <TextField
                margin="normal"
                required
                fullWidth
                
                // id="email"
                label="username"
                type="text"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
                autoComplete="text"
                autoFocus
                sx={{
                    '& .MuiInputBase-input:focus': {
                      borderColor: emptyFields.includes('username') ? 'red' : 'green',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor:  emptyFields.includes('username') ? 'red' : 'gray',
                    },
                  }}
              />
              </Grid>
            

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                value={formData.password}
                sx={{
                    '& .MuiInputBase-input:focus': {
                      borderColor: emptyFields.includes('password') ? 'red' : 'green',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor:  emptyFields.includes('password') ? 'red' : 'gray',
                    },
                  }}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{backgroundColor:'#2D3642'}}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button> 
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                <Link to={"/signup"}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box
               sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                marginTop: -3,
                marginRight: 2,
              }}
            >
              <Link to={"/"}>
              <HomeIcon sx={{color:"black"}} />
              </Link>
            </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
     );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
import { styled,Container } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';

export default function Signup({setLoginClicked}){
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        contact: '',
        username: '',
        password: '',
        confirmPWD: ''
    });
    

    const [isLoading, setIsLoading] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect (() => {setLoginClicked('yes')});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading(true);

        if(formData.password !== formData.confirmPWD){
            toast.error('Passwords did not match. Please insert correctly');
            setIsLoading(false);
            setEmptyFields(['password']);
            return;
        }

        const updatedData = {...formData};
        delete updatedData.confirmPWD;
        const data = JSON.stringify({...updatedData});

        try {
            const response = await fetch('/api/user/client_signup', {
                method: 'POST',
                body: data,
                headers: {'Content-Type': 'application/json'}
            })
            const json = await response.json();
    
            if(!response.ok){
                setIsLoading(false);
                toast.error(json.error);
                setEmptyFields(json.emptyFields)
            }
            if(response.ok){
                toast.success('Signed up successfully. Now Log in');
                setIsLoading(false);
                setEmptyFields([])
                navigate('/login');
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
        // <form className="signup" onSubmit={handleSubmit} onReset={handleReset}>
        //     <h3>Sign up</h3>

        //     <label>Full Name: </label>
        //     <input
        //         type="text"
        //         name="fullname"
        //         onChange={handleInputChange}
        //         value={formData.fullname}
        //         className={emptyFields.includes('fullname') ? 'error' : ''}
        //     />

        //     <label>Email: </label>
        //     <input
        //         type="email"
        //         name="email"
        //         onChange={handleInputChange}
        //         value={formData.email}
        //         className={emptyFields.includes('email') ? 'error' : ''}
        //     />

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

        //     <label>Confirm Password: </label>
        //     <input
        //         type="password"
        //         name="confirmPWD"
        //         onChange={handleInputChange}
        //         value={formData.confirmPWD}
        //         className={emptyFields.includes('password') ? 'error' : ''}
        //     />

        //     <input className="submit" type="submit" value="Sign Up" disabled={isLoading} />
        //     <input className="cancel" type="reset" value="Cancel" disabled={isLoading}/>
        // </form>
        <Container>
        <Grid container component="main" sx={{ position: 'fixed',width: '100%',  height: '99vh' }}> 
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
          <Grid item xs={12} sm={8} md={5}sx={{mb:-1}} square>
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container justifyContent="center" alignItems="center">
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  width="10vw"
                  name="fullname"
                  label="full name"
                  type="text"
                  autoFocus
                  autoComplete="text"
                  onChange={handleInputChange}
                  value={formData.fullname}
                  sx={{
                      '& .MuiInputBase-input:focus': {
                        borderColor: emptyFields.includes('fullname') ? 'red' : 'green',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor:  emptyFields.includes('fullname') ? 'red' : 'gray',
                      },
                      // width:300
                    }}
                />
                   </Grid>
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
                  
                  sx={{
                      '& .MuiInputBase-input:focus': {
                        borderColor: emptyFields.includes('username') ? 'red' : 'green',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor:  emptyFields.includes('username') ? 'red' : 'gray',
                      },
                      // width:300
                    }}
                />
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                 <TextField
                  type="email"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  sx={{
                      '& .MuiInputBase-input:focus': {
                        borderColor: emptyFields.includes('email') ? 'red' : 'green',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor:  emptyFields.includes('email') ? 'red' : 'gray',
                      },
                      // width:300
                    }}
                />
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
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
                      // width:300
                    }}
                />
               </Grid>
                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPWD"
                  label="Conform password"
                  type="password"
                  id="confirmPWD"
                  autoComplete="current-password"
                  onChange={handleInputChange}
                  value={formData.confirmPWD}
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
                  <Link to={"/login"}>
                      {"Do you already have an account? Log in"}
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
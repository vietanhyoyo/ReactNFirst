import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import Axios from 'axios';
import { useNavigate } from 'react-router-dom'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Maysoft.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A8E9D'
    }
  }
});

export default function Login() {

  const navigate = useNavigate();

  const [error, setError] = React.useState({
    username: '',
    password: ''
  })

  const formValidate = (user, pass) => {
    if (user === '' && pass === '') {
      setError({ username: 'Bạn chưa nhập tài khoản!', password: 'Bạn chưa nhập mật khẩu!' })
      return false;
    }
    if (user === '') {
      setError({ username: 'Bạn chưa nhập tài khoản!', password: '' })
      return false;
    }
    if (pass === '') {
      setError({ username: '', password: 'Bạn chưa nhập mật khẩu!' })
      return false;
    }
    return true;
  }

  const postAPI = (account) => {
    console.log(account);
    fetch('https://qlsc.maysoft.io/server/api/auth/login', {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(account),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(response => response.json())
      .then(json => {
        //console.log(json);
        if (json.status) {
          alert(json.data.access_token);
          navigate('/home');
        }
        else {
          alert('Tài khoản hoặc mật khẩu không đúng.')
        }
      })
      .catch(err => console.log(err));

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (formValidate(data.get('username'), data.get('password'))) {
      postAPI({ username: data.get('username'), password: data.get('password') })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src='./assets/image/logo_01.png'
            alt='hanh'
            loading='lazy'
          />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={error.username !== '' ? true : false}
              margin="normal"
              fullWidth
              id="username"
              label={error.username !== '' ? 'Xin hãy nhập tài khoản!' : "Tên tài khoản*"}
              name="username"
              autoComplete="username"
              autoFocus
              onFocus={() => {
                if (error.username !== '') {
                  setError(prev => ({ ...prev, username: '' }))
                }
              }}
            />
            <TextField
              error={error.password !== '' ? true : false}
              margin="normal"
              fullWidth
              name="password"
              label={error.password !== '' ? 'Xin hãy nhập mật khẩu!' : "Mật khẩu*"}
              type="password"
              id="password"
              autoComplete="current-password"
              onFocus={() => {
                if (error.password !== '') {
                  setError(prev => ({ ...prev, password: '' }))
                }
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Nhớ tài khoản?"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='primary'
            >
              Đăng nhập
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
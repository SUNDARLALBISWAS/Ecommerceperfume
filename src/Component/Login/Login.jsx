import React, { useState } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchlogin } from '../../Redux/Slice/Slice';
import { useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPwd, setShowPwd] = useState(false);

  const togglePwdVisibility = () => setShowPwd(!showPwd);

  const [inputState, setInputState] = useState({
    role: '',
    email: '',
    pwd: '',
    errors: {
      email: '',
      pwd: '',
    },
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    const errors = { ...inputState.errors };

    switch (name) {
      case 'email':
        errors.email = value ? '' : 'Email is required';
        break;
      case 'pwd':
        errors.pwd = value ? '' : 'Password is required';
        break;
      default:
        break;
    }

    setInputState({ ...inputState, [name]: value, errors });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { role, email, pwd } = inputState;

    if (!email || !pwd) {
      Swal.fire('Error', 'Please fill all fields', 'error');
      return;
    }


    dispatch(fetchlogin({ role, email, pwd }))
      .then((result) => {
        console.log("Login result:", result);

        // Access result.payload.data to check if the user data exists
        if (result.payload?.data?.length > 0) {
          const userData = result.payload.data[0];
          Swal.fire('Success', 'Login Successful', 'success');


          window.sessionStorage.setItem('isUserLogged', "true");
          window.sessionStorage.setItem("id", userData.id);
          window.sessionStorage.setItem("image", userData.image);
          if (role === "User") {
            navigate(`/Profile/${userData.id}`)
          }
          else if (role === "Admin") {
            navigate('/AdminDashboard')
          }
        } else {
          Swal.fire('Error', 'Invalid Credentials', 'error');
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        Swal.fire('Error', 'An error occurred. Please try again.', 'error');
      })
  };
  const isFormValid = () => {
    return (
      inputState.role === "" || inputState.pwd === "" || inputState.email === "" || inputState.errors.email !== "" || inputState.errors.pwd !== ""
    );
  }

  return (
    <Box component="form" onSubmit={submitHandler} className="login-form">
      <Typography variant="h6" align="center" className="form-title">
        Login Form
      </Typography>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          label="Role"
          name="role"
          value={inputState.role}
          onChange={changeHandler}
          required
        >
          <MenuItem value="User">Buyer</MenuItem>
          <MenuItem value="Admin">Seller</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        required
        value={inputState.email}
        onChange={changeHandler}
        error={!!inputState.errors.email}
        helperText={inputState.errors.email}
      />
      <TextField
        label="Password"
        name="pwd"
        type={showPwd ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        required
        value={inputState.pwd}
        onChange={changeHandler}
        error={!!inputState.errors.pwd}
        helperText={inputState.errors.pwd}
        InputProps={{
          endAdornment: (
            <Button onClick={togglePwdVisibility}>
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </Button>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        disabled={isFormValid()}
      >
        Login
      </Button>
      <Typography align="center" className="register-prompt">
        Don’t have an account
      </Typography>
      <Link to='/Register' align="center" className="register-link">
        Register here
      </Link>
    </Box>
  );
};

export default Login;


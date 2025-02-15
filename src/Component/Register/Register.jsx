import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { fetchauthentication } from '../../Redux/Slice/Slice';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import base_url, { end_point } from '../../Api/api';
import './Register.scss';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = base_url + end_point.authentication;

  const [showpwd, setShowpwd] = useState(false);
  const [showconpwd, setShowconpwd] = useState(false);
  const [inputState, setInputState] = useState({
    role: "",
    fst: "",
    lst: "",
    email: "",
    pwd: "",
    pwd1: "",
    errors: {
      fst: "",
      lst: "",
      email: "",
      pwd: "",
      pwd1: ""
    }
  });
  const [image, setImage] = useState("");
  const [oldData, setOldData] = useState([]);


  useEffect(() => {
    axios.get(api).then((result) => {
      setOldData(result.data);
    }).catch((error) =>
      console.log("Error", error));
  }, [api]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    let errors = { ...inputState.errors };

    switch (name) {
      case 'fst':
        errors.fst = value.length < 1 ? "Required Field" : value.length < 3 ? "Minimum 3 characters required" : "";
        break;
      case 'lst':
        errors.lst = value.length < 1 ? "Required Field" : value.length < 3 ? "Minimum 3 characters required" : "";
        break;
      case 'email':
        errors.email = value.length < 1 ? "Required Field" : value.length < 10 ? "Minimum 10 characters required" : "";
        break;
      case 'pwd':
        errors.pwd = value.length < 1 ? "Required Field" : value.length < 4 ? "Minimum 4 characters required" : "";
        break;
      case 'pwd1':
        errors.pwd1 = inputState.pwd === value ? "" : "Passwords do not match";
        break;
      default:
        break;
    }

    setInputState({ ...inputState, [name]: value, errors });
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const togglePss = () => setShowpwd(!showpwd);
  const toggleconPss = () => setShowconpwd(!showconpwd);

  const submitHandler = (event) => {
    event.preventDefault();

    let registerEmail = oldData.find((user) => user.email === inputState.email);

    if (registerEmail) {
      Swal.fire({
        title: 'Email Exists',
        text: 'This email is already registered. Please use a different email.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      const formData = {
        role: inputState.role,
        fst: inputState.fst,
        lst: inputState.lst,
        email: inputState.email,
        pwd: inputState.pwd,
        image: image
      };

      dispatch(fetchauthentication(formData)).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          Swal.fire({
            title: 'Success!',
            text: 'Registration successful!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          navigate("/Login");
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Registration failed.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  };

  const myFunction = () => {
    return (
      inputState.fst === "" || inputState.lst === "" || inputState.email === "" ||
      inputState.pwd === "" || inputState.pwd1 === "" || inputState.errors.fst !== "" ||
      inputState.errors.lst !== "" || inputState.errors.email !== "" || inputState.errors.pwd !== "" ||
      inputState.errors.pwd1 === "Password Not Match"
    );
  };

  return (
    <Box component="form" className='register-form' onSubmit={submitHandler}>
      <Typography variant='h6' align='center' className='form-title'>
        Register-Form
      </Typography>

      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel id="role-label">Role</InputLabel>
        <Select labelId="role-label" label="Role" name="role" value={inputState.role} onChange={changeHandler}>
          <MenuItem value="User">Buyer</MenuItem>
          <MenuItem value="Admin">Seller</MenuItem>
        </Select>
      </FormControl>

      <TextField label="First Name" name="fst" variant="outlined" fullWidth margin="normal" required value={inputState.fst} onChange={changeHandler} />
      {inputState.errors.fst && (
        <Typography variant="body2" color="error" align="right" sx={{ mt: 0.5 }}>
          {inputState.errors.fst}
        </Typography>
      )}

      <TextField label="Last Name" name="lst" variant="outlined" fullWidth margin="normal" required value={inputState.lst} onChange={changeHandler} />
      {inputState.errors.lst && (
        <Typography variant='body2' color='error' align='right' sx={{ mt: 0.5 }}>
          {inputState.errors.lst}
        </Typography>)}

      <TextField label="Mail" name="email" variant="outlined" fullWidth margin="normal" required value={inputState.email} onChange={changeHandler} />
      {inputState.errors.email && (
        <Typography variant='body2' color='error' align='right' sx={{ mt: 0.5 }}>
          {inputState.errors.email}
        </Typography>)}


      <TextField
        label="Password"
        name="pwd"
        variant="outlined"
        fullWidth
        required
        type={showpwd ? "text" : "password"}
        value={inputState.pwd}
        onChange={changeHandler}
        InputProps={{
          endAdornment: (
            <Button onClick={togglePss} style={{ cursor: "pointer" }}>
              {showpwd ? <FaEyeSlash /> : <FaEye />}
            </Button>
          )
        }}
      />

      {inputState.errors.pwd && (
        <Typography variant='body2' color='error' align='right' sx={{ mt: 0.5 }}>
          {inputState.errors.pwd}
        </Typography>)}

      <TextField
        label="Confirm Password"
        name="pwd1"
        variant="outlined"
        fullWidth
        required
        type={showconpwd ? "text" : "password"}
        value={inputState.pwd1}
        onChange={changeHandler}
        InputProps={{
          endAdornment: (
            <Button onClick={toggleconPss} style={{ cursor: "pointer" }}>
              {showconpwd ? <FaEyeSlash /> : <FaEye />}
            </Button>
          )
        }}
      />
      {inputState.errors.pwd1 && (
        <Typography variant='body2' color='error' align='right' sx={{ mt: 0.5 }}>
          {inputState.errors.pwd1}
        </Typography>)}

      <Button variant="contained" component="label" color="secondary" sx={{ mt: 2 }}>
        Upload Image
        <input type="file" hidden accept="image/*" onChange={handleImage} />
      </Button>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
        disabled={myFunction()}
      >
        Register
      </Button>
      <Typography align='center' className='login-promt'>
        If you have an account
      </Typography>
      <Link to='/Login' align="center" className="login-link">
        Login
      </Link>
    </Box>
  );
};
export default Register;

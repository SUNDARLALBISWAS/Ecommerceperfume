import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchprofile } from '../../Redux/Slice/Slice';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import './Profile.scss';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchprofile(id));
    }
  }, [dispatch, id]);

  const handleLogout = () => {
    // Clear any authentication tokens, session data, etc.
    sessionStorage.clear();
    navigate('/Login');
  };

  return (
    <div className="profile">
      {data.image && <img src={data.image} alt="Profile" className="profile-image" />}
      <h1>Profile Details</h1>
      <div>
        <p><strong>Name:</strong> {data.fst}</p>
        <p><strong>Email:</strong> {data.email}</p>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          backgroundColor: '#d32f2f', // Custom color
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Profile;

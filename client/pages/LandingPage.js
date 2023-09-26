import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux'

import styled from 'styled-components'

import Login from '../feature/login'
import {getUser} from '../feature/user/userSlice'

// Your existing imports and other code ...

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, userCredentials, status, error } = useSelector(state => state.user);
  console.log(userCredentials)
  useEffect(() => {
    if (userInfo === null && status === 'idle') {
      dispatch(getUser());
    } else if (userCredentials !== null) {
      console.log(userCredentials)
      navigate('/data');
    }
  }, [dispatch, userInfo, status, navigate]);

  return (
    <Container>
      {status === 'loading' && <p>Loading...</p>}
      {error && <Login />}
      {userInfo && <h1>{userInfo.displayName}</h1>}
      {/* <button onClick={handleClick}>Click</button> */}
    </Container>
  );
};


const Container = styled.div`
  display: grid;
  place-items: center;
`

export default LandingPage
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Welcome from '../components/welcome'


import {useDispatch, useSelector} from 'react-redux'

import {getMe, getTopTracks, getDailyTracks} from '../feature/user/userSlice'

const Home = () => {
  const dispatch = useDispatch();
  const { genres, dailyTracks, status, error } = useSelector(state => state.user);
  
  

  return (
    <Container>
      <Welcome message="Welcome to your profile" name='Bobby' />
      <button onClick={()=>dispatch(getMe())}>Get Me</button>
      <button onClick={()=>dispatch(getTopTracks())}>Get Top Tracks</button>
      <div>
      {genres && genres.map((genre,index)=>{
        return <Genre key={index}>{genre}, </Genre>
      })}
      
      </div>
      <button onClick={()=>dispatch(getDailyTracks())}>Get Daily</button>
      <div>
      {dailyTracks && dailyTracks.map((track,index)=>{
        return <Track key={index}>{track}, </Track>
      })}
      </div>
  
    </Container> 
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: 100px;
`
const Genre = styled.div`
  display: inline;
`
const Track = styled.div`
  display: inline;
`

export default Home
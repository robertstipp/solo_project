import React, {useEffect} from 'react'

import styled from 'styled-components';
import BarChart from '../components/charts/barChart';
import BubbleChart from '../components/charts/bubbleChart';
import {useDispatch, useSelector} from 'react-redux'

import {getMe, getTopGenres, getDailyTracks} from '../feature/user/userSlice'


const Profile = () => {

  const {genres} = useSelector(state=>state.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (genres !== null) {
      // dispatch(getTopGenres())
      // dispatch(getMe())
    }
  },[])
  
  return (
    <Container>
    {/* <button onClick={()=>dispatch(getTopGenres())}>Get Top Tracks</button> */}
    {genres && <BubbleChart />}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
`

export default Profile
import React from 'react'

import styled from 'styled-components';
import BarChart from '../components/charts/barChart';
import BubbleChart from '../components/charts/bubbleChart';
import {useDispatch, useSelector} from 'react-redux'

import {getMe, getTopGenres, getDailyTracks} from '../feature/user/userSlice'


const Profile = () => {

  const {genres} = useSelector(state=>state.user)
  console.log(genres)
  const dispatch = useDispatch()
  return (
    <Container>
    <button onClick={()=>dispatch(getTopGenres())}>Get Top Tracks</button>
    {/* <BarChart /> */}
    {genres && <BubbleChart />}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
`

export default Profile
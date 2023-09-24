import React from 'react'

import styled from 'styled-components';
import BarChart from '../components/charts/barChart';
import BubbleChart from '../components/charts/bubbleChart';
import {useDispatch, useSelector} from 'react-redux'

import {getMe, getTopTracks, getDailyTracks} from '../feature/user/userSlice'


const Profile = () => {
  const dispatch = useDispatch()
  return (
    <Container>
    <button onClick={()=>dispatch(getTopTracks())}>Get Top Tracks</button>
    {/* <BarChart /> */}
    <BubbleChart />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
`

export default Profile
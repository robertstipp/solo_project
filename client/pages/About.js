import React, {useEffect}from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import BubbleChart from '../components/charts/bubbleChart'
import BarChart from '../components/charts/barChart'
import { getUserAnalysis } from '../feature/user/userSlice'
import RadarChart from '../components/charts/radarChart.js'
import Dashboard from '../components/dashboard'

import {getMe, getTopGenres, getDailyTracks} from '../feature/user/userSlice'
const About = () => {

  const dispatch = useDispatch()
  const { userAnalysis } = useSelector((state)=>state.user)
  useEffect(()=>{
    dispatch(getMe())
    // dispatch(getUserAnalysis())
  },[])

  return (
    <Container>
      {/* <button onClick={()=>dispatch(getUserAnalysis())}>Get Preferences</button> */}
      {/* <BubbleChart /> */}
      {userAnalysis && <Dashboard/>}
      {userAnalysis && <RadarChart analysis={userAnalysis} />}
      
      
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  
`

export default About
import React, {useEffect}from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import BubbleChart from '../components/charts/bubbleChart'
import BarChart from '../components/charts/barChart'
import { getUserAnalysis } from '../feature/user/userSlice'
import RadarChart from '../components/charts/radarChart'
const About = () => {

  const dispatch = useDispatch()
  const { userAnalysis } = useSelector((state)=>state.user)
  

  return (
    <Container>
      <button onClick={()=>dispatch(getUserAnalysis())}>Get Preferences</button>
      {/* <BubbleChart /> */}
      {/* <BarChart /> */}
      <RadarChart analysis={userAnalysis} />
      
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
`

export default About
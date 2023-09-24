import React from 'react'
import styled from 'styled-components'
import RadarChart from '../components/charts/radarChart'

import {useDispatch} from 'react-redux'

import { getUserAnalysis } from '../feature/user/userSlice'
const About = () => {

  const dispatch = useDispatch()

  

  return (
    <Container>
      {/* <button onClick={()=>dispatch(getUserAnalysis())}>Get Preferences</button> */}

      {/* <RadarChart /> */}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
`

export default About
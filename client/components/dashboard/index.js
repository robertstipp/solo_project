import React from 'react'
import styled from 'styled-components'
import ColoredText from '../typography/ColoredText'
import Table from './Table'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const {userAnalysis} = (useSelector(state=>state.user))
  
  return (
    <Container>
      <DashBoardHeader>
        Audio Features
      </DashBoardHeader>

      <Table data={userAnalysis} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 1rem;
  gap: 2rem;
  /* align-items: center; */

`
const DashBoardHeader = styled.div`
  font-family : var(--primary-font);
  font-size: 2.5rem;
  align-self: center;
`



export default Dashboard
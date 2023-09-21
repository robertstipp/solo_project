import React from 'react';
import {createRoot} from 'react-dom'

import { useEffect,useState } from 'react';

import styled from 'styled-components'

const App = () => {
  const [data, setData] = useState([])

  useEffect(()=>{
    fetch('/api')
      .then(response=>response.json())
      .then(data=>{
        setData(data)
      })


  },[])


  return (
    <Header>
      <a href="api/auth/spotify/login">Login</a>
      <a href="api/auth/spotify/refresh">Refresh</a>
    </Header>

  )
}

const Header=styled.h1`
  color: red;
`
const container = document.getElementById('root')

const root = createRoot(container)
root.render(<App />)

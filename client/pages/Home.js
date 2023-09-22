import React, {useState, useEffect} from 'react'

const Home = () => {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    fetch('/api/auth/spotify/getUser')
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data)
        setUser(data.user)
      })
  },[])
  return (
    <div>
      <a href="api/auth/spotify/passport-auth">Login with Spotify</a>
      {user && <h1>hello</h1>}
    </div>
    
  )
}

export default Home
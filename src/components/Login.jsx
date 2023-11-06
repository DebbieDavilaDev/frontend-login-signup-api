import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Login() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState()
  const [msg,setMsg] = useState()
  const [img,setImg] = useState("")


  useEffect(() => {
    if(isLoggedIn) {
      document.title = "Watch your back!"
    } else {
      document.title = "Enter if you dare!"
    }
  }, [isLoggedIn])

  const handleLoginForm = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const config = {
        method:'POST',
        url : 'http://localhost:8080/users/login',
        data: {
            email,
            password 
        }
    }
    // const res = fetch('https://localhost:8080/users/login', {
    //     method: 'POST',
    //     body: {
    //         email,
    //         password
    //     },
    //     headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    // }).then(response=>{
    //     console.log(response)
    // }).catch(console.log)
    let status = 0
    const res = await axios(config).catch(err=>{
        status = err.response.status
    })
    if (status !== 200 && status !== 0) {
        setMsg('Wrong Password')
        setError('Invalid email or password')
        setImg(`https://http.cat/status/${status}.jpg`)

        return 
    }
    status = res.status 

    setImg(`https://http.cat/status/${status}.jpg`)
    const data = res.data
    const {message,success} =  data
    if (message) {
        setMsg(message)

    }

    if(success) {
      setIsLoggedIn(true)
      setError()
    } else {
      setError('Invalid email or password')
    }
  }

  if(isLoggedIn) {
    return (
      <main>
        <h2>You're Logged In!</h2>
        <button onClick={() => setIsLoggedIn(false)}>
          Logout</button>
      </main>
    )
  }

  return (
    <main>
      
      <h2>Login</h2>
      <h3>{msg}</h3>
      <img src={img} className='catImg'/>
      <section className="login-form">
        <form onSubmit={handleLoginForm}>

          <label htmlFor="email" className='email'>
            Email:
            <input type="email" name="email" />
          </label>

          <label htmlFor="password">
            Password:
            <input type="password" name="password" className="password" />
          </label>

          {error && 
            <p style={{ color: 'red' }}>{error}</p>
          }

          <input type="submit" value="Login" />

        </form>
      </section>
    </main>
  )
}
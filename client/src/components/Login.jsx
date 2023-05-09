import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"

function LogIn(props) {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const result = await response.json()
        console.log(result)
        if(result.success) {
            localStorage.setItem('jwtToken', result.token)
            props.onLogin(result.token)
            navigate('/')
        }else { 
            setMessage(result.message) 
        }
    }

    return (
        <>
          <h1>Login</h1>
          <input type = "text" name = "username" placeholder = "Username" onChange = {handleChange} />
          <input type = "text" name = "email" placeholder = "E-mail" onChange = {handleChange} />
          <input type = "password" name = "password" placeholder = "password" onChange = {handleChange} />
          <button onClick = {handleLogin}>Login</button>
          <h1>{message}</h1>
        </>
      
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (token) => dispatch({type: 'ON_LOGIN', payload: token})
    }
}

export default connect (null, mapDispatchToProps)(LogIn)


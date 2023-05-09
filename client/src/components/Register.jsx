import { useNavigate } from "react-router-dom"
import { useState } from 'react'


function Register() {
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({})

    const handleRegisterInput = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async () => {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)

        })
        const result = await response.json()
        console.log(result)
        localStorage.setItem("token", result.token)
        navigate('/')
    }

    return(
        <>
            <div id="wholeBorder">
                <h1 id="signUpHead">Join ToDone!</h1>
                <div id="signUpBlock">               
                    <input type="text" placeholder="Username" name="username" onChange={handleRegisterInput} />
                    <br />
                    <input type="text" placeholder="E-mail" name="email" onChange={handleRegisterInput} />
                    <br />
                    <input type="text" placeholder="Password" name="password" onChange={handleRegisterInput}/>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </div>
        </>
    )

}

export default Register
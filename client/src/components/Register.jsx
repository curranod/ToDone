import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Register.css';

function Register() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({});

  const handleRegisterInput = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    const response = await fetch('https://todone-7v51.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const result = await response.json();
    console.log(result);
    localStorage.setItem('token', result.token);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <div className="register-block">
        <input
          className="register-input"
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleRegisterInput}
        />
        <br />
        <input
          className="register-input"
          type="text"
          placeholder="E-mail"
          name="email"
          onChange={handleRegisterInput}
        />
        <br />
        <input
          className="register-input"
          type="text"
          placeholder="Password"
          name="password"
          onChange={handleRegisterInput}
        />
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;

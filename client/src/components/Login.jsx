import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css';

function LogIn(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      localStorage.setItem('jwtToken', result.token);
      localStorage.setItem('userId', result.userId);
      props.onLogin(result.token);
      navigate('/');
    } else {
      setMessage(result.message);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <input
        className="login-input"
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        className="login-input"
        type="text"
        name="email"
        placeholder="E-mail"
        onChange={handleChange}
      />
      <input
        className="login-input"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
      <h1 className="login-message">{message}</h1>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (token) => dispatch({ type: 'ON_LOGIN', payload: token })
  };
};

export default connect(null, mapDispatchToProps)(LogIn);

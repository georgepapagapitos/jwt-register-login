import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const {email, password} = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value});
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {

      const body = { email, password };

      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      localStorage.setItem('token', parseResponse.token);

      if(parseResponse.token !== undefined) {
        setAuth(true);
      } else {
        setAuth(false);
      }

    } catch (error) {

      console.error(error.message);

    }
  }

  return (
    <>
      <h1 className='text-center my-5'>Login</h1>
      <form onSubmit={e => onSubmit(e)}className='d-grid'>
        <input value={email} onChange={e => onChange(e)} className='form-control my-2' type="email" name="email" placeholder="Email" />
        <input value={password} onChange={e => onChange(e)} className='form-control my-2' type="password" name="password" placeholder="Password" />
        <button className='btn btn-primary my-2'>Login</button>
        <Link className='text-center my-2' to='/register'>Register</Link>
      </form>
    </>
  );
}

export default Login;
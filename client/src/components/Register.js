import {useState} from 'react';

const Register = () => {

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { username, email, password } = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value});
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {username, email, password};
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(body)
      });
      const parseResponse = await response.json();
      
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h1 className='text-center my-5'>Register</h1>
      <form onSubmit={e => onSubmit(e)} className='d-grid'>
        <input value={username} onChange={e => onChange(e)} className='form-control my-2' type="text" name="username" placeholder="Username" />
        <input value={email} onChange={e => onChange(e)} className='form-control my-2' type="email" name="email" placeholder="Email" />
        <input value={password} onChange={e => onChange(e)} className='form-control my-2' type="password" name="password" placeholder="Password" />
        <button className='btn btn-primary my-2'>Submit</button>
      </form>
    </>
  );
}

export default Register;
import { useState, useEffect } from 'react';

const Dashboard = ({ setAuth }) => {

  const [user, setUser] = useState({
    username: '',
    email: ''
  });

  const getUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/dashboard/', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();

      setUser({...user, username: parseResponse.username, email: parseResponse.email});

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  }

  return (
    <>
      <h1>Dashboard</h1>
      <p>Hello, {user.username}</p>
      <p>Your registered email is {user.email}</p>
      <button onClick={e => logout(e)} className='btn btn-primary'>Logout</button>
    </>
  );
}

export default Dashboard;
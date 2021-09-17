import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {

      const response = await fetch('http://localhost:5000/auth/verify', {
        method: 'GET',
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();

      parseResponse ? setAuth(true) : setAuth(false);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth()
  }, [])

  return (
    <Router>
      <div className='container'>
        <Switch>
          <Route exact path='/login' render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : (<Redirect to='/dashboard' />)} />
          <Route exact path='/register' render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
          <Route exact path='/dashboard' render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : (<Redirect to='/login' />)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

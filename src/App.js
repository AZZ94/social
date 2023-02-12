import './App.css';
// import Home from './views/Home';
// import SignUp from './views/SignUp';
// import Login from './views/Login';
import AppRoutes from './routes/AppRoutes';
import AppNav from './components/AppNav';
import Logo from './Logo.png';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  axios.defaults.headers.common['Authorization'] = "Bearer" + (user ? user.jwt_token : "")

  return (
    <div className="App">
     <img src={Logo} className="App-logo" alt="logo" />
      < AppNav setUser={setUser} />
      < AppRoutes user={user} setUser={setUser}/>
      
    </div>
  );
}

export default App;

import './App.css';
import Home from './views/Home';
import SignUp from './views/SignUp';
import Login from './views/Login';
import AppRoutes from './routes/AppRoutes';
import AppNav from './components/AppNav';
import Logo from './Logo.png';

function App() {
  return (
    <div className="App">
     <img src={Logo} className="App-logo" alt="logo" />
      < AppNav />
      < AppRoutes />
      
    </div>
  );
}

export default App;

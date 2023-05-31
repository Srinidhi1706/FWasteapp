//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import About from './pages/About';
import { useState } from 'react';
import {signOut} from 'firebase/auth';
import {auth} from './firebase-config';
function App() {
  const[isAuth,setIsAuth]=useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <Router>
        <nav>
        
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          {!isAuth?(
          <Link to="/login">Admin</Link>
          ):(
            <>
            <Link to="/createpost">CreatePost</Link>
            <button onClick={signUserOut}>Log Out</button>
            
            </>
          )}
          <h3 className='mob'>PH:9600494034</h3>
        
        </nav>
        <Routes>
          <Route path='/' element={<Home isAuth={isAuth}/>}/>
          <Route path='/About' element={<About isAuth={isAuth}/>}/>
          <Route path='/createpost' element={<CreatePost isAuth={isAuth}/>}/>
          <Route path='/Login' element={<Login setIsAuth={setIsAuth}/>}/>
        </Routes>
      </Router>
  );
}

export default App;

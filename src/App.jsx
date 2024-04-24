// CSS
import './App.css'
// Routes
import { BrowserRouter,Routes, Route ,Navigate } from "react-router-dom";
// Firebase
import { onAuthStateChanged } from 'firebase/auth';
// Hooks
import { useState, useEffect } from 'react';
import { useAutentication } from './hooks/useAutentication';
// Context
import { AuthProvider } from './context/AuthContext';
// Components
import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
// Pages
import Home     from './pages/Home/Home';
import About    from './pages/About/About';
import Login    from './pages/Login/Login';
import Register from './pages/Register/Register';



function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAutentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <>
     <AuthProvider value={user}>
      <BrowserRouter>
        <Navbar/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
          </div>
        <Footer/>
      </BrowserRouter>
     </AuthProvider>
    </>
  )
}

export default App
